import { getApp, getApps, initializeApp } from "@firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbSWxOF90ck9i7he74OdIko_PDX0sHS1Y",
  authDomain: "rn-social-dddc7.firebaseapp.com",
  projectId: "rn-social-dddc7",
  storageBucket: "rn-social-dddc7.appspot.com",
  messagingSenderId: "780993218675",
  appId: "1:780993218675:web:344de2e068a6bb44758206",
  measurementId: "G-EVW2XQLSYH",
};

let app;
let auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}

export { app, auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
