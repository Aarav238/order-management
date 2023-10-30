import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBhy6RTPvYGNtbIdMkWPGlPv2MbGOmT9RI",
    authDomain: "order-management-dd9b1.firebaseapp.com",
    projectId: "order-management-dd9b1",
    storageBucket: "order-management-dd9b1.appspot.com",
    messagingSenderId: "799449155771",
    appId: "1:799449155771:web:bdcfe916f3be9bfde0419e",
    measurementId: "G-ENTS6RH0MS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };