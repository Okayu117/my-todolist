import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCrIm29xHq3FpqHbKz5zJ4fEkeevmvtrO0",
  authDomain: "todolist-e1383.firebaseapp.com",
  projectId: "todolist-e1383",
  storageBucket: "todolist-e1383.appspot.com",
  messagingSenderId: "652865907987",
  appId: "1:652865907987:web:c03f61de173cbfc7107ee6"
});

const db = getFirestore();

const auth = getAuth();
export { db, auth };