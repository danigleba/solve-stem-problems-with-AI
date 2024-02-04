import { db } from "@/utils/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"

export default async function handler(req, res) {
    const { user, userData, solution, imagesProblem, textProblem } = req.body
    const id = uuidv4()
    const solutions = userData?.solutions
    const userCredit = userData?.credit

    solutions?.push({ id: id, solution: solution, text: textProblem, images: imagesProblem, title: "Your problem" })

    try {
        await updateDoc(doc(db, "users", user.uid), {
            "solutions": solutions,
            "credit": userCredit > 0 ? userCredit - 1 : 0
        })
        res.status(201).json({ solutionId: id })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}
