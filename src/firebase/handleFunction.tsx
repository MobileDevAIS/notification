// src/firebase.js

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const saveUserDetails = async (uid: any, details: any) => {
  try {
    const userDoc = doc(db, "users", uid);
    await setDoc(userDoc, details, { merge: true });
  } catch (error) {
    console.error("Error saving user details: ", error);
  }
};

const monitorAuthState = (callback: any) => {
  onAuthStateChanged(auth, callback);
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
export { auth, saveUserDetails, monitorAuthState, signOutUser };
