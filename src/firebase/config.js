// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ0Q872y5tCw95YKZ2VRh7F_OENgZZ99s",
  authDomain: "job-listing-app-8f27e.firebaseapp.com",
  projectId: "job-listing-app-8f27e",
  storageBucket: "job-listing-app-8f27e.appspot.com",
  messagingSenderId: "659413414965",
  appId: "1:659413414965:web:9dfa6482f08d53dc816d7c",
  measurementId: "G-2PSHFZXWM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {app, db}