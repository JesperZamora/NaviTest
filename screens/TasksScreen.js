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

export default function TasksScreen({ route, navigation }) {
  const [tasks, setTasks] = useState([
    {
      taskId: 1,
      title: "Hello world!",
      task: "This is the world! This is the world! This is the world! This is the world! This is the world! This is the world! This is the world!",
    },
    { taskId: 2, title: "Task1", task: "This is the new world!" },
    { taskId: 3, title: "Task2", task: "This is the world!!" },
    { taskId: 4, title: "Hello", task: "This is the world!" },
    { taskId: 5, title: "Hello3", task: "This is the world!2!" },
    { taskId: 6, title: "Hello", task: "This is the world!" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (route.params?.newTask) {
      const newTask = route.params?.newTask
      newTask.taskId = (tasks.length + 1); 
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  }, [route.params?.newTask]);

  useEffect(() => {
    if (route.params?.editTask) {
      const editTask = route.params?.editTask;
      const updatedTasks = tasks.map((task) => {
        if(task.taskId === editTask.taskId) {
          return {
            taskId: editTask.taskId,
            title: editTask.title,
            task: editTask.task
          }
        }
        return task;
      })
      setTasks(updatedTasks);
    }
  }, [route.params?.editTask]);

  function deleteTask(id) {
    const newTaskList = tasks.filter((task) => {
      if(task.taskId !== id) {
        return task;
      }
    })
    setTasks(newTaskList);
  }
  
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
    borderRadius: 12 
  }
});
