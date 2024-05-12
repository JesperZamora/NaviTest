import { View, Text, StyleSheet, Button } from "react-native";

export default function OverviewScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Overview</Text>
      <Button title="Go to Tasks" onPress={() => navigation.navigate("Tasks") } /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  }
})