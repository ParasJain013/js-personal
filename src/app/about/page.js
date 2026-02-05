'use client'
import React from 'react'
export default function About() {
    return (
        <div className="w-full min-h-screen s">
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center"
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

            {/* About Section */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/40 p-8 shadow-lg">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Who We Are</h2>
                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                        At <span className="font-semibold">Jeet Stone</span>, we blend creativity, precision, and traditional
                        craftsmanship to create world-class Sandstone and Limestone products. We are a family-owned business,
                        we carry forward a legacy built on trust, quality, and attention to detail.
                        With years of experience and a deep passion for natural stone, we specialize in producing premium-grade
                        paving, steps/lintels, wall cappings & pier caps, kerbs & edgings, wall pannels & claddings, cobble stone,
                        and more — tailored to meet the diverse needs of modern architecture and landscaping.
                        Every stone we craft reflects our commitment to authenticity, durability, and timeless beauty, ensuring that
                        each project we deliver stands as a symbol of Natural | Elegant | Perfection.
                    </p>
                </div>
                <img
                    src={'/img3.jpeg'}
                    alt="About us"
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
            </section>

            {/* Mission & Vision Section */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/40 p-8 shadow-lg">
                    <h3 className="text-xl md:text-2xl font-semibold mb-3">Our Mission</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        To craft and deliver premium-quality natural stone products that combine
                        elegance, durability, and sustainability — enriching architectural and
                        landscaping spaces across the world. We aim to build long-lasting relationships
                        with our clients through integrity, innovation, and unmatched craftsmanship.
                    </p>
                </div>
                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/40 p-8 shadow-lg">
                    <h3 className="text-xl md:text-2xl font-semibold mb-3">Our Vision</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        To be recognized globally as a trusted name in natural stone — known for
                        our commitment to quality, ethical sourcing, and excellence in design. We
                        envision a world where every space reflects the timeless beauty and strength
                        of sandstone, handcrafted with precision.
                    </p>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                    Our Core Values
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Precision",
                            desc: "We believe in perfection through precision — ensuring every piece of stone reflects superior finish, strength, and natural beauty."
                        },
                        {
                            title: "Integrity & Trust",
                            desc: "Our business is built on honesty, transparency, and reliability — from sourcing raw material to final delivery."
                        },
                        {
                            title: "Commitment",
                            desc: "We are driven by a passion to exceed expectations — delivering quality products, maintaining consistency & trust."
                        }
                    ].map((value, idx) => (
                        <div
                            key={idx}
                            className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/40 p-6 shadow-md hover:shadow-xl transition"
                        >
                            <h4 className="text-lg md:text-xl font-semibold mb-2">{value.title}</h4>
                            <p className="text-gray-700 dark:text-gray-300">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
