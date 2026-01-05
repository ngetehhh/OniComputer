import React, { useState } from 'react';
import { useCart } from '../../context/CartContext'; // <--- 1. Import the hook

export const Products = ({ isLoggedIn, onLoginClick }) => { 
  // 2. Get showNotification from context
  const { addToCart, showNotification } = useCart(); 
  const [activeTab, setActiveTab] = useState('All');  

  const filters = ["All", "CPU", "Motherboard", "Graphic Card", "PC Case", "Memory / RAM", "Power Supply"];

  const allProducts = [
    {
      id: 1,
      name: "Intel Core i9-14900K",
      price: 9500000,
      tag: "CPU",
      image: "src/assets/processor.png" 
    },
    {
      id: 2,
      name: "Nvidia GeForce RTX 4090",
      price: 28000000,
      tag: "Graphic Card",
      image: "src/assets/vga.png" 
    },
    {
      id: 3,
      name: "ASUS ROG Maximus Z790",
      price: 8500000,
      tag: "Motherboard",
      image: "src/assets/motherboard.png" 
    },
    {
      id: 4,
      name: "NZXT H9 Flow White",
      price: 2600000,
      tag: "PC Case",
      image: "src/assets/casing.png" 
    },
    {
      id: 5,
      name: "Corsair Vengeance RGB 32GB DDR5",
      price: 2100000,
      tag: "Memory / RAM",
      image: "src/assets/corsairVengeance.jpg"
    },
    {
      id: 6,
      name: "Corsair RM1000x 1000W Gold",
      price: 2800000,
      tag: "Power Supply",
      image: "src/assets/CorsairSupply.jpg"
    },
    {
      id: 7,
      name: "AMD Ryzen 9 7950X",
      price: 8900000,
      tag: "CPU",
      image: "src/assets/Ryzen9.jpg"
    },
    {
      id: 8,
      name: "Gigabyte GeForce RTX 4070",
      price: 10500000,
      tag: "Graphic Card",
      image: "src/assets/rtx4070.png"
    },
    {
      id: 9,
      name: "MATX Mini ATX",
      price: 500000,
      tag: "PC Case",
      image: "src/assets/casingATX.jpeg"
    },
     {
      id: 10,
      name: "Intel Core i5-13400f",
      price: 3500000,
      tag: "CPU",
      image: "src/assets/intelCorei5.png"
    }
  ];

  const filteredProducts = activeTab === 'All' 
    ? allProducts 
    : allProducts.filter(product => product.tag === activeTab);


  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      showNotification("Please Login to add items to cart");
      onLoginClick(); // Open the login modal
    } else {
      addToCart(product); // Proceed normally
    }
  };

  return (
    <div id="products" className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 border-b border-gray-200 pb-4 text-sm md:text-base text-gray-500">
          {filters.map((filter, index) => (
            <React.Fragment key={filter}>
              <button 
                onClick={() => setActiveTab(filter)}
                className={`transition-colors duration-200 ${
                  activeTab === filter 
                    ? "font-bold text-black" 
                    : "hover:text-black"
                }`}
              >
                {filter}
              </button>
              {index !== filters.length - 1 && (
                <span className="text-gray-300 font-light">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col">
              {/* Image Area */}
              <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-3/4 h-3/4 object-contain mix-blend-multiply"
                />
              </div>

              {/* Tag */}
              <div className="mb-2">
                <span className="bg-gray-100 text-gray-500 text-[10px] uppercase font-bold px-2 py-1 rounded">
                  {product.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-gray-800 font-medium text-sm mb-1 leading-snug">
                {product.name}
              </h3>

              {/* Price */}
              <div className="text-black font-extrabold text-base mb-4">
                Rp {product.price.toLocaleString('id-ID')}
              </div>

              {/* Button */}
              <button 
                onClick={() => handleAddToCart(product)}
                className="mt-auto w-full bg-[#222] text-white py-2.5 rounded-md text-sm font-medium hover:bg-[#D80000] transition-colors cursor-pointer active:scale-95"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};