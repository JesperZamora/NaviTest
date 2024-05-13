import { View, Text, StyleSheet, Button } from "react-native";

export default function OverviewScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Go to Tasks" onPress={() => navigation.navigate("Tasks") } />
      <Button title="Go to AI" onPress={() => navigation.navigate("AI") } /> 
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