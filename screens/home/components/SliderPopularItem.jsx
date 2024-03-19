import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";

const { width, height } = Dimensions.get("screen");
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

const SliderPopularItem = ({ item, onPress }) => {
  const imageUrl = `${BASE_IMAGE_URL}${item.poster_path}`;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} resizeMode="cover" style={styles.img} />
    </Pressable>
  );
};

export default SliderPopularItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  img: {
    width: "100%",
    height: "70%",
  },
});
