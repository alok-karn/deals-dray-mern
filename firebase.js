// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhe7bI3PIBzsdeATWNQshT5ikj3qKYQY0",
    authDomain: "hallmangement.firebaseapp.com",
    projectId: "hallmangement",
    storageBucket: "hallmangement.appspot.com",
    messagingSenderId: "288779564454",
    appId: "1:288779564454:web:e61016ccb33a87f3d50b67",
};

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

// Initialize Firebase
