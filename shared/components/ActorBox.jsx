import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { BASE_IMAGE_URL } from "../const";

const ActorBox = ({ profile_path, name, character }) => {
  return (
    <View style={styles.personBox}>
      <Image
        source={{ uri: `${BASE_IMAGE_URL}${profile_path}` }}
        resizeMode="cover"
        style={styles.imgCast}
      />
      <Text style={styles.actorName}>{name}</Text>
      <Text style={styles.actorCharacter}>
        {character.length > 10 ? character.slice(0, 10) + "..." : character}
      </Text>
    </View>
  );
};

export default ActorBox;

const styles = StyleSheet.create({
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
});
