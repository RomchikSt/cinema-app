import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
} from "../../store/features/counter/counterSlice";

function HomeScreen() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);

  return (
    <View>
      <Text>Counter: {count}</Text>
      <Pressable onPress={() => dispatch(increment())}>
        <Text>Increase</Text>
      </Pressable>
      <Pressable onPress={() => dispatch(decrement())}>
        <Text>Decrease</Text>
      </Pressable>
    </View>
  );
}

export default HomeScreen;
