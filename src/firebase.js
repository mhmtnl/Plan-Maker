// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZfrciQImouW49m32XiFGZHcnJLSiCoLQ",
  authDomain: "todo-app-c80d3.firebaseapp.com",
  projectId: "todo-app-c80d3",
  storageBucket: "todo-app-c80d3.appspot.com",
  messagingSenderId: "72882258228",
  appId: "1:72882258228:web:6840169907faf3a3616561"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)