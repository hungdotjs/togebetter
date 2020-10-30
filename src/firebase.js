// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import 'firebase/analytics';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD04qAnv8XkoG5RJLxB71Yxai2_A48ZAuY',
  authDomain: 'togebetter.firebaseapp.com',
  databaseURL: 'https://togebetter.firebaseio.com',
  projectId: 'togebetter',
  storageBucket: 'togebetter.appspot.com',
  messagingSenderId: '212894188549',
  appId: '1:212894188549:web:c8b5a6bd2151b8b495886c',
  measurementId: 'G-CP273LPNEV',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const { FieldValue } = firebase.firestore;
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
