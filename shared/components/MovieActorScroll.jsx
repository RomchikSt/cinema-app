import { ScrollView, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScrollHeader from "./ScrollHeader";
import MovieActorBox from "./MovieActorBox";

const MovieActorScroll = ({ header, data, mediaType, showLink }) => {
  const navigation = useNavigation();

  const handlePress = (id) => {
    navigation.push("InfoFilmScreen", { id: id, mediaType });
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
          data.slice(0, 10).map((film) => {
            const title =
              film.title && film.title.length > 10
                ? film.title.slice(0, 10) + "..."
                : film.title;
            const name =
              film.name && film.name.length > 10
                ? film.name.slice(0, 10) + "..."
                : film.name;
            return (
              <Pressable key={film.id} onPress={() => handlePress(film.id)}>
                <MovieActorBox
                  character={
                    film.character.length > 10
                      ? film.character.slice(0, 10) + "..."
                      : film.character
                  }
                  release_date={film.release_date.slice(0, 4)}
                  score={film.vote_average}
                  title={title || name}
                  poster={film.poster_path}
                />
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default MovieActorScroll;
