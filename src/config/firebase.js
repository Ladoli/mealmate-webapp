import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const FirebaseConfig = {
  apiKey: "AIzaSyC5h9jAxN2u6lmGg92Pu_q3KF9uorurMs0",
  authDomain: "meal-mate-da7f4.firebaseapp.com",
  databaseURL: "https://meal-mate-da7f4.firebaseio.com",
  projectId: "meal-mate-da7f4",
  storageBucket: "meal-mate-da7f4.appspot.com",
  messagingSenderId: "567187566432"
};

// const FirebaseConfig = {
//   apiKey: "AIzaSyCfOivJ6NsnXQYt1uHOrsiQgwA38wfLAb0",
//   authDomain: "meal-mate-testing.firebaseapp.com",
//   databaseURL: "https://meal-mate-testing.firebaseio.com",
//   projectId: "meal-mate-testing",
//   storageBucket: "meal-mate-testing.appspot.com",
//   messagingSenderId: "320135549050"
// };


firebase.initializeApp(FirebaseConfig);

export const databaseRef = firebase.database().ref();
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const restoRef = databaseRef.child("Restaurants");
