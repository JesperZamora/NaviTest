import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TaskCard({ title, task, navigation }) {
  return (
    <TouchableOpacity onPress={navigation} style={styles.card}>
      <View>
        <View style={{flexDirection: "row", justifyContent:"space-between"}}>
          <Text style={styles.title}>{title}</Text>
          <FontAwesome name="remove" size={20} color="#929292" />
        </View>
        <Text style={styles.text}>{task}</Text>
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
});
