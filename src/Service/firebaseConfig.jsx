// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwNL3S9V9KHRe9FfJ7_14rZLh7V7Drudo",
  authDomain: "ai-trip-planner-a43e0.firebaseapp.com",
  projectId: "ai-trip-planner-a43e0",
  storageBucket: "ai-trip-planner-a43e0.appspot.com",
  messagingSenderId: "611366425061",
  appId: "1:611366425061:web:1d3d512924e2e10ae15f0c",
  measurementId: "G-J77FQXWJTG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);