import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBqaAVv-TBnjTB0tlKN5nv4Iw8SJExn0PQ",
    authDomain: "ecommerce-b570a.firebaseapp.com",
    projectId: "ecommerce-b570a",
    storageBucket: "ecommerce-b570a.appspot.com",
    messagingSenderId: "771328521586",
    appId: "1:771328521586:web:7d40d3f39c11d9668f59eb"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();