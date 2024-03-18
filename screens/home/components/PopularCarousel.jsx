import {
  FlatList,
  View,
  Image,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrendingMovies } from "../../../store/features/weekTranding";

import SliderItem from "./SliderItem";
import Pagination from "./Pagination";

function PopularCarousel() {
  const dispatch = useDispatch();
  const { movies, status } = useSelector((state) => state.weekTrending);
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  const handleOnScroll = (event) => {
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false,
    })(event);
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        bounces={false}
        scrollEventThrottle={16}
      >
        {movies.map((item, idx) => (
          <SliderItem key={item.id} item={item} />
        ))}
      </ScrollView>
      <Pagination data={movies} scrollX={scrollX} index={index} />
    </View>
  );
}

export default PopularCarousel;

const styles = StyleSheet.create({
  image: {},
});
