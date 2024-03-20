import { StyleSheet, Image, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { BASE_IMAGE_URL } from "../const";

const MovieActorBox = ({ character, release_date, score, title, poster }) => {
  return (
    <View style={styles.scrollContainer}>
      <Image
        source={{ uri: `${BASE_IMAGE_URL}${poster}` }}
        resizeMode="cover"
        style={styles.img}
      />
      <View style={styles.topContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.character}>{character}</Text>
        <View style={styles.scorYearContainer}>
          <Text style={styles.title}>{release_date}</Text>
          <View style={styles.scoreContainer}>
            <AntDesign name="star" size={14} color="gold" />
            <Text>{score && score.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MovieActorBox;

const styles = StyleSheet.create({
  scrollContainer: {
    width: 120,
    height: 240,
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
    marginVertical: 4,
    marginHorizontal: 10,
    gap: 2,
  },
  scorYearContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  img: {
    width: "100%",
    height: "65%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flex: 1,
  },
  title: {
    fontSize: 14,
  },
  character: {
    fontStyle: "italic",
    fontSize: 12,
  },
});
