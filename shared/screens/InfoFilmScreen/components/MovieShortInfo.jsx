import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { BASE_IMAGE_URL } from "../../../const";
import { AntDesign } from "@expo/vector-icons";

const MovieShortInfo = ({
  poster,
  release_date,
  first_air_date,
  runtime,
  number_of_seasons,
  number_of_episodes,
  vote_count,
  vote_average,
  genres,
  budget,
  revenue,
}) => {
  return (
    <View style={styles.shortDescription}>
      <Image
        source={{ uri: `${BASE_IMAGE_URL}${poster}` }}
        resizeMode="cover"
        style={styles.imgPoster}
      />
      <View style={styles.shortDescriptionBox}>
        <View style={styles.shortDescriptionText}>
          <View style={styles.boxRow}>
            <Text style={styles.text}>Release Date:</Text>
            {release_date && <Text>{release_date.slice(0, 4)}</Text>}
            {first_air_date && <Text>{first_air_date.slice(0, 4)}</Text>}
          </View>
          {runtime && (
            <View style={styles.boxRow}>
              <Text style={styles.text}>Duration:</Text>
              <Text>
                {Math.floor(runtime / 60)}h {runtime % 60}m
              </Text>
            </View>
          )}
          {number_of_seasons && (
            <View style={styles.boxRow}>
              <Text style={styles.text}>Seasons:</Text>
              <Text>{number_of_seasons}</Text>
            </View>
          )}
          {number_of_episodes && (
            <View style={styles.boxRow}>
              <Text style={styles.text}>Episodes:</Text>
              <Text>{number_of_episodes}</Text>
            </View>
          )}
          <View style={styles.boxRow}>
            <Text style={styles.text}>Rating:</Text>
            <View style={styles.scoreContainer}>
              <Text>{vote_average.toFixed(1)}</Text>
              <AntDesign
                name="star"
                size={14}
                color={vote_average > 6 ? "gold" : "red"}
              />
              <Text>({vote_count.toLocaleString()})</Text>
            </View>
          </View>
          <View style={styles.boxRow}>
            <Text style={styles.text}>Genres:</Text>
            <Text style={styles.genre}>
              {genres.map((g) => g.name).join(", ")}
            </Text>
          </View>
          {budget && revenue && (
            <>
              <View style={styles.boxRow}>
                <Text style={styles.text}>Budget:</Text>
                <Text>${budget.toLocaleString()}</Text>
              </View>
              <View style={styles.boxRow}>
                <Text style={styles.text}>Revenue:</Text>
                <Text>${revenue.toLocaleString()}</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default MovieShortInfo;

const styles = StyleSheet.create({
  shortDescription: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  shortDescriptionBox: {
    justifyContent: "center",
    flex: 1,
  },
  shortDescriptionText: {
    justifyContent: "center",
    gap: 4,
  },
  boxRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: 4,
  },
  text: {
    fontWeight: "bold",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  img: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3.9,
  },
  imgPoster: {
    width: 100,
    height: 160,
  },
  genre: {
    flexWrap: "wrap",
    flex: 1,
  },
  descriptionBox: {
    marginTop: 20,
    gap: 10,
    borderWidth: 1,
    padding: 12,
    paddingBottom: 20,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
