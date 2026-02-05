'use client'
import { useState, useEffect, useContext, useRef } from "react";
import { Menu, X, Sun, Moon, Globe, ChevronDown, ChevronRight } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import Link from "next/link";
import { useRouter } from 'next/navigation'

import ContactUs from "../components/ContactUs";
import { ProductsContext } from "../contexts/ProductsContext";
import SubMenu from "./SubMenu";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [isMobileProductsDropdownOpen, setIsMobileProductsDropdownOpen] = useState(false);
  const [openMobileSubCategory, setOpenMobileSubCategory] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const { categories } = useContext(ProductsContext);
  const router = useRouter();

  const data = categories ? Object.values(categories) : [];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".products-dropdown")) {
        setIsProductsDropdownOpen(false);
        setOpenSubCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (categoryId, hasSubCategory = false) => {
    if (hasSubCategory) {
      router.push(`/products/${categoryId}`);
    } else {
      let category = data.filter((item) => item.id == categoryId)
      const productId = Object.keys(category[0].products)
      router.push(`/products/${categoryId}/${productId}`);
    }
    setIsProductsDropdownOpen(false);
    setOpenSubCategory(null);
    setIsOpen(false);
  };

  const handleProductClick = (categoryId, productId) => {
    router.push(`/products/${categoryId}/${productId}`);
    setIsProductsDropdownOpen(false);
    setOpenSubCategory(null);
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full h-12 transition-all duration-300 font-bold 
    ${isScrolled
            ? "bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 shadow-lg"
            : "bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border-b border-white/10 dark:border-gray-700/10"
          }`}
      >

        <div className="container flex items-center justify-between h-full py-2 pr-2 mx-auto">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center h-full"
          >
            <img
              src="/logo.jpeg"
              alt="Jeet Stone"
              className="h-12  w-auto"
            />
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center justify-center flex-1 h-full text-base mr-4">
            <ul
              className={`flex items-center transition-colors duration-300 ${isScrolled
                ? "text-gray-600 dark:text-gray-300"
                : "text-gray/600 dark:text-white/90 drop-shadow-md"
                }`}
            >
              <li>
                <Link
                  href="/"
                  className="h-full mx-4 border-b-2 border-transparent hover:border-accent-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className=" mx-4 border-b-2 border-transparent hover:border-accent-1"
                >
                  About
                </Link>
              </li>

              {/* Products Dropdown */}
              <li className="relative products-dropdown md:max-h-[24px]">
                <button
                  onClick={() => {
                    setIsProductsDropdownOpen(!isProductsDropdownOpen);
                    setOpenSubCategory(null);
                  }}
                  className="flex items-center ml-4 mr-3 border-b-2 border-transparent hover:border-accent-1"
                >
                  Products
                  <ChevronDown
                    className={`ml-1 h-3 w-3 transition-transform ${isProductsDropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isProductsDropdownOpen && (
                  <div
                    className="absolute left-0 top-full mt-2 w-64 rounded-xl z-50
             bg-white/70 dark:bg-gray-900/70
             backdrop-blur-md
             border border-white/20 dark:border-gray-700/40
             shadow-xl"
                  >


                    <div className="py-2">
                      {data.map((category) => (
                        <div
                          key={category.id}
                          className="relative group"
                          onMouseEnter={() => setOpenSubCategory(category.id)}
                          onMouseLeave={() => setOpenSubCategory(null)}
                        >
                          <button
                            onClick={() => handleCategoryClick(category.id, category.hasSubCategory)}
                            className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {category.title}
                            {category.hasSubCategory && (
                              <ChevronRight className="h-3 w-3" />
                            )}
                          </button>

                          {/* Submenu */}
                          {openSubCategory === category.id &&
                            category.hasSubCategory &&
                            category.products && (
                              <SubMenu category={category} setOpenSubCategory={setOpenSubCategory} handleProductClick={handleProductClick} />
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>

                <li>
                <Link
                  href="/stockyard"
                  className=" mx-4 border-b-2 border-transparent hover:border-accent-1"
                >
                  Stockyard
                </Link>
              </li>
              <li className="md:max-h-[24px]">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className=" mx-4 border-b-2 border-transparent hover:border-accent-1"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="relative inline-flex items-center justify-center w-14 h-8 rounded-full"
            >
              {theme === "dark" ? (
                <Moon size={24} className="text-purple-500" />
              ) : (
                <Sun size={24} className="text-yellow-500" />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-white/70 dark:bg-black/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 shadow-lg">
            <ul className="px-6 py-4 space-y-3">
              <li>
                <Link href="/" onClick={() => setIsOpen(!isOpen)}>
                  Home
                </Link>
              </li>
              <li>
                <button onClick={() => setIsOpen(!isOpen)}>

                  <Link href="/about">
                    About
                  </Link>
                </button>
              </li>

              {/* Mobile Products */}
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIsMobileProductsDropdownOpen(!isMobileProductsDropdownOpen)
                  }
                  }
                  className="flex justify-between w-full"
                >
                  Products
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isMobileProductsDropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {isMobileProductsDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {data.map((category) => (
                      <div key={category.id}>
                        {category.hasSubCategory ? (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleCategoryClick(category.id, category.hasSubCategory);
                                setIsMobileProductsDropdownOpen(false)
                              }}
                              className="flex justify-between w-full py-1"
                            >
                              {category.title}
                              <ChevronDown
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  setOpenMobileSubCategory(
                                    openMobileSubCategory === category.id
                                      ? null
                                      : category.id
                                  )
                                }}
                                className={`h-3 w-3 transition-transform ${openMobileSubCategory === category.id
                                  ? "rotate-180"
                                  : ""
                                  }`}
                              />
                            </button>
                            {openMobileSubCategory === category.id && (
                              <div className="ml-4 mt-1 space-y-1">
                                {Object.values(category.products).map(
                                  (product) => (
                                    <button
                                      key={product.id}
                                      onClick={() => {
                                        handleProductClick(
                                          category.id,
                                          product.id
                                        )
                                        setIsMobileProductsDropdownOpen(false)
                                        setOpenMobileSubCategory(null)
                                      }
                                      }
                                      className="block w-full text-left text-sm py-1"
                                    >
                                      {product.productName}
                                    </button>
                                  )
                                )}
                              </div>
                            )}
                          </>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              handleCategoryClick(category.id, category.hasSubCategory)
                              setIsMobileProductsDropdownOpen(false)
                            }}
                            className="block w-full text-left py-1"
                          >
                            {category.title}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>

              <li>
                <button onClick={() => setIsOpen(!isOpen)}>

                  <Link href="/stockyard">
                    Stockyard
                  </Link>
                </button>
              </li>

              <li>
                <button onClick={() => {
                  setIsContactOpen(true)
                  setIsMobileProductsDropdownOpen(false)
                }}>
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Contact Modal */}
      <ContactUs
        asModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
