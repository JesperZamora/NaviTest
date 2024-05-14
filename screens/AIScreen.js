import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { apiCall } from "../api/openAIChat";

import { Entypo } from "@expo/vector-icons";

export default function AIScreen({navigation}) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userMessage, setUsermessage] = useState("");
  const flatListRef = useRef();

  function getAiResponse() { 
    messages.push({role: "user", content: userMessage});

    setMessages([...messages]);
    setUsermessage("");
    Keyboard.dismiss();
    setIsLoading(true);

    apiCall(userMessage.trim(), messages).then((res) => {
      if(res.success) {
        const complentions = res.data;
        const updatedCompletions = complentions.map((message) => {
          if(!message.id) {
            return {
              role: message.role,
              content: message.content,
              id: `user-${new Date().getTime()}`
            }
          }
          return message;

        });

        setMessages(updatedCompletions);
        setIsLoading(false);
      } else {
        Alert.alert("Error", res.msg);
        setIsLoading(false);
      }
    })
  }

  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      },200);
    }
  }, [messages]);

  function navigateToCreateTask(selectedMessage) {
    if(messages) {
      const filteredMessages = messages.filter((msg) => selectedMessage.id === msg.id);
     
      navigation.navigate("Create Task", {item : { title: filteredMessages[0]. content, task: filteredMessages[1].content}});
    }
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Ask me anything!</Text>
          <Text style={styles.subtitle}>
            Even let me create you a picture 🧑🏻‍🎨
          </Text>
        </View>

        <FlatList
          ref={flatListRef}
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatlist}
          contentContainerStyle={styles.flatlistContent}
          showsVerticalScrollIndicator={false}
          data={messages}
          renderItem={({ item }) => {
            if (item.content.includes("https")) {
              return (
                <View style={[styles.box, styles.aiBox]}>
                  <Image
                    source={{ uri: item.content }}
                    style={{ borderRadius: 8, height: 300, width: 300 }}
                    resizeMode="contain"
                  />
                </View>
              );
            }

            if (item.role === "user") {
              return (
                <View style={[styles.box, styles.userBox]}>
                  <Text style={styles.chatText}>{item.content}</Text>
                </View>
              );
            } else {
              return (
                <TouchableOpacity onPress={() => navigateToCreateTask(item)}>
                  <View style={[styles.box, styles.aiBox]}>
                    <Text style={styles.chatText}>{item.content}</Text>
                  </View>
                </TouchableOpacity>

              );
            }
          }}
        ></FlatList>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        >
          <View style={styles.inputContainer}>
            <TextInput
              autoCorrect={false}
              placeholder="How can I help you?"
              style={styles.inputMessage}
              value={userMessage}
              onChangeText={setUsermessage}
            />

            {isLoading ? (
              <View style={{marginLeft: 6}}>
                <ActivityIndicator size="large" color="#222" />
              </View>
            ) : (
              <TouchableOpacity style={styles.sendBtn} onPress={getAiResponse}>
                <Entypo name="arrow-with-circle-up" size={42} color="#929292" />
              </TouchableOpacity>
            )}
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
    flex: 1,
    paddingHorizontal: 16
  },
  header: {
    marginTop: 10,
    gap: 4,
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
    letterSpacing: 0.8,
  },
  flatlist: {
    borderRadius: 12,
  },
  flatlistContent: {
    backgroundColor: "#fff",
    flexGrow: 1,
    borderRadius: 12,
    padding: 12,
  },
  inputContainer: {
    marginVertical: 16,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    
  },
  inputMessage: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    flexGrow: 1,
    width: 290,
  },
  box: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  userBox: {
    alignSelf: "flex-end",
    backgroundColor: "#e8ecf4",
    borderTopRightRadius: 0,
  },
  aiBox: {
    alignSelf: "flex-start",
    backgroundColor: "#D1FAE5",
    borderTopLeftRadius: 0,
  },
  chatText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
