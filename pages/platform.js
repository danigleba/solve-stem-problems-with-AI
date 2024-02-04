import Head from "next/head"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { getAuth, onAuthStateChanged} from "firebase/auth"
import App from "@/utils/firebase"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import SideMenu from "@/components/SideMenu"
import LoadingAnimation from "@/components/LoadingAnimation"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Platform() {
    const router = useRouter()
    const auth = getAuth(App)
    const fileInputRef = useRef()
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [textProblem, setTextProblem] = useState("")
    const [imagesProblem, setImagesProblem] = useState([])
    
    const getUserData = async () => {
        try {
            const response = await fetch(`/api/firebase/getUser?id=${user.uid}`, {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
              },
            })
            const data = await response.json()
            setUserData(data.data)
        } 
        catch (error) {
            console.error("Error fetching problem solution:", error.message)
        } 
    }

    //Handle uploading images
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
              body: JSON.stringify({user: user, userData: userData, solution: solution, imagesProblem: imagesProblem, textProblem: textProblem}), 
            })
            const data = await response.json()
            return data.solutionId
        } 
        catch (error) {
            console.error("Error fetching comments:", error.message)
        } 
    }

    const submitProblem = async () => {
        if (userData.premium == false && userData.credit < 1) {
            router.push("/go-premium")
            return
        } 
        if (textProblem == "" && imagesProblem.length == 0) {
            setErrorMessage("Upload an image or write down a problem to solve.")
            return
        }
        setErrorMessage("") 
        handleSubmit()
    }

    const handleSubmit = async () => {
        setLoading(true)
        const solution = await solveProblem()
        const solutionId = await storeSolution(solution)
        router.push(`/solutions/${solutionId}`)
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

    useEffect(() => {
        if (user) getUserData()
    }, [user])

    useEffect(() => {
        setErrorMessage("")
    }, [textProblem, imagesProblem])
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
                <meta property="og:image" content="/icon.jpg" />
                <meta property="og:url" content="mileto.danigleba.com" />
                <meta property="og:type" content="website" />
                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Mileto | Snap your STEM problem & get a detailed solution." />
                <meta name="twitter:description" content="Snap your STEM problem & get a detailed solution." />
                <meta name="twitter:image" content="/icon.jpeg" />
                {/* Favicon */}
                <link rel="icon" href="/icon.jpg" />
                {/* Page Title */}
                <title>Mileto | Snap your STEM problem & get a detailed solution.</title>
            </Head>
            <main className={`${inter.className}`}>
                <Header user={user} userData={userData}/>
                <SideMenu userData={userData}/>
                <div className="main px-8 md:px-0 md:pl-64 md:pt-20">
                    {loading && (
                        <div className="font-semibold text-[#171717] flex gap-4">
                            <p>🧠 Thinking...</p>
                            <LoadingAnimation />
                        </div>
                    )}
                    {!loading && (
                        <div className="w-full md:w-1/2 space-y-6">
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
                                    <div key={index} className="w-1/2 md:w-1/3 lg:w-1/6">
                                        <div className="relative pb-[100%]">
                                            <Image
                                                layout="fill"
                                                objectFit="cover"
                                                alt="Uploaded image"
                                                src={item}
                                                className="rounded-xl"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="mb-2 text-center text-red-500">{errorMessage}</p>
                                <button onClick={submitProblem}>Solve problem</button>
                                <p className="text-xs text-center pt-2">Mileto can make mistakes. Consider reviewing important information.</p>
                            </div>
                        </div>
                    )}
                </div>  
            </main>
        </>
    )
}
