
import { initializeFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr8Aniq_Z1-DcNJdO3FTFsPb7hZBs51e0",
  authDomain: "mark3-2dbb0.firebaseapp.com",
  projectId: "mark3-2dbb0",
  storageBucket: "mark3-2dbb0.appspot.com",
  messagingSenderId: "12294923340",
  appId: "1:12294923340:web:fb6a07bcaa7553442940e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { db }