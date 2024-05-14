import axios from "axios";
import { apiKey } from "../keys/aiKey";

const client = axios.create({
  headers: {
    "Authorization": "Bearer " + apiKey,
    "content-type": "application/json"
  }
});

const chatGptEndpoint = "https://api.openai.com/v1/chat/completions";
const dalleEndpoint = "https://api.openai.com/v1/images/generations";

export const apiCall = async(prompt, messages) => {
  try {
    const res = await client.post(chatGptEndpoint, {
      model: "gpt-3.5-turbo",
      messages: [{
        role: 'user',
        content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt} . Simply answer with a yes or no.`
      }]
    });
    console.log('data:', res.data.choices[0].message);
    let isArt = res.data?.choices[0]?.message?.content;

    if(isArt.toLowerCase().includes('yes')) {
      console.log("dalle api call");
      return dalleApiCall(prompt, messages || []);
    } else {
      console.log("chat gpt api call");
      return chatgptApiCall(prompt, messages || []);
    }
  } catch(error) {
    console.log("error", error);
    return Promise.resolve({succes: false, msg: error.messages});
  }
}

const chatgptApiCall = async (prompt, messag) => {
  try {
    const res = await client.post(chatGptEndpoint, {
      model: "gpt-3.5-turbo",
      messages: messag
    });

    let answer = res.data?.choices[0]?.message?.content;
    console.log(answer)
    messag.push({role: "assistant", content: answer.trim()})
    return Promise.resolve({success: true, data: messag});
  } catch(error) {
    console.log("error", error);
    return Promise.resolve({success: false, msg: error.messages});
  }
}

const dalleApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(dalleEndpoint, {
      prompt,
      n: 1,
      size: "512x512"
    });

    let url = res?.data?.data[0]?.url;
    console.log(url);
    messages.push({role: "assistant", content: url})
    return Promise.resolve({success: true, data: messages});

  } catch(error) {
    console.log("error", error);
    return Promise.resolve({success: false, msg: error.messages});
  }
}