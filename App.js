import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/home/HomeScreen";
import SearchScreen from "./screens/search/SearchScreen";
import TrailersScreeen from "./screens/trailers/TrailersScreen";
import FavoritesScreeen from "./screens/favorites/FavoritesScreen";

const BottomTabs = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <BottomTabs.Navigator>
          <BottomTabs.Screen name="Home" component={HomeScreen} />
          <BottomTabs.Screen name="Search" component={SearchScreen} />
          <BottomTabs.Screen name="Trailers" component={TrailersScreeen} />
          <BottomTabs.Screen name="Favorites" component={FavoritesScreeen} />
        </BottomTabs.Navigator>
      </NavigationContainer>
    </>
  );
}
