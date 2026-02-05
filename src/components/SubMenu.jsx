import { React, useRef, useState, useEffect } from 'react'

function SubMenu({category, setOpenSubCategory, handleProductClick}) {

    const submenuRef = useRef(null);
    const [position, setPosition] = useState("right");  // left/right
    const [vertical, setVertical] = useState("top");
    useEffect(() => {
        if (submenuRef.current) {
            const rect = submenuRef.current.getBoundingClientRect();

            if (rect.right > window.innerWidth) {
                setPosition("left");   // flip horizontally
            }
            if (rect.bottom > window.innerHeight) {
                setVertical("bottom");     // flip vertically
            }
        }
    }, []);
    return (
        <div
            className={`absolute left-full ${vertical}-0 ml-1 w-56 rounded-md shadow-lg z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}
            ref={submenuRef}
            onMouseEnter={() =>
                setOpenSubCategory(category.id)
            }
            onMouseLeave={() => setOpenSubCategory(null)}
        >
            <div className="py-2">
                {Object.values(category.products).map(
                    (product) => (
                        <button
                            key={product.id}
                            onClick={() =>
                                handleProductClick(
                                    category.id,
                                    product.id
                                )
                            }
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            {product.productName}
                        </button>
                    )
                )}
            </div>
        </div>
    )
}

export default SubMenu