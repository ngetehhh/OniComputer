import React from 'react';

const CheckIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="64" 
    height="64" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="text-green-600"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ReceiptPage = ({ onBackHome, order }) => { 
  
  const orderId = order?.id || "ORD-ERROR";
  const total = order?.total || 0;
  const date = order?.date ? new Date(order.date).toLocaleDateString() : new Date().toLocaleDateString();
  const items = order?.items || [];
  const paymentMethod = order?.paymentMethod || "Online Payment";
  const customer = order?.customer || { name: '-', email: '-', address: '-' };

  return (
    // 1. Changed max-w-4xl to max-w-2xl for a medium, balanced size
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white max-w-2xl w-full p-8 rounded-3xl shadow-2xl border border-gray-100">
        
        {/* HEADER */}
        <div className="text-center mb-8 border-b border-gray-100 pb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full ">
              <CheckIcon />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Order Successful!</h1>
          <p className="text-gray-500">Thank you. Your order has been confirmed.</p>
        </div>

        {/* DETAILS GRID */}
        <div className="space-y-8">
          
          {/* Top Section: Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Order Info */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Order Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-mono font-bold text-gray-900">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-gray-900">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment</span>
                  <span className="font-bold text-[#D90000] uppercase">{paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Ship To</h3>
               <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium text-gray-900 text-right">{customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Address</span>
                    <span className="font-medium text-gray-900 text-right truncate w-[70%]">{customer.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Address</span>
                    <span className="font-medium text-gray-900 text-right truncate w-[70%]">{customer.address}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Items List (No Photos) */}
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Items Purchased</h3>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              
              <div className="space-y-3 mb-6 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-200 last:border-0 pb-2 last:pb-0">
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-gray-500 text-xs">Quantity: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-gray-900">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t-2 border-dashed border-gray-200 pt-4 flex justify-between items-center">
                <span className="text-gray-500 font-medium">Total Paid</span>
                <span className="text-2xl font-bold text-[#D90000]">
                  Rp {total.toLocaleString('id-ID')}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Button */}
        <div className="mt-8 text-center">
          <button 
            onClick={onBackHome}
            className="w-full md:w-auto bg-[#D90000] text-white px-10 py-3 rounded-xl font-bold hover:bg-red-700 transition duration-300 shadow-lg shadow-red-100 cursor-pointer"
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReceiptPage;