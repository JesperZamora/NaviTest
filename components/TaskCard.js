import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TextToSpeech from "../speech/TextToSpeech";

export default function TaskCard({ title, task, navigation, deleteCard }) {
  return (
    <TouchableOpacity onPress={navigation} style={styles.card}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title.substring(0, 21)}</Text>
        <View style={styles.btnGroup}>
          <TextToSpeech say={{title, task}} />
          <TouchableOpacity style={{marginBottom: 3}} onPress={deleteCard}>
            <FontAwesome name="remove" size={26} color="#929292" />
          </TouchableOpacity> 
        </View>
      </View>
      <View>
        <Text style={styles.text}>{task.substring(0, 165)}</Text>
      </View> 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 140,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 20,
    padding: 12,
    shadowColor: "#929292",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
    letterSpacing: 0.2,
  },
  btnGroup: { 
    alignItems: "center", 
    flexDirection: "row",
    gap:22,
    marginBottom: 6
  }
});
