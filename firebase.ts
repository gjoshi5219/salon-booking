// Import the functions you need from the SDKs you need



import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJgeLig8HQnrsqIs-kIwvmFmnrt65J9h4",
  authDomain: "the-style-hub.firebaseapp.com",
  projectId: "the-style-hub",
  storageBucket: "the-style-hub.firebasestorage.app",
  messagingSenderId: "683979858290",
  appId: "1:683979858290:web:b05623e99f8c464256fdeb",
  measurementId: "G-NCDLFPGFPN"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



export { db };

// Initialize Firebase

const analytics = getAnalytics(app);