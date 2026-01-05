// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });
  let timeoutId = null;

  // --- This function is now shared ---
  const showNotification = (message) => {
    if (timeoutId) clearTimeout(timeoutId);
    setNotification({ show: true, message });
    timeoutId = setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showNotification(`${product.name} added to cart!`);
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter((item) => item.quantity > 0); // Remove item if quantity becomes 0
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
        cart, 
        addToCart, 
        decreaseQuantity,
        removeFromCart, 
        clearCart, 
        totalPrice, 
        notification, 
        closeNotification: () => setNotification({ show: false, message: '' }),
        showNotification 
    }}>
      {children}
    </CartContext.Provider>
  );
};