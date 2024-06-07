import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { myToast } from "../components/myToaster";

export default function EditTaskScreen({ route, navigation }) {
  const [task, setTask] = useState(route.params?.item);

  function navigateToTasks() {
    if (task.task !== "" || task.title !== "") {
      navigation.navigate("Tasks", { editTask: task });
      setTask({ title: "", task: "" });
      myToast("Task updated!", "#039e4f");
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

        <View style={styles.input}>
          <TextInput
            autoCapitalize="sentences"
            autoCorrect={false}
            keyboardType="default"
            style={styles.inputTitle}
            placeholder="Task title"
            placeholderTextColor="#6b7280"
            value={task.title}
            onChangeText={(title) => setTask({ ...task, title })}
          />
        </View>

        <View style={[styles.input, styles.inputTaskForm]}>
          <TextInput
            autoCapitalize="sentences"
            autoCorrect={false}
            keyboardType="default"
            style={styles.inputTask}
            placeholder="Just write it down ..."
            placeholderTextColor="#6b7280"
            value={task.task}
            onChangeText={(newTask) => setTask({ ...task, task: newTask })}
            multiline={true}
            textAlignVertical="top"
          />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        >
          <View style={styles.formAction}>
            <TouchableOpacity onPress={navigateToTasks}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Save changes</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
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
  inputTaskForm: {
    flex: 1,
  },
  inputTitle: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    letterSpacing: 0.6,
  },
  inputTask: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    letterSpacing: 0.6,
    lineHeight: 20,
  },
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 4,
  },
  btn: {
    backgroundColor: "#039e4f",
    borderRadius: 8,
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
