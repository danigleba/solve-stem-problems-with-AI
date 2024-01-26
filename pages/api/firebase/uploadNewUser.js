import { db } from "@/utils/firebase"
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"

export default async function handler(req, res) {
  const user = req.body.user
  try {
    //Checking if user with same email already exists
    const usersRef = collection(db, "users")
    const queryUsers = query(usersRef, where("email", "==", user.email))
    const userSnapshot = await getDocs(queryUsers)
    if (userSnapshot.empty) {
        const newUser = await setDoc(doc(db, "users", user.uid), {
            username: user.displayName,
            email: user.email,
            profile_url: user.photoURL,
            credit: 5,
            premium: false, 
            problems: []
        })
    }
    res.status(201).json({ succes: true })
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
} 
