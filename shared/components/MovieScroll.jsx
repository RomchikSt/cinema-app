import { ScrollView, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScrollHeader from "./ScrollHeader";
import MovieBox from "./MovieBox";

const MovieScroll = ({ header, data, mediaType, showLink }) => {
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
          data.slice(0, 10).map((film, i) => {
            const title =
              film.title && film.title.length > 20
                ? film.title.slice(0, 20) + "..."
                : film.title;
            const name =
              film.name && film.name.length > 20
                ? film.name.slice(0, 20) + "..."
                : film.name;
            return (
              <Pressable key={film.id} onPress={() => handlePress(film.id)}>
                <MovieBox
                  key={film.id}
                  poster={film.poster_path}
                  number={i + 1}
                  score={film.vote_average}
                  title={title || name}
                />
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default MovieScroll;
