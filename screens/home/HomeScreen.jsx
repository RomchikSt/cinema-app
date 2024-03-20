import {
  Pressable,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedFilms } from "../../store/features/topRatedFilms";
import { fetchTopRatedTvSeries } from "../../store/features/topRatedTvSeries";
import { fetchTrendingMovies } from "../../store/features/weekTrending";

import PopularCarousel from "./components/corusel/PopularCarousel";
import MovieScroll from "../../shared/components/MovieScroll";

function HomeScreen() {
  const dispatch = useDispatch();
  const { topRatedMovies, statusTopRatedMovies } = useSelector(
    (state) => state.topRatedFilms
  );
  const { topRatedTvSeries, statusTopRatedTvSeries } = useSelector(
    (state) => state.topRatedTvSeries
  );
  const { movies, status } = useSelector((state) => state.weekTrending);

  useEffect(() => {
    dispatch(fetchTopRatedFilms());
    dispatch(fetchTopRatedTvSeries());
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <PopularCarousel movies={movies} />
      <MovieScroll
        header={"Top Rated Films"}
        data={topRatedMovies}
        mediaType={"movie"}
      />
      <MovieScroll
        header={"Top TV Series"}
        data={topRatedTvSeries}
        mediaType={"tv"}
      />
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
