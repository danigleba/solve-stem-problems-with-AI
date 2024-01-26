import { db } from "@/utils/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"

export default async function handler(req, res) {
    const { user, solution, imagesProblem, textProblem } = req.body
    const userRef = doc(db, "users", user.uid)
    const userSnap = await getDoc(userRef)
    const userData = userSnap.data()
    const solutions = userData?.solutions

    solutions?.push({ id: uuidv4(), solution: solution, text: textProblem, images: imagesProblem })

    try {
        await setDoc(doc(db, "users", user.uid), {
            "solutions": solutions,
        })
        res.status(201).json({ solutionId: true })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}
