'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Package, Truck, Award } from 'lucide-react';
import ContactUs from '@/components/ContactUs';

export default function ProductDetailClient({ product }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isContactOpen, setIsContactOpen] = useState(false);

    const productImages = product.productImages || [];
    const specifications = product.specifications
        ? Object.entries(product.specifications).map(([label, value]) => ({ label, value }))
        : [];
    const applications = product.applications || [];
    const availableSizes = product.availableSizes || [];

    const handleMouseMove = (e) => {
        if (!isZoomed) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    const nextImage = () => setSelectedImage((prev) => (prev + 1) % productImages.length);
    const prevImage = () => setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);

    return (
        <div className="min-h-screen mt-6">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Image Gallery */}
                    <div className="md:sticky md:top-20 space-y-4 top-0 max-h-[80vh] overflow-y-auto">
                        <div className="relative rounded-xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20">
                            <div
                                className="relative group cursor-zoom-in"
                                onMouseEnter={() => setIsZoomed(true)}
                                onMouseLeave={() => setIsZoomed(false)}
                                onMouseMove={handleMouseMove}
                            >
                                <img
                                    src={productImages[selectedImage]}
                                    alt={`${product.title} ${selectedImage + 1}`}
                                    className={`w-full h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] object-cover transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                                    style={isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : {}}
                                />
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/30 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 hover:bg-white/40"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/30 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 hover:bg-white/40"
                                >
                                    <ChevronRight size={20} />
                                </button>
                                <div className="absolute top-4 right-4 backdrop-blur-md bg-white/30 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ZoomIn size={16} />
                                </div>
                                <div className="absolute bottom-4 left-4 backdrop-blur-md bg-black/30 px-3 py-1 rounded-full text-sm text-white">
                                    {selectedImage + 1} / {productImages.length}
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex space-x-3 overflow-x-auto pb-2 max-h-[100px]">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-shrink-0 relative ${selectedImage === index ? 'ring-2 ring-white/50' : 'hover:ring-2 hover:ring-white/30'} rounded-lg overflow-hidden transition-all backdrop-blur-md bg-white/10 border border-white/20`}
                                >
                                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-16 h-16 sm:w-20 sm:h-20 object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">{product.productName}</h2>
                            <p className="text-base sm:text-lg mb-6">{product.brief}</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="backdrop-blur-md bg-black/10 dark:bg-white/10 px-8 py-3 rounded-lg font-medium hover:bg-white/30 transition-all flex-1 sm:flex-none" onClick={() => setIsContactOpen(true)}>
                                    Request Quote
                                </button>
                            </div>
                        </div>

                        {/* Specifications */}
                        {specifications.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                                <div className="space-y-3">
                                    {specifications.map((spec, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-black/20 dark:border-white/20 last:border-b-0">
                                            <span className="font-medium">{spec.label}</span>
                                            <span className="font-medium text-right">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Available Sizes */}
                        {availableSizes.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Available Sizes</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {availableSizes.map((item, index) => (
                                        <div key={index} className="p-4 border border-black/20 dark:border-white/20 rounded-lg">
                                            <div className="font-semibold">{item}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Applications Section */}
                {applications.length > 0 && (
                    <div className="mt-12 sm:mt-16">
                        <h3 className="text-2xl font-bold mb-8 text-center">Perfect Applications</h3>
                        <div className="flex flex-wrap justify-around gap-4 sm:gap-6">
                            {applications.map((app, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center group w-32 sm:w-40"
                                >
                                    <div className="backdrop-blur-md bg-black/5 dark:bg-white/10 rounded-lg p-6 mb-3 group-hover:bg-black/10 dark:group-hover:bg-white/20 transition-all">
                                        <Package className="mx-auto" size={32} />
                                    </div>
                                    <span className="text-sm  md:text-base font-medium">{app}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* Features Section */}
                <div className="mt-12 sm:mt-16">
                    <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md bg-black/5 dark:bg-white/20">
                                <Truck size={32} />
                            </div>
                            <h4 className="text-lg font-semibold mb-2">Fast Delivery</h4>
                            <p className="text-sm ">Quick and secure delivery to your location with professional handling</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md bg-black/5 dark:bg-white/20">
                                <Award size={32} />
                            </div>
                            <h4 className="text-lg font-semibold mb-2">Premium Quality</h4>
                            <p className="text-sm">Highest grade granite sourced from the finest quarries worldwide</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md bg-black/5 dark:bg-white/20 ">
                                <Package size={32} />
                            </div>
                            <h4 className="text-lg font-semibold mb-2">Expert Installation</h4>
                            <p className="text-sm">Professional installation services by certified stone specialists</p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-12 sm:mt-16 backdrop-blur-md bg-black/10 dark:bg-white/5 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Space?</h3>
                    <p className="text-base mb-6 max-w-2xl mx-auto">
                        Contact our stone experts today to discuss your project requirements and get a personalized quote for {product.title}.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="backdrop-blur-md bg-white/10 px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition-all" onClick={() => setIsContactOpen(true)}>
                            Schedule Consultation
                        </button>
                    </div>
                </div>

            </div>

            <ContactUs
                asModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </div>
    );
}
