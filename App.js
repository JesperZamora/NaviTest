import * as React from 'react';
import "react-native-reanimated"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import OverviewScreen from './screens/OverviewScreen';
import TasksScreen from './screens/TasksScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
import EditTaskScreen from './screens/EditTaskScreen'

import { View } from 'react-native';
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
        screenOptions= {{
          headerStyle: {
            backgroundColor: "#e8ecf4",
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold' 
          },
          contentStyle: { backgroundColor: "#e8ecf4" },
          headerShadowVisible: false,
          headerTintColor: "#222"
        }}

      >
        <Stack.Screen name="Login" component={LoginScreen} 
          options={{
            headerShown: false
          }} 
        />
        <Stack.Screen name="Register" component={RegisterScreen} 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="Overview" component={OverviewScreen}          options={{
          title: "Overview",
          headerStyle: {
            backgroundColor: "#e8ecf4",
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: 'bold' 
          },
          headerShadowVisible: false,
          //headerLeft: () => <View/>,
          gestureEnabled: false,
        }} />

        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="Create Task" component={CreateTaskScreen}/>
        <Stack.Screen name="Edit Task" component={EditTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}