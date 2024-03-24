import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FullDataScreen = ({ route }) => {
  const { data } = route.params;

  return (
    <View>
      {data.map((item) => (
        <Text key={item.id}>{item.title || item.name}</Text>
      ))}
    </View>
  );
};

export default FullDataScreen;

const styles = StyleSheet.create({});
