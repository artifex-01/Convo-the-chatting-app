import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCYHCRKdNBps2_s1dloLO9P8MFmYQ_c2LM",
  authDomain: "chat-app-c00d6.firebaseapp.com",
  projectId: "chat-app-c00d6",
  storageBucket: "chat-app-c00d6.firebasestorage.app",
  messagingSenderId: "417539045432",
  appId: "1:417539045432:web:7d8dc6c46ed3375aa1cecd",
  measurementId: "G-KTRRBPT01D",
  databaseURL : "https://chat-app-c00d6-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
  