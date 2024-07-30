import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";
import { browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup } from "firebase/auth";

import {
  getFirestore,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);


export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);

const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
const firestore = getFirestore(app);

setPersistence(auth, browserSessionPersistence);

const signInWithGoogle = () => {
  signInWithPopup(auth, provider);
};

export {
  firestore,
  signInWithGoogle,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
};
