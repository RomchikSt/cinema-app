import { StyleSheet, Image, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BASE_IMAGE_URL } from "../const";

const MovieBox = ({ number, score, title, poster }) => {
  return (
    <View style={styles.scrollContainer}>
      <Image
        source={{ uri: `${BASE_IMAGE_URL}${poster}` }}
        resizeMode="cover"
        style={styles.img}
      />
      <View style={styles.topContainer}>
        <Text style={styles.number}>{number}</Text>
        <View style={styles.scoreContainer}>
          <AntDesign name="star" size={14} color="gold" />
          <Text>{score.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default MovieBox;

const styles = StyleSheet.create({
  scrollContainer: {
    width: 120,
    height: 260,
    margin: 12,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  topContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  number: {
    color: "#ccc",
    fontSize: 28,
    fontWeight: "bold",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  img: {
    width: "100%",
    height: "65%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    marginHorizontal: 10,
    fontSize: 14,
  },
});
