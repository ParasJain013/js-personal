'use client'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { ProductsContext } from "../contexts/ProductsContext";
import { useContext } from "react";

export default function Footer() {
  const { products, categories } = useContext(ProductsContext);

  return (
    <footer className="backdrop-blur-md dark:bg-white/10 bg-black/10 border-t border-white/20 ">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-10 ">
        {/* Logo & About */}
        <div className="flex-1 ">
          <h2 className="text-2xl font-bold">
            Jeet <span className="text-orange-400">Stone Industries</span>
          </h2>
          <p className="mt-4 text-sm leading-6">
            Leading natural stones manufacturer and supplier worldwide since 1984.
            With 40+ years of proven experience, Jeet Stone Industries has evolved
            into one of the most trusted natural stone brands.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 ">
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm mt-6">
            <li><Link className="hover:text-accent-2 dark:hover:text-orange-400" href="/">Home</Link></li>
            <li><Link className="hover:text-accent-2 dark:hover:text-orange-400" href="/about">About Us</Link></li>
            <li><Link className="hover:text-accent-2 dark:hover:text-orange-400" href="/stockyard">Stockyard</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-1">
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm mt-6">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-400" /> 9039937607, 9425120435
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-400" /> sjeetstone7@gmail.com, jeetstone.global@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-400" /> Nagar Palika Road, Near Rly Crossing, Morena (India)
            </li>
            {/* Social Media Icons */}
          <li className="flex gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff8904" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            <a href="https://www.facebook.com/share/1CKgDrDFY3/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="w-4 h-4 hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://www.instagram.com/jeet_stone_industries" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-4 h-4 hover:text-pink-500 transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/jitendra-faguna-a75347334" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4 hover:text-blue-400 transition-colors" />
            </a>
          </li>
          </ul>
        </div>
      </div>

      {/* Shop Categories */}
      <div className="backdrop-blur-md dark:bg-white/20 bg-black/20 border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6 text-sm flex flex-wrap gap-3 justify-center text-gray-200">
          {Object.values(categories).flatMap(category =>
            Object.values(category.products || {})
          ).map((product, i) => (
            <span key={i} className="hover:text-accent-1 dark:hover:text-orange-400 cursor-pointer">
              <Link href={`/products/${product.categoryId}/${product.id}`}>
                {product.productName}
              </Link>
            </span>
          ))}
        </div>
      </div>

      {/* Footer Bottom with Social Icons */}
      <div className="backdrop-blur-md dark:bg-white/30 bg-black/30 border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-200 gap-4">

          {/* Terms & Policies */}
          <div className="flex gap-4">
            <a href="#" className="dark:hover:text-orange-400">Terms & Conditions</a>
            <a href="#" className="dark:hover:text-orange-400">Privacy Policy</a>
          </div>

          {/* Copyright */}
          <p className="text-center md:text-right">
            @2025 all rights reserved by <span className="text-orange-400">jeetstoneindustries.in</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
