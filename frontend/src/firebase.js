// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcsDGuN1-KOdQyWv12V-Rp8avALzrFSxQ",
  authDomain: "visual-vault-images.firebaseapp.com",
  projectId: "visual-vault-images",
  storageBucket: "visual-vault-images.appspot.com",
  messagingSenderId: "70561927287",
  appId: "1:70561927287:web:993b30940c6d4c903f3672",
  measurementId: "G-C4FB11Z8MQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app

