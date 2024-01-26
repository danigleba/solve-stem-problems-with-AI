import Link from "next/link"

export default function SideMenu({}) {
    return (
        <div className="sideMenu">
            <h2 className="text-lg font-semibold mb-4">Solved problems</h2>
            <p className="font-light">You haven't solved any problems yet.</p>
            <div>
                {}
            </div>
        </div>
    )
}

