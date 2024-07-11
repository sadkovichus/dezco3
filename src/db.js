// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBinxXv49cuU4nh2nuzQ0AUQ2v6o_E2agE",
  authDomain: "dezco-c2d93.firebaseapp.com",
  databaseURL: "https://dezco-c2d93-default-rtdb.firebaseio.com",
  projectId: "dezco-c2d93",
  storageBucket: "dezco-c2d93.appspot.com",
  messagingSenderId: "424489211236",
  appId: "1:424489211236:web:a5ea7e81e2460cf10d9671",
  measurementId: "G-RELB2BL14S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);