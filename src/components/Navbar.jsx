import React from 'react';
import { ShoppingCart, LogOut } from 'lucide-react'; // Import LogOut icon

export const Navbar = ({ menuOpen, setMenuOpen, onLoginClick, isLoggedIn, onCartClick, cartCount, onLogoutClick }) => {
  
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <div className="flex flex-col font-bold text-2xl tracking-tighter cursor-pointer">
            <span className="text-[#D80000]">ONI</span>
            <span className="text-gray-200 text-sm font-normal tracking-widest uppercase">Computer</span>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
               {/* CART ICON */}
               <button 
                onClick={onCartClick} 
                className="text-white hover:text-red-500 transition cursor-pointer relative p-2"
                title="View Cart"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* LOGOUT BUTTON (Desktop) */}
              <button 
                onClick={onLogoutClick}
                className="hidden md:flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg transition text-sm font-medium"
                title="Log Out"
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            // LOGIN BUTTON (Desktop)
            <button 
              onClick={onLoginClick} 
              className="hidden md:block bg-[#D90000] text-white px-5 py-1.5 rounded-md font-medium hover:bg-white hover:text-black transition cursor-pointer"
            >
              Login
            </button>
          )}

          {/* Mobile Toggle Button (Hamburger) */}
          <div className="md:hidden z-50">
              <button 
                  onClick={() => setMenuOpen(!menuOpen)} 
                  className="text-white focus:outline-none cursor-pointer p-1"
              >
                  <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                      <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                      <span className={`block w-full h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
                      <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                  </div>
              </button>
          </div>

        </div>

      </div>
    </nav>
  );
};