import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditTaskScreen({ route, navigation }) {
  const [task, setTask] = useState(route.params?.item);

  function navigateToTasks() {
    if(task.task !== "" || task.title !== "") {
      navigation.navigate("Tasks", { editTask: task });
      setTask({ title: "", task: "" });
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>
            Edit your task and press save when done
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              style={styles.inputTitle}
              placeholder="Task title"
              placeholderTextColor="#6b7280"
              value={task.title}
              onChangeText={(title) => setTask({ ...task, title })}
            />
          </View>

          <View style={styles.input}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              style={styles.inputTask}
              placeholder="Just write it down ..."
              placeholderTextColor="#6b7280"
              value={task.task}
              onChangeText={(newTask) => setTask({ ...task, task: newTask })}
              multiline={true}
              // numberOfLines={10}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={navigateToTasks}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Save changes</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  header: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
    letterSpacing: 0.2,
  },
  input: {
    marginBottom: 16,
  },
  inputTitle: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  inputTask: {
    height: 240,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 4,
  },
  btn: {
    backgroundColor: "#039e4f",
    borderRadius: "8",
    borderWidth: 1,
    borderColor: "#039e4f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
