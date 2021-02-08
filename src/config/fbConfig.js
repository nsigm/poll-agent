/**
 * fbConfig.js
 * Configures and initializes our Firebase project, Firestore and Auth for the application. 
 * Add Firebase Credentials to a .env file in project's main directory.
 * 
 * @public
 * 
 */

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);
export const auth = firebase.auth();

export default firebase;