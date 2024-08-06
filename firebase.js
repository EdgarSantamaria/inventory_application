// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "inventory-managment-b0e4f.firebaseapp.com",
  projectId: "inventory-managment-b0e4f",
  storageBucket: "inventory-managment-b0e4f.appspot.com",
  messagingSenderId: "619641703552",
  appId: "1:619641703552:web:a0a6c5a59ce50e7f6e2a65",
  measurementId: "G-423G5NX5ZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};