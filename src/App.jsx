import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Category } from './components/sections/Category';
import { Products } from './components/sections/Products';
import { Footer } from './components/sections/Footer';
import { LoginNodal } from './components/LoginNodal';
import { Navbar } from './components/Navbar';
import { Register } from './components/Register';
import { Checkout } from './auth/Checkout';
import  ReceiptPage  from './components/sections/ReceiptPage'; 
import { useCart } from './context/CartContext'; 
import { Notification  } from './components/Notifications';
import { signOut } from "firebase/auth"
import { auth } from "./firebase";

function App() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Modals
  const [isLoginOpen, setIsLoginOpen] = useState(false); 
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Auth & View State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('home'); // 'home', 'checkout', 'receipt'

  // FIX 3: Get the REAL cart state and functions from Context
  // We removed the local useState for cart here.
  const { cart, clearCart } = useCart(); 

  // Modal Switching
  const switchToRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  }

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  }

 const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setView('home'); 
    } catch (error) {
      console.error("Logout Error:", error);
    }
  }

  const [lastOrder, setLastOrder] = useState(null);

  const handleOrderSuccess = (orderData) => { 
    setLastOrder(orderData);    // 1. Save order details
    clearCart();                // 2. Clear the Global Cart (Context)
    setView('receipt');         // 3. Switch to receipt view
  }

  return (
    <>
     

      <div className="min-h-screen  bg-[#FEFEFE] text-gray-900">

        <Notification/>
        
        {/* Modals */}
        <LoginNodal
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
          onSwitchToRegister={switchToRegister}
          onLoginSuccess={handleLoginSuccess} 
        />

        <Register
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onSwitchToLogin={switchToLogin} 
        />

        {/* --- VIEW: HOME --- */}
        {view === 'home' && (
          <>
            <Navbar
              menuOpen={menuOpen} 
              setMenuOpen={setMenuOpen} 
              onLoginClick={() => setIsLoginOpen(true)} 
              isLoggedIn={isLoggedIn}
              onCartClick={() => setView('checkout')}
              // FIX 4: Use the real cart length from context
              cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}

              onLogoutClick={handleLogout}
            />
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <MobileMenu 
            menuOpen={menuOpen} 
            setMenuOpen={setMenuOpen}
            isLoggedIn={isLoggedIn}
            onLoginClick={() => setIsLoginOpen(true)}
            onLogoutClick={handleLogout}
            
            /> 
            <Category />
            
            <Products 
            isLoggedIn={isLoggedIn}
            onLoginClick={() => setIsLoginOpen(true)}
            /> 
            <Footer />
          </>
        )}

        {/* --- VIEW: CHECKOUT --- */}
        {view === 'checkout' && (
          <Checkout 
            // FIX 6: Removed cartItems prop (Checkout uses context now)
            onBack={() => setView('home')}
            onSuccess={handleOrderSuccess}
          />
        )}

        {/* --- VIEW: RECEIPT --- */}
        {view === 'receipt' && (
          <ReceiptPage 
            order={lastOrder} 
            // FIX 7: Prop name must match ReceiptPage.jsx (onBackHome, not onGoHome)
            onBackHome={() => setView('home')} 
          />
        )}

      </div>
    </>
  );
}

export default App;