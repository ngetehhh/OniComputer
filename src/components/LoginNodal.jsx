import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 

export const LoginNodal = ({ isOpen, onClose, onSwitchToRegister, onLoginSuccess }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = async () => { 
    if (!email || !password ) {
      setErrorMessage("Please fill in both email and password.")
      return ;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage('');
      setEmail('');
      setPassword('');
      onLoginSuccess(); 
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMessage("Invalid Email or Password");
    }
  };

  return (
    // Z-INDEX 100 ensures it sits above everything
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-4 sm:py-0">
      
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content - Responsive Width & Padding */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg p-6 md:p-12 shadow-2xl animate-in fade-in zoom-in duration-200 max-h-full overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-7 md:right-7 text-gray-400 hover:text-gray-600 transition p-2"
        >
         {/* Simple X Icon */}
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="flex flex-col items-center mb-8 md:mb-12">
          <div className="font-bold text-3xl md:text-4xl tracking-tighter mr-1">
            <span className="text-[#D90000]">ONI</span>
          </div>
          <div className="text-gray-500 text-[10px] md:text-xs font-medium tracking-[0.1em] uppercase ml-1">
            Computer
          </div>
        </div>

        <form className="space-y-4 md:space-y-6">

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm text-center">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
            type="email" 
            value={email}
            className="w-full bg-gray-100 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors text-sm md:text-base" 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
            type="password" 
            value={password}
            className="w-full bg-gray-100 text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors text-sm md:text-base" 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            />
          </div>

          <button 
          type="button" className="w-full bg-[#D80000] hover:bg-red-700 text-white font-bold py-3 md:py-3.5 rounded-lg transition-colors mt-6 md:mt-8 shadow-lg shadow-red-200"
          onClick={handleLoginSubmit}
          >
            Login
          </button>

        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Dont have account ? <button onClick={onSwitchToRegister} className="font-bold text-black hover:underline cursor-pointer">Register</button>
        </div>
      </div>
    </div>
  );
};