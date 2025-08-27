// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB93X9zaa21MV4NhfEV_JASO8xfqb3GaQg",
  authDomain: "cse380-gravoyage.firebaseapp.com",
  projectId: "cse380-gravoyage",
  storageBucket: "cse380-gravoyage.appspot.com",
  messagingSenderId: "646045650159",
  appId: "1:646045650159:web:36c2f77131756fd4655f1a",
  measurementId: "G-38TNL2W0S5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);