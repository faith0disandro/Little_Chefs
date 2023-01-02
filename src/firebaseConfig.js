

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvqINftfgRFyOiKRKoMa1yGRgDoNky6A0",
  authDomain: "little-chefs.firebaseapp.com",
  projectId: "little-chefs",
  storageBucket: "little-chefs.appspot.com",
  messagingSenderId: "1022445125582",
  appId: "1:1022445125582:web:1bd01b1b14aecd14f6359f",
  measurementId: "G-M4S3F0FGCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const auth = getAuth(app);