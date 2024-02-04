import Head from "next/head"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import App from "@/utils/firebase"
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"
import Header from "@/components/Header"
import SideMenu from "@/components/SideMenu"
import { Inter } from "next/font/google"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { PiCrownSimpleFill } from "react-icons/pi"
import BulletPoint from "@/components/BulletPoints"
import CheckoutForm from "@/components/CheckoutForm"
const provider = new GoogleAuthProvider()
const inter = Inter({ subsets: ["latin"] })
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST)

export default function Index() {
  const router = useRouter()
  const auth = getAuth(App)
  const [user, setUser] = useState()
  const [userData, setUserData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState("")

    const appearance = {
        theme: "stripe",
        variables: {
            colorPrimary: "#ee9d83",
        }
      }
      const loader = "auto"
      const stripeOptions = {
          clientSecret,
          appearance,
          loader
      }
    const [state, setState] = useState("Show")

   
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

const createPaymentIntent = async () => {
    const stripe = await stripePromise
    const url = "/api/stripe/createPaymentIntent"
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            }
        })
    const data = await response.json()
    console.log(data.clientSecret)
    setClientSecret(`${data.clientSecret}`)
    setState("Pay")
}


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else router.push("/")
    })
  }, [])

  useEffect(() => {
    if (user) getUserData()
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
        <Header user={user} userData={userData}/>
        <SideMenu userData={userData}/>
        <main className={`${inter.className} main px-8`}>
            
        <div className="w-full md:w-96 h-max bg-white border border-[#dddddd] text-center rounded-2xl mx-8 p-4 md:p-6 z-50 md:ml-64 md:mt-20">  
            {state == "Show" && (
                <>
                    <h2 className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r inline-block text-transparent bg-clip-text text-2xl md:text-3xl flex items-center justify-center gap-2">Go Premium <PiCrownSimpleFill className="text-yellow-400"/></h2>
                    <p className="text-md md:text-lg font-medium">To solve unlimited problems</p>
                    <p className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r inline-block text-transparent bg-clip-text font-black text-4xl pt-6">4,97 <a className="text-xl">€</a></p>
                    <div className="flex items-center justify-center w-full">
                        <div className="pt-6 pb-12 space-y-2 w-max font-medium text-base">
                            <BulletPoint text="Solve unlimited problems" />
                            <BulletPoint text="Request new features" />
                            <BulletPoint text="Pay once, use forever" />
                        </div>
                    </div>
                    <button onClick={createPaymentIntent}>Go Premium</button>
                </>        
            )}
            {state == "Pay" && (
              <>
                <h2 className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r inline-block text-transparent bg-clip-text text-2xl md:text-3xl flex items-center justify-center gap-2">Go Premium <PiCrownSimpleFill className="text-yellow-400"/></h2>
                <p className="text-md md:text-lg font-medium pb-6">To solve unlimited problems</p>
              {clientSecret && (
                <Elements options={stripeOptions} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret} user={user} />
                </Elements>
              )}
               
              </>
            )}
        </div>     

        </main>
    </>
  )
}
