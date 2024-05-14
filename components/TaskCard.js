import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TextToSpeech from "../speech/TextToSpeech";
import { Entypo } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn, FadeInRight } from 'react-native-reanimated'

export default function TaskCard({ title, task, navigation, deleteCard }) {
  return (
    <TouchableOpacity onPress={navigation} style={styles.card}>
      <Animated.View entering={FadeInRight.duration(200)}>
      <View style={styles.titleContainer}>
        <Animated.Text entering={FadeInRight.duration(400)} style={styles.title}>{title.substring(0, 21)}</Animated.Text>
        <View style={styles.btnGroup}>
          <TextToSpeech say={{title, task}} />
          <TouchableOpacity style={{marginBottom: 3}} onPress={deleteCard}>
            <Entypo name="cross" size={30} color="#929292" />
          </TouchableOpacity> 
        </View>
      </View>
      <View>
        <Animated.Text entering={FadeInRight.duration(500)} style={styles.text}>{task.substring(0, 165)}</Animated.Text>
      </View> 
      </Animated.View>
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
