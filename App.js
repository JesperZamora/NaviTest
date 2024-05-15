import * as React from "react";
import "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OverviewScreen from "./screens/OverviewScreen";
import TasksScreen from "./screens/TasksScreen";
import CreateTaskScreen from "./screens/CreateTaskScreen";
import EditTaskScreen from "./screens/EditTaskScreen";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { app } from "./firebase";

import { View, Text, TouchableOpacity } from "react-native";
import AIScreen from "./screens/AIScreen";

export default function App({ navigation }) {
  const Stack = createNativeStackNavigator();
  const auth = getAuth(app);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#e8ecf4",
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
          contentStyle: { backgroundColor: "#e8ecf4" },
          headerShadowVisible: false,
          headerTintColor: "#222",
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Overview"
          component={OverviewScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={async () => {
                try {
                  await signOut(auth);
                  navigation.navigate("Login");
                } catch (error) {
                  console.error('Failed to logout:', error);
                }
              }}>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>Logout</Text>
              </TouchableOpacity>
            ),
            headerLeft: () => <View/>,
            gestureEnabled: false
          })}
        />

        <Stack.Screen
          name="Tasks"
          component={TasksScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={async () => {
                try {
                  await signOut(auth);
                  navigation.navigate("Login");
                } catch (error) {
                  console.error('Failed to logout:', error);
                }
              }}>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>Logout</Text>
              </TouchableOpacity>
            ),
          })}
        />
        
      
        <Stack.Screen name="AI" component={AIScreen} />
        <Stack.Screen name="Create Task" component={CreateTaskScreen} />
        <Stack.Screen name="Edit Task" component={EditTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
