// src/firebase.js

// 1. Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";       // <--- Add this
import { getFirestore } from "firebase/firestore"; // <--- Add this
import { getAnalytics } from "firebase/analytics";

// 2. Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFN_VBC3VVx-T4cIwkOpnSKBLl9KYXRgA",
  authDomain: "oni-computer.firebaseapp.com",
  projectId: "oni-computer",
  storageBucket: "oni-computer.firebasestorage.app",
  messagingSenderId: "815966706358",
  appId: "1:815966706358:web:e26fafce1fa6e678ac2417",
  measurementId: "G-0MV5G5Q08H"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 4. EXPORT the services so other files can use them
export const auth = getAuth(app);       // <--- Vital for Login/Register
export const db = getFirestore(app);    // <--- Vital for Cart/Checkout
export { analytics };