import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_API_KEY,
  authDomain: process.env.REACT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.envREACT_FIREBASE_API_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
