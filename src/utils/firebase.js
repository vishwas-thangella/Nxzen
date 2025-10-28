// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM5TtxRcMl1E7rg9l6Sqh34HKSsXwa8HI",
  authDomain: "nexzen-200c4.firebaseapp.com",
  projectId: "nexzen-200c4",
  storageBucket: "nexzen-200c4.firebasestorage.app",
  messagingSenderId: "680647629925",
  appId: "1:680647629925:web:991ae6df63f16074fbba8c",
  measurementId: "G-6WF3TE61ZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);