export const dynamic = "force-dynamic";

import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ProductsProvider } from '@/contexts/ProductsContext';
import { Scroll } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// fetch SSR data here and pass to ProductsProvider
async function safeFetch(url, retry = true) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error("API failed");
    return await res.json();
  } catch (err) {
    console.log("Fetch failed:", url);

    if (retry) {
      console.log("Retrying after 5s (Render wakeup)...");
      await new Promise(r => setTimeout(r, 5000));
      return safeFetch(url, false);
    }

    return null; // NEVER throw
  }
}

async function getInitialData() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const productsData = await safeFetch(`${backend}/api/app/products`);
    const categoriesData = await safeFetch(`${backend}/api/app/categories`);

    if (!productsData || !categoriesData) {
      return { products: [], categories: {} };
    }

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

    return { products: productsData, categories: categoriesObj };
  } catch (err) {
    console.log("Layout fetch completely failed");
    return { products: [], categories: {} };
  }
}


export default async function RootLayout({ children }) {
  const initialData = await getInitialData(); // SSR data

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ProductsProvider initialData={initialData}>
            <ScrollToTop/>
            <Navbar/>
            {children}
            <Footer/>
          </ProductsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
