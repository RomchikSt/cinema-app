import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import { store } from "./store/store";

import HomeScreen from "./screens/home/HomeScreen";
import InfoFilmScreen from "./shared/screens/InfoFilmScreen";
import InfoActorScreen from "./shared/screens/InfoActorScreen";
import SearchScreen from "./screens/search/SearchScreen";
import TrailersScreen from "./screens/trailers/TrailersScreen";
import FavoritesScreen from "./screens/favorites/FavoritesScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = ({ route }) => ({
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

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen name="InfoFilmScreen" component={InfoFilmScreen} />
    </Stack.Navigator>
  );
}

function AppTabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="home"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Trailers" component={TrailersScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <NavigationContainer>
        <AppTabNavigator />
      </NavigationContainer>
    </Provider>
  );
}
