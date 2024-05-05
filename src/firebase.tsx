import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAaWCzIY5NC3x5VyH4jsTRI9YiV46HP4pk",
  authDomain: "todolist-aaa8c.firebaseapp.com",
  projectId: "todolist-aaa8c",
  storageBucket: "todolist-aaa8c.appspot.com",
  messagingSenderId: "38551991223",
  appId: "1:38551991223:web:ad840503d03da106d6ae32"
});

const db = getFirestore();

const auth = getAuth();
export { db, auth };