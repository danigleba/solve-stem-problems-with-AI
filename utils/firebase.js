import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDYCd9LWAutIGNqinTF3YNd98fHzeDpvMk",
  authDomain: "mileto-danigleba.firebaseapp.com",
  projectId: "mileto-danigleba",
  storageBucket: "mileto-danigleba.appspot.com",
  messagingSenderId: "483946650743",
  appId: "1:483946650743:web:7ecacf6bafba65afdd3a72"
}

const app =  initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app }
export { db }