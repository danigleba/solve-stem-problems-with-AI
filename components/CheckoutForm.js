import {useState, useEffect} from "react"
import { useRouter } from "next/router"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import LoadingAnimation from "./LoadingAnimation"
const CheckoutForm = ({ clientSecret, user }) => {
    const router = useRouter()
    const paymentElementOptions = {
        layout: "tabs",
    }  
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
      
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://mileto.danigleba.com/succes",
            },
            redirect: "if_required"
        })
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (paymentIntent.status == "requires_payment_method") setIsLoading(false)
            if (paymentIntent.status == "succeeded") handleSuccesfulPayment()
        })
    }

    const handleSuccesfulPayment = async () => {
      const response = await fetch(`/api/firebase/updatePremium?userId=${user?.uid}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            }
        })
      const data = await response.json()
      if (data.premiumUpdated) router.push("/platform")
    }
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions}/>
            <button id="submit" disabled={isLoading || !stripe || !elements} className="w-full text-base mt-8 hover:scale-100">
                <span id="button-text">
                    {isLoading ? 
                        <div className="flex justify-center items-center gap-4">
                            Loading...
                            <LoadingAnimation />
                        </div> 
                        : 
                        `Checkout $4,97`}
                </span>
            </button>
    </form> 
  )
}

export default CheckoutForm;