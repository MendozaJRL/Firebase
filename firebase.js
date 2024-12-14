// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import { getDatabase } from "firebase/database"; // For Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUefDN8rPiCffHw8ns2OJfKml_87lo2z4",
  authDomain: "luminaflora-eef53.firebaseapp.com",
  databaseURL: "https://luminaflora-eef53-default-rtdb.firebaseio.com",
  projectId: "luminaflora-eef53",
  storageBucket: "luminaflora-eef53.firebasestorage.app",
  messagingSenderId: "686428803989",
  appId: "1:686428803989:android:691cda12d209933a065c9c",
  measurementId: "G-3HTPFD2GDF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app); // Export Authentication service
export const database = getDatabase(app); // Export Realtime Database service
export default app;
