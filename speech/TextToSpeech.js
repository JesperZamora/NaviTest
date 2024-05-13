import * as React from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { FontAwesome } from '@expo/vector-icons';


export default function TextToSpeech({ say }) {
  const speak = () => {
    const thingToSay = `${say.task}`;
    const options = {
      language: 'en-US', // Specify the language
      pitch: 0.5,        // Adjust the pitch (default is 1.0)
      rate: 0.75,        // Adjust the speed of the speech (default is 1.0)
      volume: 0.8,       // Set the volume (80% of maximum volume)
      voice: 'com.apple.ttsbundle.Samantha-compact'
    };
    Speech.speak(thingToSay, options);
  };
  return (
    <TouchableOpacity onPress={speak}>
      <FontAwesome name="microphone" size={20} color="#929292" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});