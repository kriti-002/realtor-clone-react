// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIZjtWRl85QLmH2EiQQuAdRCkZs-f5RvA",
  authDomain: "realtor-clone-app-a010e.firebaseapp.com",
  projectId: "realtor-clone-app-a010e",
  storageBucket: "realtor-clone-app-a010e.appspot.com",
  messagingSenderId: "428148807032",
  appId: "1:428148807032:web:5877396410076245c5a48d"
};

// Initialize Firebase
initializeApp(firebaseConfig);
//export const auth= getAuth(app)
export const db= getFirestore()