import { set } from "firebase/database";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  SafeAreaView
} from "react-native";

export default function CreateTaskScreen({route, navigation }) {
  const [task, setTask] = useState({
    title: "",
    task: "",
  });

  const aiTask = route.params?.item;
  useEffect(() => {
    if (aiTask) {
      setTask(aiTask);
    }
  }, [aiTask]);
  
  function navigateToTasks() {
    if(task.task !== "" || task.title !== "") {
      navigation.navigate("Tasks", { newTask: task });
      setTask({ title: "", task: "" });
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>
            Let Task Master help you organize your tasks!
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
                  <Text style={styles.btnText}>Save new task</Text>
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
    paddingTop:20,
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
    lineHeight: 20
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
