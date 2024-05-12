import { app, database } from "../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskCard from "../components/TaskCard";

const colData = "tasksCol";
export default function TasksScreen({ route, navigation }) {
  const [values, loading, error] = useCollection(collection(database, colData));
  const data =
    values?.docs.map((doc) => ({ ...doc.data(), taskId: doc.id })) ?? [];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = data.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function postTask(task) {
    try {
      await addDoc(collection(database, colData), task);
    } catch (error) {
      console.log("Error saving document:", error);
    }
  }

  async function putTask(task) {
    try {
      const editDocRef = doc(database, colData, task.taskId);
      await updateDoc(editDocRef, {
        title: task.title,
        task: task.task
      });
    } catch (error) {
      console.log("Error updating document:", error);
    }
  }

  async function deleteTask(taskId) {
    try {
      const taskDocRef = doc(database, colData, taskId);
      await deleteDoc(taskDocRef);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  useEffect(() => {
    if (route.params?.newTask) {
      const newTask = route.params?.newTask;
      postTask(newTask);
    }
  }, [route.params?.newTask]);

  useEffect(() => {
    if (route.params?.editTask) {
      const editedTask = route.params?.editTask;
      putTask(editedTask);
    }
  }, [route.params?.editTask]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            style={styles.inputControl}
            placeholder="Search"
            placeholderTextColor="#6b7280"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <FlatList
          style={styles.flatlist}
          showsVerticalScrollIndicator={false}
          data={filteredTasks}
          renderItem={({ item }) => (
            <TaskCard
              title={item?.title}
              task={item?.task}
              navigation={() => navigation.navigate("Edit Task", { item })}
              deleteCard={() => deleteTask(item?.taskId)}
            />
          )}
        />

        <View style={styles.formAction}>
          <TouchableOpacity onPress={() => navigation.navigate("Create Task")}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Create Task</Text>
            </View>
          </TouchableOpacity>
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
  input: {
    marginBottom: 16,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  formAction: {
    marginVertical: 20,
  },
  btn: {
    backgroundColor: "#075eec",
    borderRadius: "8",
    borderWidth: 1,
    borderColor: "#075eec",
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
  flatlist: {
    borderRadius: 12,
  },
});
