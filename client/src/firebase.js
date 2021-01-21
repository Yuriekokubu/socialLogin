import firebase from 'firebase/app';
require('firebase/auth');

const firebaseConfig = {
  apiKey: 'AIzaSyBwPdccydXM5xtz_Xl-XgRlfbHcXeuigNA',
  authDomain: 'ecommerce-d33c8.firebaseapp.com',
  databaseURL: 'https://ecommerce-d33c8.firebaseio.com',
  projectId: 'ecommerce-d33c8',
  storageBucket: 'ecommerce-d33c8.appspot.com',
  messagingSenderId: '628574328037',
  appId: '1:628574328037:web:ddc5b47b2ffe9d01b3f00c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
