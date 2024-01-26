import Head from "next/head"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { Inter } from "next/font/google"
import { getAuth, onAuthStateChanged} from "firebase/auth";
import App from "@/utils/firebase"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import SideMenu from "@/components/SideMenu"
import LoadingAnimation from "@/components/LoadingAnimation"

const inter = Inter({ subsets: ["latin"] })

export default function Platform() {
    const router = useRouter()
    const auth = getAuth(App)
    const fileInputRef = useRef()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [textProblem, setTextProblem] = useState("")
    const [imagesProblem, setImagesProblem] = useState([])
    const [solution, setSolution] = useState("")

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const base64Image = event.target.result
                setImagesProblem((prevArray) => [...prevArray, base64Image])
            }
            reader.readAsDataURL(file)
        }
    }

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const solveProblem = async () => {
        try {
            const response = await fetch("/api/openai/solveProblem", {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({text: textProblem, images: imagesProblem}), 
            })
            const data = await response.json()
            console.log(data)
            return data.data.message.content
        } 
        catch (error) {
            console.error("Error fetching problem solution:", error.message)
        } 
    }

    const storeSolution = async (solution) => {
        try {
            const response = await fetch(`/api/firebase/uploadSolution`, {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({user: user, solution: solution, imagesProblem: imagesProblem, textProblem: textProblem}), 
            })
        } 
        catch (error) {
            console.error("Error fetching comments:", error.message)
        } 
    }

    const handleSubmit = async () => {
        //Returning if the user has provided no text and no images
        if (textProblem == "" && imagesProblem == []) return

        setLoading(true)
        //const solution = await solveProblem()
        storeSolution("This is a solution")
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
            else {
                router.push("/")
            }
        })
    }, [])
    return (
        <>
            <Head>
                {/* Basic Meta Tags */}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Snap your STEM problem & get a detailed solution."/>
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Mileto | Snap your STEM problem & get a detailed solution." />
                <meta property="og:description" content="Snap your STEM problem & get a detailed solution" />
                <meta property="og:image" content="/icon.png" />
                <meta property="og:url" content="mileto.danigleba.com" />
                <meta property="og:type" content="website" />
                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Mileto | Snap your STEM problem & get a detailed solution." />
                <meta name="twitter:description" content="Snap your STEM problem & get a detailed solution." />
                <meta name="twitter:image" content="/icon.png" />
                {/* Favicon */}
                <link rel="icon" href="/icon.png" />
                {/* Page Title */}
                <title>Mileto | Snap your STEM problem & get a detailed solution.</title>
            </Head>
            <main className={`${inter.className}`}>
                <Header user={user} />
                <SideMenu user={user}/>
                <div className="main pl-64 py-20">
                    {loading && (
                        <div className="font-semibold text-[#171717] flex gap-4">
                            <p>🧠 Thinking...</p>
                            <LoadingAnimation />
                        </div>
                    )}
                    {!loading && (
                        <div className="w-1/2 space-y-6">
                            <div className="flex gap-6">
                                <input ref={fileInputRef} className="hidden" type="file" onChange={handleFileChange} />
                                <button onClick={handleClick} className="text-base border border-[#dddddd] bg-[#f4f4f4] hover:bg-[#dddddd] duration-200 ease-in-out text-[#171717]">
                                    ⬆️ Upload an image
                                </button>
                            </div>
                            <div>
                                <textarea onChange={(e) => setTextProblem(e.target.value)} rows="6" className="block p-2 w-full text-sm rounded-lg border border-[#dddddd] max-h-72 placeholder:text-[#dddddd]" placeholder="A ball is dropped from a height of 10 meters. Calculate the time it takes for the ball to reach the ground. Assume there is no air resistance, and the acceleration due to gravity is 9.8 m/s^2."></textarea>
                            </div>
                            <div className="flex flex-row flex-wrap gap-6">
                                {imagesProblem.map((item, index) => (
                                    <a key={index} className="w-1/6">
                                        <div className="relative pb-[100%]">
                                            <Image
                                                layout="fill"
                                                objectFit="cover"
                                                alt="Uploaded image"
                                                src={item}
                                                className="rounded-xl"/>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            <button onClick={handleSubmit}>Solve problem</button>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
