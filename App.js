import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import { store } from "./store/store";

import HomeScreen from "./screens/home/HomeScreen";
import InfoFilmScreen from "./shared/screens/InfoFilmScreen/InfoFilmScreen";
import InfoActorScreen from "./shared/screens/InfoActorScreen/InfoActorScreen";
import SearchScreen from "./screens/search/SearchScreen";
import FavoritesScreen from "./screens/favorites/FavoritesScreen";
import FullDataScreen from "./shared/screens/FullDataScreen/FullDataScreen";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    const icons = {
      Home: "home",
      Search: "search",
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
      <Stack.Screen
        name="InfoFilmScreen"
        component={InfoFilmScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="InfoActorScreen"
        component={InfoActorScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="FullDataScreen"
        component={FullDataScreen}
        options={{
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

function AppTabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
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
