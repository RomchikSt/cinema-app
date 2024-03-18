import { Image, StyleSheet, Text, View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

const SliderItem = ({ item }) => {
  const imageUrl = `${BASE_IMAGE_URL}${item.poster_path}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} resizeMode="cover" style={styles.img} />
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "70%",
  },
});
