// import * as firebase from "firebase";
// import "firebase/auth";
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBbSWxOF90ck9i7he74OdIko_PDX0sHS1Y",
  authDomain: "rn-social-dddc7.firebaseapp.com",
  projectId: "rn-social-dddc7",
  storageBucket: "rn-social-dddc7.appspot.com",
  messagingSenderId: "780993218675",
  appId: "1:780993218675:web:344de2e068a6bb44758206",
  measurementId: "G-EVW2XQLSYH",
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// export default firebase;

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
