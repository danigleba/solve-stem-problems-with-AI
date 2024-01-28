import Link from "next/link"

export default function SideMenu({ userData, solutionId }) {
    return (
        <div className="sideMenu">
            <h2 className="text-lg font-semibold mb-6">Solved problems</h2>
            {userData?.solutions == [] && (
                <p className="font-light">You haven't solved any problems yet.</p>
            )}
            {userData?.solutions?.length > 0 && (
                <div>
                    {userData?.solutions?.map((item, index) => (
                        <div key={index}>
                            <Link href={`/solutions/${item?.id}`}>
                                <div className={`mb-3 px-4 py-2 border border-[#dddddd] rounded-md ${solutionId == item?.id ? "bg-[#171717] text-white cursor-default" : " bg-[#f4f4f4] hover:bg-[#dddddd] cursor-pointer duration-200 ease-in-out"}`}> 
                                    <p className="truncate text-bold">{item.solution}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
             )}
        </div>
    )
}

