import { ScrollView, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScrollHeader from "./ScrollHeader";
import ActorBox from "./ActorBox";

const ActorScroll = ({ header, data, showLink }) => {
  const navigation = useNavigation();

  const handlePress = (id) => {
    navigation.push("InfoActorScreen", { id: id });
  };

  return (
    <View>
      <ScrollHeader header={header} showLink={showLink} />
      <ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        {data &&
          data.slice(0, 10).map((actor) => (
            <Pressable key={actor.id} onPress={() => handlePress(actor.id)}>
              <ActorBox
                key={actor.id}
                profile_path={actor.profile_path}
                name={actor.name}
                character={actor.character}
              />
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
};

export default ActorScroll;
