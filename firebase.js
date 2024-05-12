// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHNyupNeJzglfrxZnp2QkItjytlzmo_rU",
  authDomain: "examproject-2024.firebaseapp.com",
  projectId: "examproject-2024",
  storageBucket: "examproject-2024.appspot.com",
  messagingSenderId: "954850820428",
  appId: "1:954850820428:web:0dcf478c17e4ca90bbcfe9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { app, database }