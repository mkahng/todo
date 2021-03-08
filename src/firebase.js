import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCYAYccKHW6rvHzl27l34QK4uNjUmdr-0U",
  authDomain: "hello-world-7136e.firebaseapp.com",
  projectId: "hello-world-7136e",
  storageBucket: "hello-world-7136e.appspot.com",
  messagingSenderId: "184264621655",
  appId: "1:184264621655:web:47ffce35a99aa7c88eed12"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
