import { useRouter } from "next/router"
import BulletPoint from "./BulletPoints"
import { PiCrownSimpleFill } from "react-icons/pi"

export default function PricingModal() {
    const router = useRouter()
    return (
        <div className="w-full md:w-96 h-max bg-white border border-[#dddddd] text-center rounded-2xl p-4 md:p-6">
            <h2 className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r inline-block text-transparent bg-clip-text text-2xl md:text-3xl flex items-center justify-center gap-2">Go Premium <PiCrownSimpleFill className="text-yellow-400"/></h2>
            <p className="text-md md:text-lg font-medium">To solve unlimited problems</p>
            <p className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r inline-block text-transparent bg-clip-text font-black text-4xl pt-6">4,97 <a className="text-xl">€</a></p>
            <div className="pt-6 pb-12 space-y-2 mx-12 font-medium text-sm md:text-base">
                <BulletPoint text="Solve unlimited problems" />
                <BulletPoint text="Request new features" />
                <BulletPoint text="Pay once, use forever" />
            </div>
            <button onClick={() => router.push("https://buy.stripe.com/dR67sNbyWg8Egw09AA")}>Go Premium</button>
        </div>        
    )
}
