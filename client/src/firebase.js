// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1C6GazrXPgCWE9mURrbaKv5tjd4sGltY",
  authDomain: "ecommerce-shop-4e0c4.firebaseapp.com",
  projectId: "ecommerce-shop-4e0c4",
  storageBucket: "ecommerce-shop-4e0c4.appspot.com",
  messagingSenderId: "907788846811",
  appId: "1:907788846811:web:2194bdad2774d983f86efe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;