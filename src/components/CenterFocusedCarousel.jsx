'use client'
import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductsContext } from "../contexts/ProductsContext";
import { useRouter } from 'next/navigation'

const useTheme = () => ({ theme: 'dark' });

const GlassCard = ({ slide, onClick, style }) => {
    const { theme } = useTheme();
    const firstProductTitle = slide.products ? Object.values(slide.products)[0]?.title : null;

    return (
        <div
            className="absolute cursor-pointer group rounded-xl transition-all duration-300 hover:shadow-xl"
            style={style}
            onClick={onClick}
        >
            <div className="relative w-full h-full overflow-hidden rounded-xl backdrop-blur-md shadow-xl border border-white/10 dark:bg-white/10 bg-black/20">

                {/* Image section */}
                <div
                    className="relative h-2/3 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent), url(${slide.imgUrls?.[0]})`,
                    }}
                >
                    <span className="sr-only">{slide.title}</span>
                </div>

                {/* Text section */}
                <div className="h-1/3 p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-2 overflow-hidden">
                    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold drop-shadow-lg">
                        {slide.title}
                    </h3>

                    {firstProductTitle && (
                        <p className="text-xs sm:text-xs md:text-base text-gray-300 line-clamp-2">
                            Example product: {firstProductTitle}
                        </p>
                    )}

                    <div className="h-0.5 bg-gradient-to-r from-white/40 via-white/60 to-transparent rounded-full" />

                    <p className="text-xs sm:text-xs md:text-sm leading-tight sm:leading-relaxed"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: style?.WebkitLineClamp || 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}>
                        {slide.brief || "Stone description text here"}
                    </p>
                </div>
            </div>
        </div>
    );
};


