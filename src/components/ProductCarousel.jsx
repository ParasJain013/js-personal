'use client'
import React, { useCallback, useEffect, useRef, useState, useContext, useMemo } from "react";
import ProductCard from "./ProductCard";
import { ProductsContext } from "../contexts/ProductsContext";

const ProductCarousel = () => {
  const [translateX, setTranslateX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, translate: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const lastTimeRef = useRef(0);
  const translateXRef = useRef(0);
  const elementRef = useRef(null);
  const { products } = useContext(ProductsContext);

  const [actualCardWidth, setActualCardWidth] = useState(300);

  // Update card width on container resize
  useEffect(() => {
    const updateCardWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth / 3;
        setActualCardWidth(newWidth);
      }
    };

    updateCardWidth();

    const resizeObserver = new ResizeObserver(updateCardWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const topProducts = useMemo(() => {
    return products.filter(product => product.topProduct === true);
  }, [products]);

  // Set loading state based on products
  useEffect(() => {
    if (topProducts.length > 0) {
      setIsLoading(false);
    }
  }, [topProducts]);

  // Single set width for seamless looping
  const singleSetWidth = useMemo(() => {
    return topProducts.length * actualCardWidth;
  }, [topProducts.length, actualCardWidth]);

  // Prevent text selection during drag
  useEffect(() => {
    const styles = isDragging ? 'none' : '';
    document.body.style.userSelect = styles;
    document.body.style.webkitUserSelect = styles;
    document.body.style.msUserSelect = styles;
    document.body.style.mozUserSelect = styles;

    return () => {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.msUserSelect = '';
      document.body.style.mozUserSelect = '';
    };
  }, [isDragging]);

  // Normalize position to ensure seamless wrapping
  const normalizePosition = useCallback((position) => {
    if (singleSetWidth === 0) return 0;
    
    // Handle negative values
    while (position < -singleSetWidth) {
      position += singleSetWidth;
    }
    
    // Handle positive values
    while (position > 0) {
      position -= singleSetWidth;
    }
    
    return position;
  }, [singleSetWidth]);

  // Optimized animation with direct DOM manipulation
  useEffect(() => {
    if (isHovered || isDragging || !elementRef.current || singleSetWidth === 0 || isLoading) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const animate = (currentTime) => {
      if (currentTime - lastTimeRef.current >= 16.67) {
        translateXRef.current -= 2;

        // Normalize position for seamless loop
        translateXRef.current = normalizePosition(translateXRef.current);

        if (elementRef.current) {
          elementRef.current.style.transform = `translateX(${translateXRef.current}px)`;
        }

        lastTimeRef.current = currentTime;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isHovered, isDragging, singleSetWidth, normalizePosition, isLoading]);

  // Sync translateXRef with state
  useEffect(() => {
    translateXRef.current = translateX;
    if (elementRef.current) {
      elementRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [translateX]);

  // Handle mouse move
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();

    const deltaX = e.clientX - dragStart.x;
    const newTranslateX = normalizePosition(dragStart.translate + deltaX);
    setTranslateX(newTranslateX);
  }, [isDragging, dragStart, normalizePosition]);

  // Handle touch move
  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();

    const deltaX = e.touches[0].clientX - dragStart.x;
    const newTranslateX = normalizePosition(dragStart.translate + deltaX);
    setTranslateX(newTranslateX);
  }, [isDragging, dragStart, normalizePosition]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners for mouse and touch events
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  // Handle drag start
  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragStart({ x: e.clientX, translate: translateXRef.current });
    setIsDragging(true);
  };

  const handleTouchStart = (e) => {
    setDragStart({ x: e.touches[0].clientX, translate: translateXRef.current });
    setIsDragging(true);
  };

  // Memoize the product cards - use 3 sets for seamless infinite loop
  const productCards = useMemo(() => {
    return [...topProducts, ...topProducts, ...topProducts].map((product, idx) => (
      <div
        key={`${product.id}-${idx}`}
        className="select-none"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      >
        <ProductCard product={product} displayDescription={false} />
      </div>
    ));
  }, [topProducts]);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Featured Products
        </h2>
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
        </div>
      </div>
    );
  }

  if (topProducts.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Featured Products
        </h2>
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No featured products available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Featured Products
      </h2>

      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={elementRef}
          className={`flex will-change-transform transition-none ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{
            transform: `translateX(${translateX}px)`,
            width: "fit-content",
            userSelect: isDragging ? 'none' : 'auto',
            WebkitUserSelect: isDragging ? 'none' : 'auto',
            MozUserSelect: isDragging ? 'none' : 'auto',
            msUserSelect: isDragging ? 'none' : 'auto',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onDragStart={(e) => e.preventDefault()}
        >
          {productCards}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;