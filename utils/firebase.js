import firebase from "firebase/app"

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: "mileto-danigleba.firebaseapp.com",
  projectId: "mileto-danigleba",
  storageBucket: "mileto-danigleba.appspot.com",
  messagingSenderId: "483946650743",
  appId: "1:483946650743:web:7ecacf6bafba65afdd3a72"
}

const app =  initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, firebase, db }
