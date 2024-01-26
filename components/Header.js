import Link from "next/link"
import Image from "next/image"
import { PiCrownSimpleFill } from "react-icons/pi"

export default function Header({ user }) {
  return (
    <header>
      <div className="flex items-center gap-3">
        <Link href="/">
          <p className="text-[#171717] font-semibold text-lg">Mileto</p>
        </Link>
        <p>🇬🇧 🇪🇸</p>
      </div>
      <div className="flex items-center gap-6 font-medium">
        <PiCrownSimpleFill size={23} className="text-yellow-400 cursor-pointer" />
        <div className="bg-[#f4f4f4] border border-[#dddddd] px-4 py-1 rounded-md text-sm">5 solutions left</div>
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
  )
}