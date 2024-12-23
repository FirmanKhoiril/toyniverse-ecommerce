import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBs2eK55O6WgImGq3sKhiikcKMj34RlzBE",
  authDomain: "toyniverse-767f4.firebaseapp.com",
  projectId: "toyniverse-767f4",
  storageBucket: "toyniverse-767f4.firebasestorage.app",
  messagingSenderId: "368666627609",
  appId: "1:368666627609:web:e18eea45cfe4785323e488",
  measurementId: "G-GJ75Z7CTLH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export  const provider = new GoogleAuthProvider();