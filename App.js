import { StatusBar } from "expo-status-bar";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from "react-redux";
import { store } from "./store/store";

import HomeScreen from "./screens/home/HomeScreen";
import SearchScreen from "./screens/search/SearchScreen";
import TrailersScreen from "./screens/trailers/TrailersScreen";
import FavoritesScreen from "./screens/favorites/FavoritesScreen";

const BottomTabs = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ color, size }) => {
    const icons = {
      Home: "home",
      Search: "search",
      Trailers: "videocam",
      Favorites: "heart",
    };

    const iconName = icons[route.name];
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <NavigationContainer>
        <BottomTabs.Navigator screenOptions={screenOptions}>
          <BottomTabs.Screen name="Home" component={HomeScreen} />
          <BottomTabs.Screen name="Search" component={SearchScreen} />
          <BottomTabs.Screen name="Trailers" component={TrailersScreen} />
          <BottomTabs.Screen name="Favorites" component={FavoritesScreen} />
        </BottomTabs.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
