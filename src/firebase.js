// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARsai1v_a0RAZU4c8h5ffXUx6GHiGfwwc",
  authDomain: "smart-attendance-system-14f6a.firebaseapp.com",
  projectId: "smart-attendance-system-14f6a",
  storageBucket: "smart-attendance-system-14f6a.firebasestorage.app",
  messagingSenderId: "264584988723",
  appId: "1:264584988723:web:cc6e679c1dad63cd28fb46"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
