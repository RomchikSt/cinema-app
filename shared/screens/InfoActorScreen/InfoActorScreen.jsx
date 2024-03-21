import { StyleSheet, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { TMDB_TOKEN } from "../../const";
import { useNavigation } from "@react-navigation/native";
import ScrollHeader from "../../components/ScrollHeader";
import MovieActorScroll from "../../components/MovieActorScroll";

const InfoActorScreen = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();
  const [infoActor, setInfoActor] = useState(null);
  const [movies, setMovies] = useState(null);
  const [tvSeries, setTvSeries] = useState(null);

  useEffect(() => {
    const fetchInfoActor = async () => {
      const infoActorOptions = {
        method: "GET",
        url: `https://api.themoviedb.org/3/person/${id}`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `${TMDB_TOKEN}`,
        },
      };

      try {
        const infoActorResponse = await axios.request(infoActorOptions);
        setInfoActor(infoActorResponse.data);
      } catch (error) {
        console.error("Error fetching info data: ", error);
      }
    };

    const fetchMovies = async () => {
      const moviesOptions = {
        method: "GET",
        url: `https://api.themoviedb.org/3/person/${id}/movie_credits`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `${TMDB_TOKEN}`,
        },
      };

      try {
        const moviesResponse = await axios.request(moviesOptions);
        setMovies(moviesResponse.data.cast);
      } catch (error) {
        console.error("Error fetching info data: ", error);
      }
    };

    const fetchTvSeries = async () => {
      const tvSeriesOptions = {
        method: "GET",
        url: `https://api.themoviedb.org/3/person/${id}/tv_credits`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `${TMDB_TOKEN}`,
        },
      };

      try {
        const tvSeriesResponse = await axios.request(tvSeriesOptions);
        setTvSeries(tvSeriesResponse.data.cast);
      } catch (error) {
        console.error("Error fetching info data: ", error);
      }
    };

    fetchInfoActor();
    fetchMovies();
    fetchTvSeries();
  }, [id]);

  useEffect(() => {
    if (infoActor) {
      navigation.setOptions({
        title: infoActor.name,
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
      });
    }
  }, [infoActor, navigation]);

  return (
    <>
      <ScrollView>
        <MovieActorScroll
          header={"Films"}
          data={movies}
          mediaType={"movie"}
          showLink={true}
        />
        <MovieActorScroll
          header={"Tv Series"}
          data={tvSeries}
          mediaType={"tv"}
          showLink={true}
        />
      </ScrollView>
    </>
  );
};

export default InfoActorScreen;

const styles = StyleSheet.create({});
