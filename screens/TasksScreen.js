import { useState } from "react";
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

export default function TasksScreen({ navigation }) {
  const [tasks, setTasks] = useState([
    { title: "Hello world!", task: "This is the world! This is the world! This is the world! This is the world! This is the world! This is the world! This is the world!" },
    { title: "Hello", task: "This is the new world!" },
    { title: "Hello", task: "This is the world!" },
    { title: "Hello", task: "This is the world!" },
    { title: "Hello", task: "This is the world!" },
    { title: "Hello", task: "This is the world!" },
  ]);
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
            // value={}
            onChangeText={() => {}}
          />
        </View>
        <FlatList
          style={{ borderRadius: 12 }}
          showsVerticalScrollIndicator={false}
          data={tasks}
          renderItem={({ item }) => (
            <TaskCard title={item?.title} task={item?.task} navigation={() => navigation.navigate("Edit Task")} />
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
});
