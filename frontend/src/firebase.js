// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-hsa-estates.firebaseapp.com",
  projectId: "mern-hsa-estates",
  storageBucket: "mern-hsa-estates.appspot.com",
  messagingSenderId: "865596663955",
  appId: "1:865596663955:web:4ff793d1853abf2363c566"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);