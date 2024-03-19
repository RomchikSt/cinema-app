import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { TMDB_TOKEN } from "../const";

const InfoScreen = ({ route }) => {
  const { id, mediaType } = route.params;
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${mediaType}/${id}`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: `${TMDB_TOKEN}`,
      },
    };

    axios
      .request(options)
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id, mediaType]);

  if (!info) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>ID: {id}</Text>
      <Text>Media Type: {mediaType}</Text>
      <Text>Title: {info.title || info.name}</Text>
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
