import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
  Pressable,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const TopRatedScroll = ({ header, data }) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{header}</Text>
        <Pressable>
          <Text style={styles.linkText}>See All</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        {data.slice(0, 10).map((film, i) => (
          <View style={styles.scrollContainer} key={film.id}>
            <Image
              source={{ uri: `${BASE_IMAGE_URL}${film.poster_path}` }}
              resizeMode="cover"
              style={styles.img}
            />
            <View style={styles.topContainer}>
              <Text style={styles.number}>{i + 1}</Text>
              <View style={styles.scoreContainer}>
                <AntDesign name="star" size={14} color="gold" />
                <Text>{film.vote_average.toFixed(1)}</Text>
              </View>
            </View>
            <Text style={styles.title}>{film.title || film.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopRatedScroll;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 18,
    marginHorizontal: 22,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
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
