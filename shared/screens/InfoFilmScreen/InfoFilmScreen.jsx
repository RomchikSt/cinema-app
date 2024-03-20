import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { TMDB_TOKEN, BASE_IMAGE_URL } from "../../const";
import YoutubePlayer from "react-native-youtube-iframe";
import MovieHeader from "./components/MovieHeader";
import MovieShortInfo from "./components/MovieShortInfo";
import MovieDescription from "./components/MovieDescription";
import Scrollheader from "../../components/ScrollHeader";
import MovieScroll from "../../components/MovieScroll";
import ActorScroll from "../../components/ActorScroll";

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
    const fetchRec = async () => {
      const recOptions = {
        method: "GET",
        url: `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `${TMDB_TOKEN}`,
        },
      };

      try {
        const recResponse = await axios.request(recOptions);
        setRecommendations(recResponse.data.results);
      } catch (error) {
        console.error("Error fetching video data: ", error);
      }
    };

    fetchInfo();
    fetchVideos();
    fetchCast();
    fetchRec();
  }, [id, mediaType]);

  useEffect(() => {
    if (info) {
      navigation.setOptions({
        title: info.title || info.name,
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
    <ScrollView>
      <Image
        source={{ uri: `${BASE_IMAGE_URL}${info.backdrop_path}` }}
        resizeMode="cover"
        style={styles.img}
      />
      <View style={styles.infoContainer}>
        <MovieHeader title={info.title || info.name} tagline={info.tagline} />
        <MovieShortInfo
          poster={info.poster_path}
          release_date={info.release_date}
          first_air_date={info.first_air_date}
          runtime={info.runtime}
          number_of_seasons={info.number_of_seasons}
          number_of_episodes={info.number_of_episodes}
          vote_count={info.vote_count}
          vote_average={info.vote_average}
          genres={info.genres}
          budget={info.budget}
          revenue={info.revenue}
        />
        <MovieDescription overview={info.overview} />
      </View>
      <Scrollheader header={"Trailers"} showLink={false} />
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
      <ActorScroll data={cast} showLink={true} header={"Cast"} />
      <MovieScroll
        data={recommendations}
        mediaType={mediaType}
        header={"Recommendation"}
        showLink={false}
      />
    </ScrollView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  infoContainer: {
    marginHorizontal: 10,
  },
  img: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3.9,
  },
  video: {
    marginHorizontal: 12,
    marginTop: 10,
  },
});
