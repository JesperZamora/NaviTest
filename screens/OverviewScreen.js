import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated'

export default function OverviewScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View style={styles.container} entering={FadeIn.duration(500)}>
        <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
          <View style={styles.btn}>
            <Animated.Text entering={FadeInDown.delay(50).springify()}   style={styles.btnText}>Go to your tasks</Animated.Text>
            <View>
              <Animated.Text entering={FadeInDown.delay(100).springify()}  style={styles.text}>Nice to know:</Animated.Text>
              <Animated.Text entering={FadeInDown.delay(150).springify()} style={styles.text}> * You can view all tasks</Animated.Text>
              <Animated.Text entering={FadeInDown.delay(200).springify()}  style={styles.text}> * Search your for tasks</Animated.Text>
              <Animated.Text entering={FadeInDown.delay(250).springify()}  style={styles.text}> * Create, update, save and delete tasks</Animated.Text>
              <Animated.Text entering={FadeInDown.delay(300).springify()}  style={styles.text}> * Samantha can read your task for you</Animated.Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("AI")}>
          <View style={styles.btn}>
            <Animated.Text entering={FadeInDown.delay(350).springify()} style={styles.btnText}>Converse with AI</Animated.Text>
            <View>
              <Animated.Text entering={FadeInDown.delay(400).springify()}  style={styles.text}>Nice to know:</Animated.Text>
              <Animated.Text entering={FadeInDown.delay(450).springify()} style={styles.text}> * Using ChatGPT & DALL-E</Animated.Text>
              <Animated.Text entering={FadeInDown.delay(500).springify()} style={styles.text}> * Can chat with AI and make pictures</Animated.Text>
              <Animated.Text entering={FadeInDown.delay(550).springify()} style={styles.text}> * Create task from AI-Responses</Animated.Text>
              <Animated.Text entering={FadeInDown.delay(600).springify()} style={styles.text}> * Click the text to create 📜 </Animated.Text>

            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    gap: 40,
    justifyContent: "center"
  },
  btn: {
    backgroundColor: "#fff",
    borderRadius: "8",
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "column",
    shadowColor: "#929299",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#222",
    marginBottom: 5,
    letterSpacing: 0.4,
  },
  text: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    letterSpacing: 0.6,
  }
});
