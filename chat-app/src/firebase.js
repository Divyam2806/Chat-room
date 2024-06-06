import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGrG6uymTjY15s0vc6U_GsC9vtk616cP0",
  authDomain: "web-chat-area.firebaseapp.com",
  projectId: "web-chat-area",
  storageBucket: "web-chat-area.appspot.com",
  messagingSenderId: "646717380294",
  appId: "1:646717380294:web:d8fdfcbddad629705ce9c7",
  measurementId: "G-7CKDMV6HS6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
