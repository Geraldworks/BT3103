import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJNupxZf0JznDiEr9OPMghcPp1aLhqQ54",
    authDomain: "gymmbuddy-3e930.firebaseapp.com",
    projectId: "gymmbuddy-3e930",
    storageBucket: "gymmbuddy-3e930.appspot.com",
    messagingSenderId: "1009358879255",
    appId: "1:1009358879255:web:4a38fd81e13728ddb07a52",
    measurementId: "G-Z1PVS9WR43"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };