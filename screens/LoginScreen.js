import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "../firebase";
import { myToast } from "../components/myToaster";

export let auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigation.navigate("Overview");
        myToast("Login succesful!", "#039e4f");
      }
    });
    return () => unsubscribe();
  }, []);

  async function login() {
    if (!form.email || !form.password) {
      Alert.alert("Attention!", "Please fill out all fields");
      myToast("Login failed!", "red");
      return;
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log("Logged in:", userCredentials.user.uid);
      if (userCredentials.user.uid) {
        myToast("Login succesful!", "#039e4f");
        navigation.navigate("Overview");
      }
    } catch (err) {
      // Alert.alert('Invalid credentials', "No account found. Check the email / passaword and try again.")
      myToast("Check the email / passaword and try again!", "red");
      console.log("Error in Login:", err);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Task Master AI</Text>

          <Text style={styles.title}>Sign in to your account</Text>

          <Text style={styles.subtitle}>
            Get access to your tasks, AI and much more
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={styles.inputControl}
              placeholder="tony@example.com"
              placeholderTextColor="#6b7280"
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput
              secureTextEntry
              style={styles.inputControl}
              placeholder="********"
              placeholderTextColor="#6b7280"
              value={form.password}
              onChangeText={(password) => setForm({ ...form, password })}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={login}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={{ marginTop: "auto" }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.formFooter}>
            Don't have an account?{" "}
            <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 36,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e1e1e",
    marginBottom: 36,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e1e1e",
    marginBottom: 6,
    textAlign: "center",
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
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
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
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
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
