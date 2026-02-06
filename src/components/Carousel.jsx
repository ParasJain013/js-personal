'use client'
import { useState, useEffect } from "react";
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import Slide from "./Slide";

export default function Carousel({ slides }) {
    const [current, setCurrent] = useState(0);

    // Auto slide every 5s
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [current]);

    const previousSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrent((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
        );
    };

    // Get current slide data
    const currentSlide = slides[current];

    return (
        <div className="overflow-hidden relative w-full h-[60vh]">
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 bg-black/40 dark:bg-black/20">
                <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">JEET STONE</h1>
                <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">Where each stone reflects superior quality, durability and aesthetic appeal</p>
            </div>

            <div className="flex transition-transform ease-out duration-500 object-cover h-[60vh] relative"
                style={{ transform: `translateX(-${current * 100}%)` }}>
                {slides.map((slide, i) => (
                    <Slide
                        key={i}
                        src={slide.src || slide} // Handle both object and string formats
                        isActive={i === current}
                        index={i}
                    />
                ))}
            </div>


            {/* Navigation Arrows */}
            <div className="bg-transparent  absolute top-0 h-full w-full justify-between text-white/40 items-center flex px-4 text-3xl z-40">
                <button onClick={previousSlide} className="hover:text-white/60">
                    <BsFillArrowLeftCircleFill />
                </button>
                <button onClick={nextSlide} className="hover:text-white/60">
                    <BsFillArrowRightCircleFill />
                </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full w-2 h-2 cursor-pointer ${i === current ? "bg-white" : "bg-gray-500"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}