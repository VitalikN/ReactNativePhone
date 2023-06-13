import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIjzwFDs_Hf09dNEtC1cw37WyjvF91cYQ",
  authDomain: "rn-new-1a15d.firebaseapp.com",
  projectId: "rn-new-1a15d",
  storageBucket: "rn-new-1a15d.appspot.com",
  messagingSenderId: "755865570743",
  appId: "1:755865570743:web:6c58d774d5677a99c4ec32",
  measurementId: "G-24T1YDP7FS",
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
