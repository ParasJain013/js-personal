import React from 'react';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';

export default async function Page({ params }) {
    const { categoryId, productId } = params;

    // Fetch product data server-side for SSR
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    try {
        const [categoriesRes, productsRes] = await Promise.all([
            fetch(`${backend}/api/app/categories`, { cache: 'no-store' }),
            fetch(`${backend}/api/app/products`, { cache: 'no-store' }),
        ]);

        if (!categoriesRes.ok || !productsRes.ok) throw new Error('Failed to fetch');

        const [categoriesData, productsData] = await Promise.all([
            categoriesRes.json(),
            productsRes.json(),
        ]);

        const category = categoriesData.find(cat => cat.id === categoryId);
        if (!category) return notFound();

        const product = productsData.find(p => p.id === productId);
        if (!product || product.categoryId !== categoryId) return notFound();

        // Render server-side structure and pass data to client component for interactivity
        return <ProductDetailClient product={product} />;
    } catch (err) {
        console.error('Product fetch failed:', err);
        return notFound();
    }
}
