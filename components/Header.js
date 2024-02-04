import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PiCrownSimpleFill } from "react-icons/pi"
import { FaPlus } from "react-icons/fa6"
import { RxHamburgerMenu } from "react-icons/rx"
import { IoClose } from "react-icons/io5"
import { loadStripe } from "@stripe/stripe-js"


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST)

export default function Header({ user, userData }) {
  const router = useRouter()
  const { solutionId } = router.query
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)



/*const createPaymentIntent = async () => {
    const stripe = await stripePromise
    const url = "/api/stripe/createPaymentIntent"
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            }
        })
    const data = await response.json()
    setClientSecret(data.clientSecret)
    setState("Pay")
}*/
  return (
    <>
      <header>
        <div className="flex items-center gap-6">
          <div onClick={() => setIsHamburgerOpen(!isHamburgerOpen)} className="md:hidden text-[#171717]">
            <RxHamburgerMenu size={25} strokeWidth={0.5}/>
          </div>
          <Link href="/platform" className="hidden md:block">
            <p className="text-[#171717] font-semibold text-lg">Mileto</p>
          </Link>
          <button onClick={() => router.push("/platform")} className="new-problem-btn my-0 py-2 hidden md:flex">New problem <FaPlus /></button>
          <button onClick={() => router.push("/platform")} className="new-problem-btn my-0 py-2 md:hidden">New <FaPlus /></button>
        </div>
        <div className="flex items-center gap-6 font-medium">
          {userData?.premium == false && (
            <div onClick={() => router.push("/go-premium")} className="flex items-center gap-6 cursor-pointer">
              <PiCrownSimpleFill size={23} className="text-yellow-400 cursor-pointer"/>
              <div className="bg-[#f4f4f4] border border-[#dddddd] px-4 py-1 rounded-md text-sm hidden md:block">{userData?.credit} solutions left</div>
            </div>
          )}
          <p className="hidden md:block">{user?.displayName}</p>
          <div className="w-10 aspect-square bg-[#dddddd] rounded-full overflow-hidden">
            <Image
              src={user?.photoURL}
              alt="Profile picture"
              className="w-full h-full"
              width={750}
              height={750}/>                            
          </div>
        </div>
      </header>
      {/*Hamburger menu*/}
      <div className={`${isHamburgerOpen ? "" : "hidden"} fixed h-screen w-screen z-50`}>
        <div className="h-full w-2/3 border-r border-[#dddddd] bg-[#fafafa] pt-5 pl-7 space-y-6">
          <div onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
            <IoClose size={28} strokeWidth={0.5}/>
          </div>
          {/*Side menu in mobile*/}
          <div className=" mr-7">
                    <h2 className="text-base font-bold mb-6">Solved problems</h2>
                    {userData?.solutions.length <= 0 && (
                        <p className="font-light">You haven't solved any problems yet.</p>
                    )}
                    {userData?.solutions?.length > 0 && (
                        <div>
                            {userData?.solutions?.map((item, index) => (
                                <div key={index}>
                                    <Link href={`/solutions/${item?.id}`}>
                                        <div className={`mb-3 px-4 py-2 border border-[#dddddd] rounded-md ${solutionId == item?.id ? "bg-[#2e2e2e] text-white cursor-default" : " bg-[#f4f4f4] hover:bg-[#dddddd] cursor-pointer duration-200 ease-in-out"}`}> 
                                            <p className="truncate text-bold text-sm">{item.solution}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    <button onClick={() => router.push("/platform")} className="new-problem-btn">New problem <FaPlus /></button>
                </div>
        </div>
      </div>
    </>
  )
}