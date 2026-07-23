import React, { useState } from 'react';
import { API_BASE_URL } from '../apiConfig';
import { Package, Truck, CheckCircle, Search } from 'lucide-react';

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/track/${orderId.trim()}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setOrderData(data.order);
      } else {
        setError(data.message || 'Order not found. Please check your Order ID.');
      }
    } catch (err) {
      console.error('Tracking Error:', err);
      setError('Network error. Unable to track order at this time.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    if (status === 'success') return 2; // Payment successful, processing
    if (status === 'shipped') return 3;
    if (status === 'delivered') return 4;
    return 1; // Pending
  };

  return (
    <div className="bg-[#f5f5f0] min-h-screen text-[#1a1a1a] font-body py-16 px-4 sm:px-8 text-left">
      <div className="max-w-[700px] mx-auto bg-transparent">
        
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-[36px] sm:text-[46px] font-heading font-medium tracking-wide mb-4">
            Track Your Order
          </h1>
          <div className="w-16 h-[2px] bg-black mx-auto mb-6"></div>
          <p className="text-[14px] text-[#6b6b66] font-sans">
            Enter your Order ID below to receive real-time updates on your shipment.
          </p>
        </div>

        {/* Tracking Form */}
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. order_mock_12345"
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#e5e5e0] focus:border-black focus:outline-none focus:ring-0 text-[14px] font-sans"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 bg-black hover:opacity-90 text-white text-[12px] uppercase font-sans font-bold tracking-widest transition-opacity whitespace-nowrap disabled:opacity-50"
          >
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded text-[13px] font-sans font-medium mb-8 text-center">
            {error}
          </div>
        )}

        {/* Order Results */}
        {orderData && (
          <div className="bg-white border border-[#e5e5e0] p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#e5e5e0] pb-6 mb-8">
              <div>
                <h3 className="text-[18px] font-heading font-semibold">Order #{orderData.orderId}</h3>
                <p className="text-[13px] text-gray-500 font-sans mt-1">Placed on {new Date(orderData.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <span className={`inline-block px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${orderData.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {orderData.status === 'success' ? 'Confirmed' : orderData.status}
                </span>
              </div>
            </div>

            {/* Tracking Progress */}
            <div className="relative mb-12 px-4 sm:px-10 font-sans">
              <div className="absolute top-5 left-10 right-10 h-[2px] bg-gray-100 -z-10"></div>
              
              <div className="flex justify-between relative">
                
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 border-2 ${getStatusStep(orderData.status) >= 1 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200'}`}>
                    <CheckCircle size={18} />
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${getStatusStep(orderData.status) >= 1 ? 'text-black' : 'text-gray-400'}`}>Placed</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 border-2 ${getStatusStep(orderData.status) >= 2 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200'}`}>
                    <Package size={18} />
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${getStatusStep(orderData.status) >= 2 ? 'text-black' : 'text-gray-400'}`}>Processing</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 border-2 ${getStatusStep(orderData.status) >= 3 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200'}`}>
                    <Truck size={18} />
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${getStatusStep(orderData.status) >= 3 ? 'text-black' : 'text-gray-400'}`}>Shipped</span>
                </div>

              </div>
            </div>

            {/* Order Items Summary */}
            <div className="space-y-4">
              <h4 className="text-[13px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Items in this order</h4>
              {orderData.items && orderData.items.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-gray-50 border border-gray-100" />
                  <div className="flex-1 font-sans">
                    <h5 className="text-[14px] font-semibold text-black">{item.name}</h5>
                    <p className="text-[12px] text-gray-500 mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                  </div>
                  <div className="font-sans font-medium text-[14px]">
                    Rs. {item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default TrackOrderPage;
