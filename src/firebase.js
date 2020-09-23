import firebase from "firebase";

const firebasdeApp = firebase.initializeApp({
  apiKey: "AIzaSyDJz2-fN3vOMIDNS7xFt9B93k19GwpeLOA",
  authDomain: "messenger-c9072.firebaseapp.com",
  databaseURL: "https://messenger-c9072.firebaseio.com",
  projectId: "messenger-c9072",
  storageBucket: "messenger-c9072.appspot.com",
  messagingSenderId: "868326246007",
  appId: "1:868326246007:web:7f0f1c9f4af2cbff1ca872",
  measurementId: "G-X1MGK62734",
});

const db = firebasdeApp.firestore();

export default db;
