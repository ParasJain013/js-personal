import React from "react";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

export default async function ProductsPage({ params }) {
    const { categoryId } = params;

    // Fetch category data server-side for SSR
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
    const categoriesRes = await fetch(`${backend}/api/app/categories`, { cache: 'no-store' });
    const categoriesData = await categoriesRes.json();
    const productsRes = await fetch(`${backend}/api/app/products`, { cache: 'no-store' });
    const productsData = await productsRes.json();

    // Find the matching category
    const categoryObj = categoriesData.find(cat => cat.id === categoryId);
    if (!categoryObj) {
        return notFound();
    }

    const categoryProducts = productsData.filter(p => p.categoryId === categoryId);

    const category = { ...categoryObj, products: categoryProducts.reduce((acc, prod) => {
        acc[prod.id] = prod;
        return acc;
    }, {}) };



    const products = Object.values(category.products || {});

    return (
        <div className="overflow-x-hidden">
            {/* Hero section */}
            <section
                className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: `url('/img1.jpeg')`,
                }}
            >

                <div className="absolute inset-0 bg-black/40 dark:bg-black/20"></div>
                <div className="relative text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                        {category.title}
                    </h1>
                </div>
            </section>

            {/* Products */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 justify-center">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="
                w-full
                sm:w-[calc(50%-0.75rem)]
                lg:w-[calc(33.333%-1rem)]
                xl:w-[calc(25%-1rem)]
                flex-shrink-0
              "
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

