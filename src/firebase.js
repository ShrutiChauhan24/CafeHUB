import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBGfITRn4i7vttfzPo32CjQifOm5vGDPKk",
  authDomain: "cafehub-c0dd4.firebaseapp.com",
  projectId: "cafehub-c0dd4",
  storageBucket: "cafehub-c0dd4.appspot.com",
  messagingSenderId: "32459095679",
  appId: "1:32459095679:web:07634bedcdcdcba78b894a",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);