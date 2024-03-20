import { StyleSheet, Text, View } from "react-native";

const MovieHeader = ({ title, tagline }) => {
  return (
    <View style={styles.headerBox}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.tagline}>{tagline}</Text>
    </View>
  );
};

export default MovieHeader;

const styles = StyleSheet.create({
  headerBox: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginVertical: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  tagline: {
    fontStyle: "italic",
    textAlign: "center",
  },
});
