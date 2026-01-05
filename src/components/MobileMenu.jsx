import React from "react";

export const MobileMenu = ({ menuOpen, setMenuOpen, isLoggedIn, onLoginClick, onLogoutClick }) => {

    return (
        <div className={`fixed top-0 left-0 w-full z-[60] flex flex-col items-center justify-center
                        transition-all duration-300 ease-in-out
                        bg-black/50 backdrop-blur-md
                        ${menuOpen ? "h-screen opacity-100 pointer-events-auto" : "h-0 opacity-0 pointer-events-none"}
                        `}
        >
            <button onClick={() => setMenuOpen(false)}
                    className="absolute top-6 right-6 text-white text-4xl focus:outline-none cursor-pointer hover:text-red-500 transition-colors"
                    aria-label="Close Menu"
                >
                &times;
            </button>

            {/* Navigation Links */}
             {['Home', 'Category', 'Products', 'Contact'].map((item) => (
                <a
                    key={item}
                    href={`#${item.toLowerCase()}`}   
                    onClick={() => setMenuOpen(false)}     
                    className={`text-2xl font-medium text-white my-3 transform transition-transform duration-300 hover:text-[#D90000]
                                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
                                `}            
                > 
                    {item}
                </a>
             ))}

            {/* LOGIN BUTTON (Only if NOT logged in) */}
            {!isLoggedIn && (
                <button
                    onClick={() => {
                        setMenuOpen(false);
                        onLoginClick();
                    }}
                    className={`mt-8 px-8 py-3 bg-[#D90000] text-white rounded-lg font-bold text-xl
                                transform transition-all duration-300 shadow-lg shadow-red-900/20 active:scale-95
                                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
                    `}
                >
                    Login
                </button>
            )}

            {/* LOGOUT BUTTON (Only if LOGGED IN) */}
            {isLoggedIn && (
                <button
                    onClick={() => {
                        setMenuOpen(false);
                        onLogoutClick();
                    }}
                    className={`mt-8 px-8 py-3 bg-red-900 border-gray-600 text-white rounded-lg font-bold text-xl
                                transform transition-all duration-300 shadow-lg hover:bg-gray-700 active:scale-95
                                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
                    `}
                >
                    Log Out
                </button>
            )}
        </div>
    );
};