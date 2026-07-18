import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, CreditCard, Truck } from 'lucide-react';

const CheckoutPage = ({ cartItems, onBack, onClearCart }) => {
  // Shipping form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(value).replace('₹', 'Rs. ');
  };

  // Dynamically load Razorpay SDK script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const subtotal = getSubtotal();
    const shippingDetails = { name, email, address, city, state, postalCode, phone };

    // 1. Create order on backend
    try {
      const orderRes = await fetch('http://localhost:5000/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: subtotal })
      });
      const orderData = await orderRes.json();

      if (paymentMethod === 'cod') {
        // Direct cash on delivery verification
        const verifyRes = await fetch('http://localhost:5000/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: `cod_${Date.now()}`,
            razorpay_payment_id: `cod_pay_${Date.now()}`,
            amount: subtotal,
            items: cartItems.map(item => ({
              productId: item._id,
              name: item.name,
              price: item.price,
              size: item.size,
              quantity: item.quantity,
              image: item.images[0]
            })),
            shippingAddress: shippingDetails
          })
        });
        
        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          setOrderSuccess({
            id: `FL-${Date.now().toString().slice(-6)}`,
            method: 'Cash on Delivery',
            amount: subtotal,
            address: shippingDetails
          });
          if (onClearCart) onClearCart();
        } else {
          alert('Failed to place Cash on Delivery order.');
        }
        setLoading(false);
        return;
      }

      // If Razorpay is chosen:
      if (orderData.mock) {
        // If server uses mock keys (simulated flow for local dev environments)
        console.log('Simulating Razorpay payment window flow...');
        setTimeout(async () => {
          const verifyRes = await fetch('http://localhost:5000/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: orderData.id,
              razorpay_payment_id: `pay_mock_${Date.now()}`,
              amount: subtotal,
              items: cartItems.map(item => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                size: item.size,
                quantity: item.quantity,
                image: item.images[0]
              })),
              shippingAddress: shippingDetails
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setOrderSuccess({
              id: orderData.id,
              method: 'Razorpay Payment Gateway (Simulated)',
              amount: subtotal,
              address: shippingDetails
            });
            if (onClearCart) onClearCart();
          }
          setLoading(false);
        }, 1500);
      } else {
        // Real Razorpay Payment Gateway popup trigger
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          alert('Razorpay SDK failed to load. Are you connected to the internet?');
          setLoading(false);
          return;
        }

        const options = {
          key: orderData.key_id,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'FineLegends',
          description: 'Timeless Premium Apparel Checkout',
          image: '/image/logo-signature.webp',
          order_id: orderData.id,
          handler: async (response) => {
            setLoading(true);
            try {
              const verifyRes = await fetch('http://localhost:5000/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  amount: subtotal,
                  items: cartItems.map(item => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    size: item.size,
                    quantity: item.quantity,
                    image: item.images[0]
                  })),
                  shippingAddress: shippingDetails
                })
              });
              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                setOrderSuccess({
                  id: response.razorpay_order_id,
                  method: 'Razorpay Online Card/UPI',
                  amount: subtotal,
                  address: shippingDetails
                });
                if (onClearCart) onClearCart();
              } else {
                alert('Payment verification failed.');
              }
            } catch (err) {
              console.error('Verify error:', err);
            }
            setLoading(false);
          },
          prefill: {
            name: shippingDetails.name,
            email: shippingDetails.email,
            contact: shippingDetails.phone
          },
          notes: {
            address: shippingDetails.address
          },
          theme: {
            color: '#002349'
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setLoading(false);
      }

    } catch (err) {
      console.error('Place order error:', err);
      alert('Error connecting to the payment server.');
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="bg-[#f5f5f0] min-h-screen text-[#1a1a1a] font-body py-16 px-4 flex items-center justify-center text-left">
        <div className="max-w-xl w-full bg-white border border-[#e5e5e0] p-8 sm:p-12 shadow-sm text-center">
          <CheckCircle className="text-green-600 mx-auto mb-6" size={56} />
          <h2 className="text-[28px] font-heading font-semibold mb-2">Order Confirmed!</h2>
          <p className="text-[14px] text-[#6b6b66] font-sans mb-8">
            Thank you for your purchase. Your order has been placed successfully and will be delivered shortly.
          </p>

          <div className="bg-[#f5f5f0] p-6 text-left space-y-3 font-sans text-[13px] border border-[#e5e5e0] mb-8">
            <div><strong>Order ID:</strong> {orderSuccess.id}</div>
            <div><strong>Payment Method:</strong> {orderSuccess.method}</div>
            <div><strong>Total Paid:</strong> {formatPrice(orderSuccess.amount)}</div>
            <div className="border-t border-gray-300 pt-3">
              <strong>Delivery Address:</strong>
              <div className="text-gray-600 mt-1">
                {orderSuccess.address.name}<br />
                {orderSuccess.address.address}<br />
                {orderSuccess.address.city}, {orderSuccess.address.state} - {orderSuccess.address.postalCode}
              </div>
            </div>
          </div>

          <button 
            onClick={onBack}
            className="btn-primary w-full py-4 text-[13px] tracking-widest font-sans font-semibold uppercase"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f0] min-h-screen text-[#1a1a1a] font-body py-12 px-4 text-left">
      <div className="max-w-5xl mx-auto">
        
        {/* Back navigation */}
        <button 
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-[14px] text-[#6b6b66] hover:text-[#1a1a1a] font-sans font-medium mb-8 focus:outline-none"
        >
          <ArrowLeft size={16} />
          <span>Back to Bag</span>
        </button>

        <h1 className="text-[32px] sm:text-[38px] font-heading font-medium mb-10 border-b border-[#e5e5e0] pb-4">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Shipping Form (Left Column) */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-heading font-semibold uppercase tracking-wider text-[#002349] border-b border-gray-200 pb-2">
              Shipping Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-[12px] font-sans font-semibold uppercase tracking-wider mb-2 text-[#6b6b66]">
                  Full Name
                </label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                  placeholder="John Doe"
                  className="border border-gray-300 px-4 py-3 bg-transparent text-[14px] focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[12px] font-sans font-semibold uppercase tracking-wider mb-2 text-[#6b6b66]">
                  Email
                </label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  placeholder="john@example.com"
                  className="border border-gray-300 px-4 py-3 bg-transparent text-[14px] focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[12px] font-sans font-semibold uppercase tracking-wider mb-2 text-[#6b6b66]">
                Address
              </label>
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required
                placeholder="House No, Street, Locality"
                className="border border-gray-300 px-4 py-3 bg-transparent text-[14px] focus:outline-none focus:border-[#1a1a1a]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-[12px] font-sans font-semibold uppercase tracking-wider mb-2 text-[#6b6b66]">
                  City
                </label>
                <input 
                  type="text" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  required
                  placeholder="Mumbai"
                  className="border border-gray-300 px-4 py-3 bg-transparent text-[14px] focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[12px] font-sans font-semibold uppercase tracking-wider mb-2 text-[#6b6b66]">
                  State
                </label>
                <input 
                  type="text" 
                  value={state} 
                  onChange={(e) => setState(e.target.value)} 
                  required
                  placeholder="Maharashtra"
                  className="border border-gray-300 px-4 py-3 bg-transparent text-[14px] focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[12px] font-sans font-semibold uppercase tracking-wider mb-2 text-[#6b6b66]">
                  Postal Code
                </label>
                <input 
                  type="text" 
                  value={postalCode} 
                  onChange={(e) => setPostalCode(e.target.value)} 
                  required
                  placeholder="400001"
                  className="border border-gray-300 px-4 py-3 bg-transparent text-[14px] focus:outline-none focus:border-[#1a1a1a]"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[12px] font-sans font-semibold uppercase tracking-wider mb-2 text-[#6b6b66]">
                Phone Number
              </label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required
                placeholder="9876543210"
                className="border border-gray-300 px-4 py-3 bg-transparent text-[14px] focus:outline-none focus:border-[#1a1a1a]"
              />
            </div>

            {/* Payment Method Option */}
            <h3 className="text-lg font-heading font-semibold uppercase tracking-wider text-[#002349] border-b border-gray-200 pb-2 pt-6">
              Payment Method
            </h3>
            <div className="space-y-3 font-sans">
              <label className="flex items-center space-x-3 p-4 border border-gray-300 cursor-pointer hover:bg-white/50 transition-colors">
                <input 
                  type="radio" 
                  name="payment" 
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={() => setPaymentMethod('razorpay')}
                  className="text-[#002349]"
                />
                <CreditCard size={18} className="text-[#002349]" />
                <span className="text-[14px] font-medium">Pay via Razorpay Secure Gateway (Card, UPI, Netbanking)</span>
              </label>

              <label className="flex items-center space-x-3 p-4 border border-gray-300 cursor-pointer hover:bg-white/50 transition-colors">
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="text-[#002349]"
                />
                <Truck size={18} className="text-[#002349]" />
                <span className="text-[14px] font-medium">Cash on Delivery (COD)</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-[#002349] text-white font-sans uppercase text-[13px] tracking-widest font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 mt-6"
            >
              {loading ? 'Processing Order...' : paymentMethod === 'cod' ? 'Place COD Order' : 'Pay Now via Razorpay'}
            </button>
          </form>

          {/* Order Summary (Right Column) */}
          <div className="lg:col-span-5 bg-white border border-[#e5e5e0] p-6 sm:p-8 h-fit">
            <h3 className="text-[16px] font-heading font-semibold uppercase tracking-wider border-b border-gray-200 pb-3 mb-6">
              Order Summary
            </h3>

            {/* Cart Items list */}
            <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center border-b border-gray-100 pb-3">
                  <img src={item.images[0]} alt="" className="h-16 w-12 object-cover border border-gray-200" />
                  <div className="flex-grow text-[13px] font-sans">
                    <div className="font-semibold text-gray-800 leading-snug">{item.name}</div>
                    <div className="text-gray-500 mt-0.5">Size: {item.size} &bull; Qty: {item.quantity}</div>
                  </div>
                  <div className="font-semibold font-sans text-[13px]">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-3 font-sans text-[14px] border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
            </div>

            <div className="flex justify-between font-medium text-[16px] mb-2">
              <span>Total to Pay</span>
              <span className="font-bold text-[18px] text-[#002349] font-sans">{formatPrice(getSubtotal())}</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
