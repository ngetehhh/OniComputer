import React, { useState } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore'; 
// 1. Import new function
import { useCart } from '../context/CartContext'; 
import { Trash2 } from 'lucide-react'; // Optional: Use an icon for delete if you want

export const Checkout = ({ onBack, onSuccess }) => {
  // 2. Get decreaseQuantity from context
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCart();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(''); 
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 50000 : 0; 
  const total = subtotal + shipping;

  const methods = ["COD", "Bank", "Qris", "E-Wall"];

  const handlePayment = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!name || !email || !address) {
      alert("Please fill in all shipping details.");
      return;
    }
    if (!paymentMethod) {
        alert("Please select a payment method!");
        return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        customer: { name, email, address },
        items: cart,
        total: total,
        paymentMethod: paymentMethod,
        date: new Date().toISOString(),
        id: "ORD-" + Date.now() 
      };

      await addDoc(collection(db, "orders"), orderData);

      setIsProcessing(false);
      onSuccess(orderData); 

    } catch (error) {
      console.error("Order Error:", error);
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-gray-200 pb-4">
           <h1 className="text-xl font-bold tracking-wider">CHECKOUT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT COLUMN: Shipping & Payment */}
          <div className="space-y-8">
            {/* Shipping Form */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-lg font-bold mb-6">Shipping</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-600 outline-none" placeholder="Full Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-600 outline-none" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea rows="3" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-600 outline-none" placeholder="Shipping Address"></textarea>
                </div>
              </form>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-lg font-bold mb-6">Payment Method</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {methods.map((method) => (
                        <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`
                                py-3 rounded-lg font-bold text-sm transition-all duration-200 border-2
                                ${paymentMethod === method 
                                    ? "bg-[#D90000] text-white border-[#D90000] shadow-lg shadow-red-200 scale-105" 
                                    : "bg-white text-gray-600 border-gray-200 hover:border-red-200 hover:text-red-500"
                                }
                            `}
                        >
                            {method}
                        </button>
                    ))}
                </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Cart Summary (UPDATED) */}
          <div className="bg-gray-50 p-6 rounded-xl h-fit">
            <h2 className="text-lg font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {cart.length === 0 ? (
                 <p className="text-gray-400 text-sm">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    {/* Image */}
                    <div className="w-20 h-20 bg-white rounded-lg flex-shrink-0 border border-gray-200 p-2 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-900 mb-1">{item.name}</h3>
                      <div className="text-xs font-bold text-gray-500 mb-3">
                        Rp {(item.price).toLocaleString('id-ID')}
                      </div>

                      {/* QUANTITY CONTROLS */}
                      <div className="flex items-center gap-3">
                         <div className="flex items-center bg-white border border-gray-200 rounded-md">
                            <button 
                                onClick={() => decreaseQuantity(item.id)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold transition"
                                type="button"
                            >
                                -
                            </button>
                            <span className="text-sm font-semibold px-2 min-w-[20px] text-center">{item.quantity}</span>
                            <button 
                                onClick={() => addToCart(item)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold transition"
                                type="button"
                            >
                                +
                            </button>
                         </div>
                         
                         {/* Optional Trash Button for direct delete */}
                         <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition"
                            type="button"
                         >
                            <Trash2 size={16} />
                         </button>
                      </div>
                    </div>

                    {/* Total Price for this Item */}
                    <div className="text-sm font-bold text-[#D90000]">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totals Section */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span>Rp {shipping.toLocaleString('id-ID')}</span>
              </div>
               <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span className="text-[#D90000]">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full bg-[#D90000] text-white py-4 rounded-lg font-bold text-lg mt-8 hover:bg-red-700 transition cursor-pointer shadow-lg shadow-red-200 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
            
            <button onClick={onBack} className="w-full text-gray-500 text-sm mt-4 hover:text-black cursor-pointer underline">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};