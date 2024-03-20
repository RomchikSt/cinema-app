import { StyleSheet, Text, View } from "react-native";

const MovieDescription = ({ overview }) => {
  return (
    <View style={styles.descriptionBox}>
      <Text style={styles.header}>Description</Text>
      <Text>{overview}</Text>
    </View>
  );
};

export default MovieDescription;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
