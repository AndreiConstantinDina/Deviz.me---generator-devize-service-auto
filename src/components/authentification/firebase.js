// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const app = firebase.initializeApp({
    // apiKey: "AIzaSyDKmoPfxyHyPe0c8cuM_PEgwpbGP_R_lwc",
    // authDomain: "devizme2.firebaseapp.com",
    // projectId: "devizme2",
    // storageBucket: "devizme2.appspot.com",
    // messagingSenderId: "794398905297",
    // appId: "1:794398905297:web:d367b6485154d00f4486f0"
    apiKey: "AIzaSyC_xR16aFR0PBCZbGcQuzzJD7J4yE2maQQ",
    authDomain: "deviz-me-development.firebaseapp.com",
    projectId: "deviz-me-development",
    storageBucket: "deviz-me-development.appspot.com",
    messagingSenderId: "897879418231",
    appId: "1:897879418231:web:b04ef5a962e2cf4e016d72"
})

export const auth = app.auth()

export const db = getFirestore(app);

export default app