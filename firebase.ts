import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJgeLig8HQnrsqIs-kIwvmFmnrt65J9h4",
  authDomain: "the-style-hub.firebaseapp.com",
  projectId: "the-style-hub",
  storageBucket: "the-style-hub.appspot.com", // Fixed incorrect URL
  messagingSenderId: "683979858290",
  appId: "1:683979858290:web:b05623e99f8c464256fdeb",
  measurementId: "G-NCDLFPGFPN"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Analytics (only in the browser)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, auth, analytics };
