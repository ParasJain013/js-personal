'use client'
import React from "react";
import Link from "next/link";
const ProductCard = ({ product, displayDescription = true }) => {
  // console.log(product);
  return (
    <div className="w-[272px] md:w-72 lg:w-80 flex-shrink-0 px-3 m-auto">
      <div className="bg-black/20 dark:bg-white/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/40 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="relative overflow-hidden">
          <img
            src={product.imgUrls[0]}
            alt={product.productName}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            draggable={false}
          />
        </div>

        <div className="p-3 md:p-5 mb-2">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
            {product.productName}
          </h3>
          {displayDescription && (
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 line-clamp-2">
              {product.description}
            </p>)}

          <Link href={`/products/${product.categoryId}/${product.id}`} className="flex items-center space-x-2">
            <button className="w-full hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-md mt-4 dark:bg-white/10 bg-black/10 hover:scale-105 cursor-pointer">
              <span>Know More</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
