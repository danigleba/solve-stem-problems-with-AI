import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // Do something with the selected file, such as uploading it to a server or displaying it in the UI
  }

  const openCamera = () => {
    // Trigger the file input click event to open the camera
    fileInputRef.current.click()
  }
  return (
    <main className={`${inter.className} bg-[#fafafa] flex items-center justify-center h-screen px-8`}>
    <div className="flex flex-col items-start justify-start w-full md:w-2/6 text-left">
      <h2 className="font-semibold text-2xl text-[#171717] pb-3">Mileto</h2>
      <div className="space-y-2 font-semibold text-[#737373]">
        <h2 className="text-2xl md:text-2xl">📸 Snap your math problem. <br/> 🧠 Get a detailed solution.</h2>
      </div>
      <div className="pt-6 w-full">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button className="bg-[#2e2e2e] hover:bg-[#242424] text-[#f4f4f4] font-medium text-lg rounded-xl w-full py-4 transition duration-200 ease-in-out" onClick={openCamera}>
          Take a picture
        </button>
      </div>
    </div>
  </main>
  

  
  )
}
