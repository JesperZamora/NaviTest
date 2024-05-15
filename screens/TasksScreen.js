import { useState, useEffect } from "react";
import { app, database } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from "react-native";
import TaskCard from "../components/TaskCard";
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { myToast } from "../components/myToaster";

const colData = "tasksCol";
export default function TasksScreen({ route, navigation }) {
  const [values, loading, error] = useCollection(collection(database, colData));
  const data =
    values?.docs.map((doc) => ({ ...doc.data(), taskId: doc.id })) ?? [];


  const sortByDate = data.sort((objectA, objectB) => {
    const dateA = objectA.date;
    const dateB = objectB.date;

    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = sortByDate.filter(
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
      myToast("Task deleted!", "red");
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
      <Animated.View style={styles.container} entering={FadeInRight.duration(400)}>
        <View style={styles.input}>
          <AntDesign name="search1" size={22} color="grey" />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            style={styles.inputControl}
            placeholder="Search..."
            placeholderTextColor="#6b7280"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <GestureHandlerRootView style={{flex: 1, justifyContent: "center"}}>
          <FlatList
            style={styles.flatlist}
            showsVerticalScrollIndicator={false}
            data={filteredTasks}
            keyExtractor={item => item.taskId}
            renderItem={({ item }) => (
              <TaskCard
                title={item?.title}
                task={item?.task}
                id={item?.taskId}
                navigation={() => navigation.navigate("Edit Task", { item })}
                deleteCard={() => deleteTask(item?.taskId)}
                onSwipeOff={() => deleteTask(item?.taskId)}
              />
            )}
          />
        </GestureHandlerRootView>

        <View style={styles.formAction}>
          <TouchableOpacity onPress={() => navigation.navigate("Create Task")}>
            <Animated.View entering={FadeInRight.duration(500)} style={styles.btn}>
              <Text style={styles.btnText}>Create Task</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop:26,
    flex: 1,
  },
  input: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 14,
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    gap: 5,
  },
  inputControl: {
    flex: 1,
    fontSize: 18,
    letterSpacing: 0.6
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
