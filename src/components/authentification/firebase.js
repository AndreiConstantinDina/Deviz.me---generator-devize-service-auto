import {getFirestore} from '@firebase/firestore'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getStorage } from "firebase/storage";


export const app = firebase.initializeApp({
    apiKey: "AIzaSyC_xR16aFR0PBCZbGcQuzzJD7J4yE2maQQ",
    authDomain: "deviz-me-development.firebaseapp.com",
    projectId: "deviz-me-development",
    storageBucket: "deviz-me-development.appspot.com",
    messagingSenderId: "897879418231",
    appId: "1:897879418231:web:b04ef5a962e2cf4e016d72"
})

export const auth = app.auth()

export const db = getFirestore(app);
export const storage = getStorage(app);