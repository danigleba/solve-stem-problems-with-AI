/*import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST)
import { PiCrownSimpleFill } from "react-icons/pi"
import BulletPoint from "./BulletPoints"

export default function PricingModal({ isModalOpen }) {
    const router = useRouter()
    const [clientSecret, setClientSecret] = useState("")
    const [state, setState] = useState("Show")
    const [isLoading, setIsLoading] = useState(false)
    const stripe = useStripe()
    const paymentElementOptions = {
        layout: "tabs",
    }   
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
    const handleSubmit = async () => {
        e.preventDefault()
        //setIsLoading(true)
        //handleSuccesfulPayment() 
      
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://mileto.danigleba.com/platform",
            },
            redirect: "if_required"
        })
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (paymentIntent.status == "requires_payment_method") //setIsLoading(false)
            if (paymentIntent.status == "succeeded") handleSuccesfulPayment()
        })
    }
  
    const handleSuccesfulPayment = async () => {
      //Setting premium property to true in Firestore
      const response = await fetch(`/api/firebase/updatePremium?userId=${user?.uid}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            }
        })
      const data = await response.json()
      console.log(data)
    }
    useEffect(() => {
        if (!isModalOpen) setState("Show")
      }, [isModalOpen])
    return (
            
        <div className={`${isModalOpen == true ? "" : "hidden"} w-screen h-screen flex items-center justify-center fixed`}>
        <div /*onClick={() => setIsModalOpen(false)} className="z-20 flex items-center justify-center bg-[#171717] w-full h-full opacity-30 fixed"></div>
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
                  {clientSecret && (     
                        <form id="payment-form" onSubmit={handleSubmit}>
                            <PaymentElement 
                                id="payment-element" 
                                options={paymentElementOptions}/>
                            <button 
                                id="submit"
                                disabled={isLoading || !stripe || !elements}
                                className="w-full mt-8 hover:scale-100">
                                <span id="button-text">
                                {isLoading ? 
                                    <div className="flex justify-center items-center gap-4">
                                    Loading...
                                    <LoadingAnimation />
                                    </div> 
                                    : 
                                    `Checkout`}
                                </span>
                            </button>
                        </form> 
                
                  )}
              </>
            )}
        </div>     
      </div>
    )
}
*/