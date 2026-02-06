import Carousel from '@/components/Carousel'
import CenterFocusedCarousel from '@/components/CenterFocusedCarousel'
import ProductCarousel from '@/components/ProductCarousel'
import ContactUs from '@/components/ContactUs'

export default function HomePage() {
    return (
        <>
            <div className="w-full h-[60vh]">
                <Carousel slides={[
                    "/img1.jpeg",
                    "/img2.jpeg",
                    "/img3.jpeg",
                    "/img4.jpeg"
                ]} />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mt-4 ">
                Subcategories
            </h1>
            <CenterFocusedCarousel />
            <ProductCarousel />

            {/* Contact Us Section with Custom Layout */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Side - Text Content */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  mb-6">
                                    Have any doubt or need consultation?
                                </h2>
                                <p className="text-lg md:text-xl mb-8">
                                    We&apos;re here to help you with any questions or concerns you may have.
                                    Our team of experts is ready to provide personalized consultation
                                    and support for your needs.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span className="">Expert consultation available</span>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <span className="">Quick response within 24 hours</span>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <span className="">Personalized solutions</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Us Component */}
                        <div className="">
                            <ContactUs />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}