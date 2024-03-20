import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import SliderPopularItem from "./SliderPopularItem";
import Pagination from "./Pagination";

const { height } = Dimensions.get("screen");

function PopularCarousel({ movies }) {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handlePress = (id, mediaType) => {
    navigation.navigate("InfoFilmScreen", { id: id, mediaType: mediaType });
  };

  const handleOnScroll = (event) => {
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false,
    })(event);
  };

  return (
    <View style={styles.carouselContainer}>
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
          <SliderPopularItem
            key={item.id}
            item={item}
            onPress={() => handlePress(item.id, item.media_type)}
          />
        ))}
      </ScrollView>
      <Pagination data={movies} scrollX={scrollX} index={index} />
    </View>
  );
}

export default PopularCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    height: height * 0.7,
  },
});
