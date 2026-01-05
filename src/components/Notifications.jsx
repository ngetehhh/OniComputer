// src/components/Notification.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, X } from 'lucide-react'; 

export const Notification = () => {
  const { notification, closeNotification } = useCart();

  // If not showing, render nothing
  if (!notification.show) return null;

  return (
    // Fixed position at top-center (or change to bottom-right)
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[100] animate-[slideIn_0.5s_ease-out]">
      <div className="bg-white/90 backdrop-blur-md text-gray-900 shadow-2xl rounded-2xl border border-gray-100 p-4 flex items-center gap-4 min-w-[320px] md:min-w-[400px]">
        
       
        {/* Text */}
        <div className="flex-1 flex justify-center">
           <p className="text-sm text-gray-600 items-center">{notification.message}</p>
        </div>

      </div>
    </div>
  );
};