const CenterFocusedCarousel = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(1024);
    const { theme } = useTheme();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const intervalRef = useRef(null);
    const { categories: categoriesObj } = useContext(ProductsContext);
    const router = useRouter()

    const categories = Object.values(categoriesObj || {});

    // Add loading state check
    const isLoading = !categoriesObj || categories.length === 0;

    const startAutoPlay = useCallback(() => {
        // Don't start autoplay if no categories
        if (categories.length === 0) return;

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % categories.length);
        }, 4000);
    }, [categories.length]);

    const stopAutoPlay = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    // Only start autoplay when categories are loaded
    useEffect(() => {
        if (categories.length > 0) {
            startAutoPlay();
        }
        return () => stopAutoPlay();
    }, [startAutoPlay, categories.length]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = useCallback(() => {
        if (isTransitioning || categories.length === 0) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % categories.length);
        stopAutoPlay();
        startAutoPlay();
        setTimeout(() => setIsTransitioning(false), 600);
    }, [categories.length, isTransitioning, startAutoPlay]);

    const prevSlide = useCallback(() => {
        if (isTransitioning || categories.length === 0) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
        stopAutoPlay();
        startAutoPlay();
        setTimeout(() => setIsTransitioning(false), 600);
    }, [categories.length, isTransitioning, startAutoPlay]);

    const goToSlide = useCallback(
        (index) => {
            if (isTransitioning) return;
            setIsTransitioning(true);
            setCurrentIndex(index);
            stopAutoPlay();
            startAutoPlay();
            setTimeout(() => setIsTransitioning(false), 600);
        },
        [isTransitioning, startAutoPlay]
    );

    const getSlidePosition = useCallback(
        (slideIndex) => {
            const totalSlides = categories.length;
            let diff = slideIndex - currentIndex;
            if (diff > totalSlides / 2) diff -= totalSlides;
            else if (diff < -totalSlides / 2) diff += totalSlides;
            return diff;
        },
        [currentIndex, categories.length]
    );

    const getSlideStyle = useCallback(
        (slideIndex) => {
            const position = getSlidePosition(slideIndex);
            const absPosition = Math.abs(position);
            let scale = 0.2;
            let opacity = 0;
            let zIndex = 1;
            let translateX = position * 120;
            let cardWidth, cardHeight, lineClamp;

            // --- Responsive size and lineClamp logic ---
            if (windowWidth >= 1280) {
                cardWidth = 320;
                cardHeight = 400;
                lineClamp = 4;
                translateX = position * 140;
            } else if (windowWidth >= 1024) {
                cardWidth = 280;
                cardHeight = 400;
                lineClamp = 3;
                translateX = position * 120;
            } else if (windowWidth >= 768) {
                cardWidth = 240;
                cardHeight = 340;
                lineClamp = 3;
                translateX = position * 100;
            } else if (windowWidth >= 640) {
                cardWidth = 200;
                cardHeight = 280;
                lineClamp = 2;
                translateX = position * 80;
            } else {
                cardWidth = 180;
                cardHeight = 240;
                lineClamp = 2;
                translateX = position * 60;
            }

            // --- Scaling and positioning (same as before) ---
            if (absPosition === 0) {
                scale = 1;
                opacity = 1;
                zIndex = 15;
                translateX = 0;
            } else if (absPosition === 1) {
                scale = windowWidth >= 1024 ? 0.85 : windowWidth >= 768 ? 0.8 : 0.75;
                opacity = 1;
                zIndex = 14;
                translateX = position * (windowWidth >= 1024 ? 140 : windowWidth >= 768 ? 120 : 80);
            } else if (absPosition === 2) {
                scale = windowWidth >= 1024 ? 0.7 : windowWidth >= 768 ? 0.65 : 0.6;
                opacity = 1;
                zIndex = 13;
                translateX = position * (windowWidth >= 1024 ? 160 : windowWidth >= 768 ? 140 : 100);
            } else if (absPosition === 3) {
                scale = windowWidth >= 768 ? 0.5 : 0;
                opacity = windowWidth >= 768 ? 0.7 : 0;
                zIndex = 12;
                translateX = position * (windowWidth >= 1024 ? 160 : 160);
            } else if (absPosition === 4) {
                scale = windowWidth >= 1024 ? 0.4 : 0;
                opacity = windowWidth >= 1024 ? 0.6 : 0;
                zIndex = 11;
                translateX = position * 240;
            } else {
                scale = 0;
                opacity = 0;
                zIndex = 10;
                translateX = position * (windowWidth >= 1024 ? 280 : 200);
            }

            return {
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity,
                zIndex,
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                WebkitLineClamp: lineClamp,
            };
        },
        [getSlidePosition, windowWidth]
    );



    const getContainerHeight = () => {
        if (windowWidth >= 1280) return '480px';
        if (windowWidth >= 1024) return '430px';
        if (windowWidth >= 768) return '390px';
        if (windowWidth >= 640) return '350px';
        return '280px';
    };

    const handleCategoryClick = (categoryId, category, hasSubCategory = false) => {
        if (hasSubCategory) {
            router.push(`/products/${categoryId}`);
        } else {
            const productId = Object.keys(category.products)[0];
            router.push(`/products/${categoryId}/${productId}`);
        }
    };


    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative">
                {isLoading ? (
                    <div
                        className="relative flex items-center justify-center overflow-hidden"
                        style={{ height: getContainerHeight() }}
                    >
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            <p className="text-white/60 text-base">Loading categories...</p>
                        </div>
                    </div>
                ) : (
                    <>

                        <div
                            className="relative flex items-center justify-center overflow-hidden"
                            style={{ height: getContainerHeight() }}
                        >
                            {categories.map((slide, index) => (
                                <GlassCard
                                    key={`${slide.id}-${index}`}
                                    slide={slide}
                                    style={getSlideStyle(index)}
                                    onClick={() => handleCategoryClick(slide.id, slide, slide.hasSubCategory)}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col items-center space-y-4 sm:space-y-6 bg-transparent">
                            <div className="flex justify-center space-x-3 sm:space-x-4">
                                <button
                                    onClick={prevSlide}
                                    className="dark:bg-white/10 dark:hover:bg-white/20 bg-black/10 hover:bg-black/20 backdrop-blur-lg border border-white/20 rounded-full p-1 sm:p-2 lg:p-2.5 transition-all duration-200 hover:scale-105 active:scale-95"
                                    aria-label="Previous slide"
                                >
                                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="dark:bg-white/10 dark:hover:bg-white/20 bg-black/10 hover:bg-black/20 backdrop-blur-lg border border-white/20 rounded-full p-1 sm:p-2 lg:p-2.5 transition-all duration-200 hover:scale-105 active:scale-95"
                                    aria-label="Next slide"
                                >
                                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                                </button>
                            </div>

                            <div className="flex justify-center space-x-1.5 sm:space-x-2 flex-wrap">
                                {categories.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'dark:bg-white bg-black/80 shadow-lg scale-125'
                                            : 'dark:bg-white/40 dark:hover:bg-white/60 bg-black/40 hover:bg-black/60 backdrop-blur-sm'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CenterFocusedCarousel;