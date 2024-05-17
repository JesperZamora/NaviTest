import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";

export default function TextToSpeech({ say }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
    } else {
      const thingToSay = `${say.task}`;
      const options = {
        language: "en-US",
        pitch: 0.5,
        rate: 0.75,
        volume: 0.8,
        voice: "com.apple.ttsbundle.Samantha-compact",
      };
      Speech.speak(thingToSay, options, {
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
    setIsSpeaking(!isSpeaking);
  };

  return (
    <TouchableOpacity onPress={toggleSpeech}>
      <FontAwesome
        name="microphone"
        size={20}
        color={isSpeaking ? "#FF0000" : "#929292"}
      />
    </TouchableOpacity>
  );
}
