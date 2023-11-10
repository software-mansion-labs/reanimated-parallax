import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedSensor,
  SensorType,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function App() {
  const rotation = useAnimatedSensor(SensorType.ROTATION, {
    interval: 20,
  });

  const foregroundStyle = useAnimatedStyle(() => {
    const { pitch, roll } = rotation.sensor.value;
    return {
      transform: [
        { translateX: withSpring(-roll * 50, { damping: 200 }) },
        { translateY: withSpring(-pitch * 50, { damping: 200 }) },
      ],
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const { pitch, roll } = rotation.sensor.value;
    return {
      transform: [
        { translateX: withSpring(-roll * 25, { damping: 200 }) },
        { translateY: withSpring(-pitch * 25, { damping: 200 }) },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={backgroundStyle}
        source={require("./assets/background.jpg")}
      />
      <Animated.Image
        style={[styles.foreground, foregroundStyle]}
        source={require("./assets/foreground.png")}
      />
      <Text style={styles.text}>Visit Ireland</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  foreground: {
    position: "absolute",
    width: "120%",
    height: "100%",
    bottom: -50,
  },
  text: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    color: "white",
    position: "absolute",
    top: 150,
  },
});
