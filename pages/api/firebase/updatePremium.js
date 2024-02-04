import { db } from "@/utils/firebase"
import { doc, updateDoc } from "firebase/firestore"

export default async function handler(req, res) {
    const id = req.query.userId
    const userRef = doc(db, "users", `${id}`)
    try {
        await updateDoc(userRef, {
            premium: true
        })   
        res.status(200).json({ premiumUpdated: true })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
} 