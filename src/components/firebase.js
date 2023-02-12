// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDKmoPfxyHyPe0c8cuM_PEgwpbGP_R_lwc",
    authDomain: "devizme2.firebaseapp.com",
    projectId: "devizme2",
    storageBucket: "devizme2.appspot.com",
    messagingSenderId: "794398905297",
    appId: "1:794398905297:web:d367b6485154d00f4486f0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
