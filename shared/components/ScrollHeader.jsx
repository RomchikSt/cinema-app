import { StyleSheet, Text, View, Pressable } from "react-native";

const ScrollHeader = ({ header, showLink = true }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{header}</Text>
      {showLink && (
        <Pressable>
          <Text style={styles.linkText}>See All</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ScrollHeader;

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
});
