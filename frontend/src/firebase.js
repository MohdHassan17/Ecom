// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD38yDhT3XHjIr7prXMnKN3CnygXvS7Ygk",
  authDomain: "ecom-f99d0.firebaseapp.com",
  projectId: "ecom-f99d0",
  storageBucket: "ecom-f99d0.appspot.com",
  messagingSenderId: "460916733986",
  appId: "1:460916733986:web:2420990538530c32fc727b",
  measurementId: "G-NVRL6ESJ3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);

export { storage };