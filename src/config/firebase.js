import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// import * as firebase from 'firebase/database';



const FirebaseConfig = {
  apiKey: "AIzaSyC5h9jAxN2u6lmGg92Pu_q3KF9uorurMs0",
  authDomain: "meal-mate-da7f4.firebaseapp.com",
  databaseURL: "https://meal-mate-da7f4.firebaseio.com",
  projectId: "meal-mate-da7f4",
  storageBucket: "meal-mate-da7f4.appspot.com",
  messagingSenderId: "567187566432"
};


firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
