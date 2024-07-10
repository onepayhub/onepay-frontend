import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import 'firebase/database';
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDB_3QE6aV7048ZEX1Eg40WBIHVDKL0lAM",
  authDomain: "onepay-d4c20.firebaseapp.com",
  projectId: "onepay-d4c20",
  storageBucket: "onepay-d4c20.appspot.com",
  messagingSenderId: "235849428498",
  appId: "1:235849428498:web:4ff1d0a184cefed9a372cb",
  measurementId: "G-T370MZEZEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Get the Auth service
const database = getDatabase(app); // Get the Database service

export { app, auth, database };