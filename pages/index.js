import Head from "next/head"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import App from "@/utils/firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
import { Inter } from "next/font/google"

const provider = new GoogleAuthProvider()
const inter = Inter({ subsets: ["latin"] })

export default function Index() {
  const router = useRouter()
  const auth = getAuth(App)
  const [user, setUser] = useState()

  const uploadNewUser = async () => {
    try {
      const response = await fetch(`/api/firebase/uploadNewUser`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }), 
      })
    } 
    catch (error) {
      console.error("Error fetching comments:", error.message)
    } 
  }

  const signInWithGoogle = async () => {
    if (user) router.push("/platform")
    else {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user
          setUser(user)
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("platform")
      } 
    })
  }, [])

  useEffect(() => {
    if (user) uploadNewUser()
  }, [user])
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
      <main className={`${inter.className} main`}>
        <div className="flex flex-col items-start justify-start w-full md:w-2/6 text-left">
          <h2 className="font-semibold text-2xl text-[#171717] pb-3">Mileto</h2>
          <div className="space-y-2 font-semibold text-[#737373]">
            <h2 className="text-2xl md:text-2xl">📸 📄 Snap your STEM problem. <br /> 💡 🤯 Get a detailed solution.</h2>
          </div>
          <div className="pt-6 w-full">
            <button onClick={signInWithGoogle}>
              Take a picture
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
