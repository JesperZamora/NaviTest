import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function OverviewScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Go to your tasks</Text>
            <View>
              <Text style={styles.text}>Nice to know:</Text>
              <Text style={styles.text}> * You can view all tasks</Text>
              <Text style={styles.text}> * Search your for tasks</Text>
              <Text style={styles.text}> * Create, update, save and delete tasks</Text>
              <Text style={styles.text}> * Samantha can read your task for you</Text>

            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("AI")}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Converse with AI</Text>
            <View>
              <Text style={styles.text}>Nice to know:</Text>
              <Text style={styles.text}> * Using ChatGPT & DALL-E</Text>
              <Text style={styles.text}> * Can chat with AI and make pictures</Text>
              <Text style={styles.text}> * Create task from AI-Responses</Text>
              <Text style={styles.text}> * Click the text to create 📜 </Text>

            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
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
    fontWeight: "400",
    color: "#222",
    marginBottom: 5
  },
  text: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    letterSpacing: 0.2,
  }
});
