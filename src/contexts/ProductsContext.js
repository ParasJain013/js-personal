'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children, initialData }) => {
    const [products, setProducts] = useState(initialData?.products || []);
    const [categories, setCategories] = useState(initialData?.categories || {});
    const [loading, setLoading] = useState(!initialData);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) return; // skip refetch if SSR data already provided

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                setLoading(true);

                const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

                // Fetch products
                const productsRes = await fetch(`${backend}/api/app/products`, { signal });
                if (!productsRes.ok) throw new Error('Failed to fetch products');
                const productsData = await productsRes.json();

                // Fetch categories
                const categoriesRes = await fetch(`${backend}/api/app/categories`, { signal });
                if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
                const categoriesData = await categoriesRes.json();

                const categoriesObj = categoriesData.reduce((acc, cat) => {
                    const catProducts = productsData
                        .filter((p) => p.categoryId === cat.id)
                        .reduce((prodAcc, prod) => {
                            prodAcc[prod.id] = prod;
                            return prodAcc;
                        }, {});
                    acc[cat.id] = { ...cat, products: catProducts };
                    return acc;
                }, {});

                setProducts(productsData);
                setCategories(categoriesObj);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error fetching data:', err);
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [initialData]);

    return (
        <ProductsContext.Provider value={{ products, categories, loading, error }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
