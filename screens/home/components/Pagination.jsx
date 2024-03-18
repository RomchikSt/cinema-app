import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("screen");

const Pagination = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [6, 12, 6],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.2],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              { width: dotWidth, opacity },
              i === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "26%",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    backgroundColor: "#ccc",
  },
  dotActive: {
    backgroundColor: "#fff",
  },
});
