import { initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env["NEXT_PUBLIC_FIREBASE_API_KEY"],
  authDomain: process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"],
  projectId: process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
  storageBucket: process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: process.env["NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID"],
  appId: process.env["NEXT_PUBLIC_FIREBASE_APP_ID"],
  measurementId: process.env["NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"],
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "it";

const db = getFirestore(app);

const twitterAuthProvider = new TwitterAuthProvider();
export { auth, db, twitterAuthProvider };
