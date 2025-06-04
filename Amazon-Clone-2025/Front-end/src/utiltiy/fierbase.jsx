import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'; 
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCJEecrTyrh_6RdUdvOa0w6LX_zEVKOv3g",
  authDomain: "clone-c9d9f.firebaseapp.com",
  projectId: "clone-c9d9f",
  storageBucket: "clone-c9d9f.firebasestorage.app",
  messagingSenderId: "464307094770",
  appId: "1:464307094770:web:2ac5a3adb74caa6189bc6b"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app);