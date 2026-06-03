// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfy0XDWtRG_Qk1FqevlpE527-E5nTxoSk",
  authDomain: "evaluacion-app-tribules.firebaseapp.com",
  projectId: "evaluacion-app-tribules",
  storageBucket: "evaluacion-app-tribules.firebasestorage.app",
  messagingSenderId: "502228962236",
  appId: "1:502228962236:web:6662d2f08b6e17edef79b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})