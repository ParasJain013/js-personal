'use client'
import Image from "next/image";
export default function Slide({ src, isActive, index }) {
    return (
        <div className="w-full flex-shrink-0 relative">
            <Image
                src={src}
                alt=""
                fill
                style={{ objectFit: "cover" }}
            />
            {/* <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-lg">
                    This i my text
                </h2>
                {subtitle && (
                    <p className="text-lg sm:text-xl max-w-2xl drop-shadow-md">
                        Some other text
                    </p>
                )}
                <button className="mt-6 px-6 py-3 bg-white/20 hover:bg-white/40 text-white rounded-lg backdrop-blur-md transition">
                    Explore Now
                </button>
            </div> */}
        </div>

        // </div >
        
    );
}
