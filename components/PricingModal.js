import { useRouter } from "next/router"
import { PiCrownSimpleFill } from "react-icons/pi"

export default function PricingModal() {
    const router = useRouter()
    return (
                <div className="w-96 h-max bg-white border border-[#dddddd] text-center rounded-2xl p-6">
                    <h2 className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r inline-block text-transparent bg-clip-text text-3xl flex items-center justify-center gap-2">Go Premium <PiCrownSimpleFill className="text-yellow-400"/></h2>
                    <p className="text-lg font-medium">To solve unlimited problems</p>
                    <p className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r inline-block text-transparent bg-clip-text font-black text-4xl pt-6">4,97 <a className="text-xl">€</a></p>
                    <div className="pt-6 pb-12 space-y-2 mx-12 font-medium">
                        <div className="flex items-center justify-start gap-3">
                            <div className="w-1.5 aspect-square rounded-full bg-[#171717]"></div>
                            <p>Solve unlimited problems</p>
                        </div>
                        <div className="flex items-center justify-start gap-3">
                            <div className="w-1.5 aspect-square rounded-full bg-[#171717]"></div>
                            <p>Request new features</p>
                        </div>
                        <div className="flex items-center justify-start gap-3">
                            <div className="w-1.5 aspect-square rounded-full bg-[#171717]"></div>
                            <p>Pay once, use forever</p>
                        </div>
                    </div>
                    <button onClick={() => router.push("https://buy.stripe.com/3cs3fYfdFeSF1ZC3cd")}>Go Premium</button>
                </div>        
    )
}
