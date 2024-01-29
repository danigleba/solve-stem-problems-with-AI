import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import PricingModal from "./PricingModal"
import { PiCrownSimpleFill } from "react-icons/pi"
import { FaPlus } from "react-icons/fa6"

export default function Header({ user, userData }) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <header>
        <div className="flex items-center gap-6">
          <Link href="/platform">
            <p className="text-[#171717] font-semibold text-lg">Mileto</p>
          </Link>
          <button onClick={() => router.push("/platform")} className="new-problem-btn my-0 py-2">New problem <FaPlus /></button>
        </div>
        <div className="flex items-center gap-6 font-medium">
          <div onClick={() => setIsModalOpen(true)} className="flex items-center gap-6 cursor-pointer">
            <PiCrownSimpleFill size={23} className="text-yellow-400 cursor-pointer"/>
            <div className="bg-[#f4f4f4] border border-[#dddddd] px-4 py-1 rounded-md text-sm">{userData?.credit} solutions left</div>
          </div>
          <p>{user?.displayName}</p>
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
      {/*Pricing modal*/}
      <div className={`${isModalOpen == true ? "" : "hidden"} w-screen h-screen flex items-center justify-center absolute`}>
        <div onClick={() => setIsModalOpen(false)} className="z-10 flex items-center justify-center bg-[#171717] w-full h-full opacity-30 fixed"></div>
        <div className="z-20 flex items-center justify-center text-[#171717] w-max h-max absolute ml-64 mt-20">
          <PricingModal />
        </div>
      </div>
    </>
  )
}