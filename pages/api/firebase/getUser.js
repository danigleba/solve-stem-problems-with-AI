import { db } from "@/utils/firebase"
import { doc, getDoc } from "firebase/firestore"

export default async function handler(req, res) {
    const id = req.query.id
    const userRef = doc(db, "users", `${id}`)
    const userSnap = await getDoc(userRef)
    try {
        res.status(200).json({ data: userSnap.data() })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
} 