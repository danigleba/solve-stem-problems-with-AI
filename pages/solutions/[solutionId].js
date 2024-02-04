import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import { getAuth, onAuthStateChanged} from "firebase/auth"
import App from "@/utils/firebase"
import Header from "@/components/Header"
import SideMenu from "@/components/SideMenu"
import MarkdownRenderer from "@/components/MarkdownMathText"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Platform() {
    const router = useRouter()
    const { solutionId } = router.query
    const auth = getAuth(App)
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [solution, setSolution] = useState()

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

    const getSolution = async () => {
        const solutions = userData.solutions
        const solution = await solutions.find((solution) => solution.id === solutionId)
        setSolution(solution)
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
        if (solutionId && userData) getSolution()
    }, [solutionId, userData])
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
                <meta name="twitter:image" content="/icon.jpg" />
                {/* Favicon */}
                <link rel="icon" href="/icon.jpg" />
                {/* Page Title */}
                <title>Mileto | Snap your STEM problem & get a detailed solution.</title>
            </Head>
            <main className={`${inter.className}`}>
                <Header user={user} userData={userData}/>
                <SideMenu userData={userData} solutionId={solutionId}/>
                <div className="main justify-start md:pl-64 py-12 md:py-20">
                    <div className="w-full p-10">
                        <h2>Problem</h2>
                        <p>{solution?.text}</p>
                        {solution?.images.map((item, index) => (
                            <div key={index}>
                                <div className="relative w-1/2 md:w-1/3 lg:w-1/6 aspect-square mt-2">
                                    <Image
                                        layout="fill"
                                        objectFit="cover"
                                        alt="Uploaded image"
                                        src={item}
                                        className="rounded-xl"/>
                                </div>
                            </div>
                        ))}
                        <h2 className="pt-12">Solution</h2>
                        <MarkdownRenderer source={solution?.solution.replace(/\*\*(.*?)\*\*/g, '\n\n**$1**')}></MarkdownRenderer>
                    </div>
                </div>
            </main>
        </>
    )
}
