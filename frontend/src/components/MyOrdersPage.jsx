import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../apiConfig';
import { Package, Truck, CheckCircle, RefreshCcw } from 'lucide-react';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get user info from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const userEmail = user?.email || user?.phone; // Using email or phone as identifier depending on login method

  useEffect(() => {
    if (!userEmail) {
      setError('Please log in to view your orders.');
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/payment/my-orders/${userEmail}`);
        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          setError(data.message || 'Failed to fetch orders.');
        }
      } catch (err) {
        console.error('Fetch My Orders Error:', err);
        setError('Network error. Unable to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  const getStatusStep = (status) => {
    if (status === 'success') return 2; // Payment successful, processing
    if (status === 'shipped') return 3;
    if (status === 'delivered') return 4;
    return 1; // Pending or failed
  };

  return (
    <div className="bg-[#f5f5f0] min-h-screen text-[#1a1a1a] font-body py-16 px-4 sm:px-8 text-left">
      <div className="max-w-[900px] mx-auto bg-transparent">
        
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-[36px] sm:text-[46px] font-heading font-medium tracking-wide mb-4">
            My Orders
          </h1>
          <div className="w-16 h-[2px] bg-black mx-auto mb-6"></div>
          <p className="text-[14px] text-[#6b6b66] font-sans">
            View your order history, track shipments, and manage returns.
          </p>
        </div>

        {error ? (
          <div className="bg-white border border-gray-200 p-10 text-center shadow-sm">
            <p className="text-red-600 font-sans">{error}</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-gray-200 p-10 text-center shadow-sm">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-heading font-semibold mb-2">No orders found</h3>
            <p className="text-gray-500 font-sans text-sm mb-6">You haven't placed any orders yet.</p>
            <a href="/collections" onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'collections' }));
            }} className="inline-block px-8 py-3 bg-black text-white text-xs uppercase font-bold tracking-widest hover:opacity-90">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-[#e5e5e0] p-6 sm:p-8 shadow-sm">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#e5e5e0] pb-5 mb-6">
                  <div>
                    <h3 className="text-[16px] font-heading font-semibold">Order #{order.orderNumber || order.orderId.replace('order_', '')}</h3>
                    <p className="text-[12px] text-gray-500 font-sans mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-3 sm:mt-0 text-right">
                    <span className={`inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'success' || order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'failed' ? 'bg-red-100 text-red-800' :
                      order.status === 'returned' || order.status === 'refunded' ? 'bg-gray-200 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'success' ? 'Confirmed' : order.status}
                    </span>
                    <p className="text-[14px] font-sans font-bold mt-2">Total: Rs. {order.amount}</p>
                  </div>
                </div>

                {/* Status Tracker */}
                {order.status !== 'failed' && order.status !== 'returned' && order.status !== 'refunded' && (
                  <div className="relative mb-8 px-4 sm:px-10 font-sans hidden sm:block">
                    <div className="absolute top-5 left-10 right-10 h-[2px] bg-gray-100 -z-10"></div>
                    <div className="flex justify-between relative">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${getStatusStep(order.status) >= 1 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200'}`}>
                          <CheckCircle size={16} />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${getStatusStep(order.status) >= 1 ? 'text-black' : 'text-gray-400'}`}>Placed</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${getStatusStep(order.status) >= 2 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200'}`}>
                          <Package size={16} />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${getStatusStep(order.status) >= 2 ? 'text-black' : 'text-gray-400'}`}>Processing</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${getStatusStep(order.status) >= 3 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200'}`}>
                          <Truck size={16} />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${getStatusStep(order.status) >= 3 ? 'text-black' : 'text-gray-400'}`}>Shipped</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${getStatusStep(order.status) >= 4 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-200'}`}>
                          <CheckCircle size={16} />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${getStatusStep(order.status) >= 4 ? 'text-black' : 'text-gray-400'}`}>Delivered</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {order.items && order.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-gray-50 border border-gray-100" />
                      <div className="flex-1 font-sans">
                        <h5 className="text-[14px] font-semibold text-black">{item.name}</h5>
                        <p className="text-[12px] text-gray-500 mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                      </div>
                      <div className="font-sans font-medium text-[13px] text-gray-800">
                        Rs. {item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-5 border-t border-[#e5e5e0] flex flex-wrap gap-3">
                  <button 
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('navigate', { detail: 'track-order' }));
                    }}
                    className="px-5 py-2 border border-black hover:bg-black hover:text-white transition-colors text-[11px] uppercase font-bold tracking-widest"
                  >
                    Track Shipment
                  </button>
                  <button 
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('navigate', { detail: 'returns' }));
                    }}
                    className="px-5 py-2 border border-gray-300 text-gray-600 hover:text-black hover:border-black transition-colors text-[11px] uppercase font-bold tracking-widest flex items-center space-x-2"
                  >
                    <RefreshCcw size={12} />
                    <span>Return / Exchange</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrdersPage;
