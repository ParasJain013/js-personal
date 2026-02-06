'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";


const images = ["/all/cnt-packaging-1.jpeg","/all/cnt-packaging-2.jpeg","/all/cnt-packaging-3.jpeg","/all/manufacturing-1.png","/all/manufacturing-2.jpeg","/all/manufacturing-3.png","/all/manufacturing-4.jpeg","/all/mines-1.jpeg","/all/mines-2.jpeg","/all/mines-3.jpeg","/all/mines-4.jpeg","/all/packaging-1.png","/all/packaging-2.jpeg","/all/packaging-3.jpeg","/all/packaging-4.jpeg","/all/packaging-5.jpeg","/all/packaging-6.jpeg","/all/packaging-7.jpeg","/all/packaging-8.jpeg","/all/stockyard-1.jpeg","/all/stockyard-2.jpeg","/all/stockyard-3.jpeg","/all/stockyard-4.jpeg","/all/stockyard-5.jpeg","/all/stockyard-6.jpeg","/all/stockyard-7.jpeg"];

export default function Stockyard() {
    const [selectedImage, setSelectedImage] = useState(null);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setSelectedImage(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section
                className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url('/img2.jpeg')` }}
            >
                <div className="absolute inset-0 bg-black/40 dark:bg-black/20"></div>
                <div className="relative text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                        From sourcing to finishing
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Jeet Stone ensures every stone product reflects superior quality, durability, and aesthetic appeal.
                    </p>
                </div>
            </section>

            {/* Gallery Section */}
            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-6 text-center">Stockyard Gallery</h1>

                <div className="flex flex-wrap justify-center gap-4">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                        >
                            <Image
                                src={img}
                                alt={`Stockyard ${index + 1}`}
                                width={400}
                                height={400}
                                className="w-full h-64 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md"
                                onClick={() => setSelectedImage(img)}
                            />
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 p-2 rounded-full 
                  bg-gray-200/50 dark:bg-gray-800/50 
                  hover:bg-gray-300/70 dark:hover:bg-gray-700/70
                  transition-colors duration-200 group"
                                aria-label="Close image modal"
                            >
                                <X
                                    size={20}
                                    className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                                />
                            </button>

                            <Image
                                src={selectedImage}
                                alt="Enlarged"
                                width={600}
                                height={600}
                                className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
