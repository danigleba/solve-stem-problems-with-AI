export default function BulletPoint({ text }) {
    return (  
        <div className="flex items-center justify-start gap-3">
            <div className="w-1.5 aspect-square rounded-full bg-[#171717]"></div>
            <p>{text}</p>
        </div>   
    )
}