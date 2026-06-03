
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
=======

import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// This is a mock configuration and is not used in the demo.
// In a real application, you would replace this with your actual
// Firebase project configuration.
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAuSf90ZjT8tmeTKgre0I5CFGWKqs1E1cc",
  authDomain: "studio-9884214501-3e117.firebaseapp.com",
  projectId: "studio-9884214501-3e117",
  storageBucket: "studio-9884214501-3e117.appspot.com",
  messagingSenderId: "943006094640",
  appId: "1:943006094640:web:f15e92e46d66340ee0e4f5",
};

// These are mock instances and do not connect to a real Firebase backend.
const app = {};
const db = {};
const auth = {};
const storage = {};

export { db, auth, storage, app };

