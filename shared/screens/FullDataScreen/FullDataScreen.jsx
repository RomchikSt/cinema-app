import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { BASE_IMAGE_URL } from "../../const";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FullDataScreen = ({ route }) => {
  const { data, mediaType } = route.params;
  const navigation = useNavigation();

  const handlePress = (id) => {
    navigation.push("InfoFilmScreen", { id: id, mediaType: mediaType });
  };

  return (
    <ScrollView>
      {data.map((item, i) => (
        <Pressable
          key={i}
          style={styles.container}
          onPress={() => handlePress(item.id)}
        >
          <Image
            source={{ uri: `${BASE_IMAGE_URL}${item.poster_path}` }}
            resizeMode="contain"
            style={styles.img}
          />
          <View style={styles.textContainer}>
            <Text style={styles.header}>{item.title || item.name}</Text>
            <View style={styles.boxRow}>
              <Text style={styles.text}>Release Date:</Text>
              {item.release_date && (
                <Text>{item.release_date.slice(0, 4)}</Text>
              )}
              {item.first_air_date && (
                <Text>{item.first_air_date.slice(0, 4)}</Text>
              )}
            </View>
            {item.runtime && (
              <View style={styles.boxRow}>
                <Text style={styles.text}>Duration:</Text>
                <Text>
                  {Math.floor(item.runtime / 60)}h {runtime % 60}m
                </Text>
              </View>
            )}
            {item.number_of_seasons && (
              <View style={styles.boxRow}>
                <Text style={styles.text}>Seasons:</Text>
                <Text>{item.number_of_seasons}</Text>
              </View>
            )}
            {item.number_of_episodes && (
              <View style={styles.boxRow}>
                <Text style={styles.text}>Episodes:</Text>
                <Text>{item.number_of_episodes}</Text>
              </View>
            )}
            <View style={styles.boxRow}>
              <Text style={styles.text}>Rating:</Text>
              <View style={styles.scoreContainer}>
                <Text>{item.vote_average.toFixed(1)}</Text>
                <AntDesign
                  name="star"
                  size={14}
                  color={item.vote_average > 6 ? "gold" : "red"}
                />
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default FullDataScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 140,
    gap: 10,
  },
  img: {
    width: "25%",
    height: "100%",
  },
  textContainer: {
    gap: 6,
  },
  boxRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontWeight: "bold",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
