import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { TMDB_TOKEN, BASE_IMAGE_URL } from "../const";
import YoutubePlayer from "react-native-youtube-iframe";
import { AntDesign } from "@expo/vector-icons";

const InfoScreen = ({ route }) => {
  const { id, mediaType } = route.params;
  const [info, setInfo] = useState(null);
  const [video, setVideo] = useState(null);
  const [cast, setCast] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchInfo = async () => {
      const infoOptions = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${mediaType}/${id}`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `${TMDB_TOKEN}`,
        },
      };

      try {
        const infoResponse = await axios.request(infoOptions);
        setInfo(infoResponse.data);
      } catch (error) {
        console.error("Error fetching info data: ", error);
      }
    };

    const fetchVideos = async () => {
      const videoOptions = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${mediaType}/${id}/videos`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `${TMDB_TOKEN}`,
        },
      };

      try {
        const videoResponse = await axios.request(videoOptions);
        setVideo(videoResponse.data.results);
      } catch (error) {
        console.error("Error fetching video data: ", error);
      }
    };

    const fetchCast = async () => {
      const castOptions = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${mediaType}/${id}/credits`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `${TMDB_TOKEN}`,
        },
      };

      try {
        const castResponse = await axios.request(castOptions);
        setCast(castResponse.data.cast);
      } catch (error) {
        console.error("Error fetching video data: ", error);
      }
    };

    fetchInfo();
    fetchVideos();
    fetchCast();
  }, [id, mediaType]);

  useEffect(() => {
    if (info) {
      navigation.setOptions({
        title: info.title || info.name, // Динамічно встановлює заголовок
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
      });
    }
  }, [info, navigation]);

  if (!info) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `${BASE_IMAGE_URL}${info.backdrop_path}` }}
        resizeMode="cover"
        style={styles.img}
      />
      <View style={styles.infoContainer}>
        <View style={styles.headerBox}>
          <Text style={styles.headerMain}>{info.title || info.name}</Text>
          <Text style={styles.tagline}>{info.tagline}</Text>
        </View>
        <View style={styles.shortDescription}>
          <Image
            source={{ uri: `${BASE_IMAGE_URL}${info.poster_path}` }}
            resizeMode="cover"
            style={styles.imgPoster}
          />
          <View style={styles.shortDescriptionBox}>
            <View style={styles.shortDescriptionText}>
              <View style={styles.boxRow}>
                <Text style={styles.text}>Release Date:</Text>
                {info.release_date && (
                  <Text>{info.release_date.slice(0, 4)}</Text>
                )}
                {info.first_air_date && (
                  <Text>{info.first_air_date.slice(0, 4)}</Text>
                )}
              </View>
              {info.runtime && (
                <View style={styles.boxRow}>
                  <Text style={styles.text}>Duration:</Text>
                  <Text>
                    {Math.floor(info.runtime / 60)}h {info.runtime % 60}m
                  </Text>
                </View>
              )}
              {info.number_of_seasons && (
                <View style={styles.boxRow}>
                  <Text style={styles.text}>Seasons:</Text>
                  <Text>{info.number_of_seasons}</Text>
                </View>
              )}
              {info.number_of_episodes && (
                <View style={styles.boxRow}>
                  <Text style={styles.text}>Episodes:</Text>
                  <Text>{info.number_of_episodes}</Text>
                </View>
              )}
              <View style={styles.boxRow}>
                <Text style={styles.text}>Rating:</Text>
                <View style={styles.scoreContainer}>
                  <Text>{info.vote_average.toFixed(1)}</Text>
                  <AntDesign
                    name="star"
                    size={14}
                    color={info.vote_average > 6 ? "gold" : "red"}
                  />
                  <Text>({info.vote_count.toLocaleString()})</Text>
                </View>
              </View>
              <View style={styles.boxRow}>
                <Text style={styles.text}>Genres:</Text>
                <Text style={styles.genre}>
                  {info.genres.map((g) => g.name).join(", ")}
                </Text>
              </View>
              {info.budget && info.revenue && (
                <>
                  <View style={styles.boxRow}>
                    <Text style={styles.text}>Budget:</Text>
                    <Text>${info.budget.toLocaleString()}</Text>
                  </View>
                  <View style={styles.boxRow}>
                    <Text style={styles.text}>Revenue:</Text>
                    <Text>${info.revenue.toLocaleString()}</Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
        <View style={styles.descriptionBox}>
          <Text style={styles.header}>Description</Text>
          <Text>{info.overview}</Text>
        </View>
      </View>
      <View style={styles.trailerHeaderContainer}>
        <Text style={styles.castHeader}>Trailers</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {video &&
          video
            .filter((v) => v.type === "Trailer")
            .map((v, index) => (
              <View key={index} style={styles.video}>
                <YoutubePlayer
                  height={150}
                  width={250}
                  videoId={v.key}
                  play={false}
                />
              </View>
            ))}
      </ScrollView>
      <View style={styles.castHeaderContainer}>
        <Text style={styles.castHeader}>Cast</Text>
        <Pressable>
          <Text style={styles.linkText}>See All</Text>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cast &&
          cast.slice(0, 12).map((c, index) => (
            <View style={styles.personBox} key={index}>
              <Image
                source={{ uri: `${BASE_IMAGE_URL}${c.profile_path}` }}
                resizeMode="cover"
                style={styles.imgCast}
              />
              <Text style={styles.actorName}>{c.name}</Text>
              <Text style={styles.actorCharacter}>
                {c.character.length > 10
                  ? c.character.slice(0, 10) + "..."
                  : c.character}
              </Text>
            </View>
          ))}
      </ScrollView>
      {/* <Text>ID: {id}</Text>
      <Text>Media Type: {mediaType}</Text> */}
    </ScrollView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {},
  infoContainer: {
    marginHorizontal: 10,
  },
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
  headerBox: {
    justifyContent: "center",
    alignItems: "center",

    gap: 5,
    marginVertical: 10,
  },
  tagline: {
    fontStyle: "italic",
    textAlign: "center",
  },
  headerMain: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
  video: {
    marginHorizontal: 20,
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
  trailerheader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  personBox: {
    margin: 10,
    alignItems: "center",
    flex: 1,
    width: 90,
    gap: 5,
  },
  imgCast: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  actorName: {
    fontWeight: "bold",
    fontSize: 12,
  },
  actorCharacter: {
    fontStyle: "italic",
    fontSize: 12,
  },
  trailerHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 18,
    marginBottom: 10,
    marginHorizontal: 22,
  },
  castHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 18,
    marginHorizontal: 22,
  },
  castHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
