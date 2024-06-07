import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import TextToSpeech from "../speech/TextToSpeech";
import { Entypo } from "@expo/vector-icons";
import Animated, {
  FadeInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function TaskCard({
  title,
  task,
  taskId,
  navigation,
  deleteCard,
  onSwipeOff,
}) {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const pan = Gesture.Pan()
    .minDistance(20)
    .onUpdate((event) => {
      if (event.translationX > 0) {
        translateX.value = 0;
        rotate.value = 0;
      } else {
        translateX.value = event.translationX;
        rotate.value = (translateX.value / 250) * -10;
      }
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > 230) {
        translateX.value = withSpring(500);
        runOnJS(onSwipeOff)(taskId);
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotate.value} deg` },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <GestureDetector gesture={pan}>
        <Animated.View entering={FadeInRight.duration(200)}>
          <TouchableOpacity onPress={navigation} style={styles.card}>
            <View style={styles.titleContainer}>
              <Animated.Text
                entering={FadeInRight.duration(400)}
                style={styles.title}
              >
                {title?.substring(0, 21)}
              </Animated.Text>
              <View style={styles.btnGroup}>
                <TextToSpeech say={{ title, task }} />
                <TouchableOpacity
                  style={{ marginBottom: 3 }}
                  onPress={deleteCard}
                >
                  <Entypo name="cross" size={30} color="#929292" />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Animated.Text
                entering={FadeInRight.duration(500)}
                style={styles.text}
              >
                {task.length > 180
                  ? task?.substring(0, 200) + " ..."
                  : task?.substring(0, 200)}
              </Animated.Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: "#929292",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 10,
    color: "#222",
    letterSpacing: 0.4,
  },
  text: {
    fontSize: 15,
    fontWeight: "400",
    color: "#929292",
    letterSpacing: 0.6,
    lineHeight: 22,
  },
  btnGroup: {
    alignItems: "center",
    flexDirection: "row",
    gap: 22,
    marginBottom: 6,
  },
});
