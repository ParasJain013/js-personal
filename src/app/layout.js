import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ProductsProvider } from '@/contexts/ProductsContext';
import { Scroll } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// fetch SSR data here and pass to ProductsProvider
async function getInitialData() {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${backend}/api/app/products`, { cache: 'no-store' }),
      fetch(`${backend}/api/app/categories`, { cache: 'no-store' }),
    ]);

    if (!productsRes.ok || !categoriesRes.ok) throw new Error('Failed to fetch');

    const [productsData, categoriesData] = await Promise.all([
      productsRes.json(),
      categoriesRes.json(),
    ]);

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
    console.error('SSR data fetch failed:', err);
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
