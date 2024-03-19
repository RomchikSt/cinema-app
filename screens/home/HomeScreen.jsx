import { Pressable, Text, View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedFilms } from "../../store/features/topRatedFilms";
import { fetchTopRatedTvSeries } from "../../store/features/topRatedTvSeries";

import PopularCarousel from "./components/PopularCarousel";
import TopRatedScroll from "./components/TopRatedScroll";

function HomeScreen() {
  const dispatch = useDispatch();
  const { topRatedMovies, statusTopRatedMovies } = useSelector(
    (state) => state.topRatedFilms
  );
  const { topRatedTvSeries, statusTopRatedTvSeries } = useSelector(
    (state) => state.topRatedTvSeries
  );

  useEffect(() => {
    dispatch(fetchTopRatedFilms());
    dispatch(fetchTopRatedTvSeries());
  }, [dispatch]);
  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <PopularCarousel />
      <TopRatedScroll header={"Top Rated Films"} data={topRatedMovies} />
      <TopRatedScroll header={"Top TV Series"} data={topRatedTvSeries} />
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
