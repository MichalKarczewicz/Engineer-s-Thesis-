import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHpmGs1e1271RNnjRqhISNK0K4YtHzUvA",
  authDomain: "gym-workout-planner.firebaseapp.com",
  projectId: "gym-workout-planner",
  storageBucket: "gym-workout-planner.appspot.com",
  messagingSenderId: "140642164826",
  appId: "1:140642164826:web:525a82b639047645987863",
  measurementId: "G-TH1XF79FC3",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
