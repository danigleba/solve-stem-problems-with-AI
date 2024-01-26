import Head from "next/head"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { Inter } from "next/font/google"
import { getAuth, onAuthStateChanged} from "firebase/auth";
import App from "@/utils/firebase"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import SideMenu from "@/components/SideMenu"

const inter = Inter({ subsets: ["latin"] })

export default function Platform() {
    const router = useRouter()
    const auth = getAuth(App)
    const fileInputRef = useRef()
    const [user, setUser] = useState()
    const [textProblem, setTextProblem] = useState()
    const [imagesProblem, setImagesProblem] = useState([])

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

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                setUser(user)
            }
            else {
                router.push("/")
            }
        })
    }, [])

    useEffect(() => {
        console.log(imagesProblem)
    }, [imagesProblem])
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
                <div className="main pl-64">
                    <div className="w-1/2 space-y-6">
                        <div className="flex gap-6">
                            <button className="text-base border border-[#dddddd] bg-[#f4f4f4] hover:bg-[#dddddd] duration-200 ease-in-out text-[#171717]">
                                📸 Take a picture
                            </button>
                            <input ref={fileInputRef} className="hidden" type="file" onChange={handleFileChange} />
                            <button onClick={handleClick} className="text-base border border-[#dddddd] bg-[#f4f4f4] hover:bg-[#dddddd] duration-200 ease-in-out text-[#171717]">
                                ⬆️ Upload an image
                            </button>
                        </div>
                        <div>
                            <textarea onChange={(e) => setTextProblem(e)} rows="6" className="block p-2 w-full text-sm rounded-lg border border-[#dddddd] max-h-72 placeholder:text-[#dddddd]" placeholder="A ball is dropped from a height of 10 meters. Calculate the time it takes for the ball to reach the ground. Assume there is no air resistance, and the acceleration due to gravity is 9.8 m/s^2."></textarea>
                        </div>
                        <div className="flex flex-row flex-wrap gap-6">
                            {imagesProblem.map((item, index) => (
                                <a key={index}>
                                    <div className="w-1/3">
                                        <Image width={100} height={100} layout="responsive" alt="Uploaded image" src={item} className="rounded-xl" />
                                    </div>
                                </a>
                            ))}
                        </div>
                        <button>Solve problem</button>
                    </div>
                </div>
            </main>
        </>
    )
}
