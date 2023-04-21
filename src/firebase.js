import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDb3ltJHAxn1_AnDbQbAc5gOeH5_1pQ3ZA",
  authDomain: "reminder-payment-app.firebaseapp.com",
  projectId: "reminder-payment-app",
  storageBucket: "reminder-payment-app.appspot.com",
  messagingSenderId: "376489703611",
  appId: "1:376489703611:web:3ed6c6968111f79c0b919e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const messaging = getMessaging(app);

export { app, auth, db, messaging };

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
