import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../apiConfig';
import { translations } from '../utils/translations';
import { Heart } from 'lucide-react';

const FALLBACK_ARRIVALS = [
  { _id: 'arr1', name: 'Aura Linen Combo Set', price: 999, compareAtPrice: 1999, images: ['/image/c1.jpg'], category: 'combo', description: 'A hand-tailored premium linen shirt paired with lightweight drawstring trousers.' },
  { _id: 'arr2', name: 'Monaco Resort Shirt & Pant Set', price: 999, compareAtPrice: 2199, images: ['/image/c2.jpg'], category: 'combo', description: 'Crafted from high-grade flax blend fabric for casual luxury.' },
  { _id: 'arr3', name: 'Riviera Sunset Linen Combo', price: 999, compareAtPrice: 2299, images: ['/image/c3.jpg'], category: 'combo', description: 'Mediterranean inspired ensemble combining a Cuban collar shirt with trousers.' },
  { _id: 'arr4', name: 'Elegance Silk Blend Combo', price: 999, compareAtPrice: 2499, images: ['/image/c4.jpg'], category: 'combo', description: 'Sophisticated evening wear featuring a silk-touch button-down.' },
  { _id: 'arr5', name: 'Classic White & Earthy Trousers Set', price: 999, compareAtPrice: 1999, images: ['/image/c5.jpg'], category: 'combo', description: 'Crisp white top paired with neutral earthy-toned bottoms.' },
  { _id: 'arr6', name: 'Midnight Navy Signature Combo', price: 999, compareAtPrice: 2399, images: ['/image/c6.jpg'], category: 'combo', description: 'Deep navy shirt paired with contrasting light trousers.' },
  { _id: 'arr7', name: 'Olive Safari & Chino Combo Set', price: 999, compareAtPrice: 2199, images: ['/image/c7.jpg'], category: 'combo', description: 'Rustic olive tone shirt combined with tailored stone chinos.' },
  { _id: 'arr8', name: 'Breeze Linen Short-Sleeve Combo', price: 999, compareAtPrice: 1999, images: ['/image/c8.jpg'], category: 'combo', description: 'Lightweight short-sleeve resort collar shirt with matching pants.' },
  { _id: 'arr9', name: 'Old Money Gurkha Combo Set', price: 999, compareAtPrice: 2599, images: ['/image/c9.jpg'], category: 'combo', description: 'Double-buckle Gurkha styled trousers matched with a linen shirt.' },
  { _id: 'arr10', name: 'Sandstone Vacation Combo', price: 999, compareAtPrice: 2099, images: ['/image/c10.jpg'], category: 'combo', description: 'Warm sandstone hues in a lightweight textured fabric.' },
  { _id: 'arr11', name: 'Charcoal Minimalist Combo Set', price: 999, compareAtPrice: 2399, images: ['/image/c11.jpg'], category: 'combo', description: 'Monochromatic dark charcoal aesthetic for evening events.' },
  { _id: 'arr12', name: 'Striped Resort & Linen Pant Set', price: 999, compareAtPrice: 2199, images: ['/image/c12.jpg'], category: 'combo', description: 'Subtle vertical striped short-sleeve shirt with off-white trousers.' },
  { _id: 'arr13', name: 'Azure Blue Coastal Combo', price: 999, compareAtPrice: 2299, images: ['/image/c13.jpg'], category: 'combo', description: 'Sky blue breathable linen top with cream cotton pants.' },
  { _id: 'arr14', name: 'Heritage Knit & Trousers Set', price: 999, compareAtPrice: 2499, images: ['/image/c14.jpg'], category: 'combo', description: 'Micro-textured knit polo combined with relaxed trousers.' },
  { _id: 'arr15', name: 'Terracotta Summer Linen Combo', price: 999, compareAtPrice: 2099, images: ['/image/c15.jpg'], category: 'combo', description: 'Rich earthy terracotta shirt matched with light sand trousers.' },
  { _id: 'arr16', name: 'Executive Black & Beige Combo Set', price: 999, compareAtPrice: 2599, images: ['/image/c16.jpg'], category: 'combo', description: 'Tailored black linen shirt paired with classic beige trousers.' }
];

const ProductGrid = ({ onProductSelect, onNavigate, wishlist = [], onToggleWishlist }) => {
  const [arrivals, setArrivals] = useState(FALLBACK_ARRIVALS);
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    const handleLangChange = () => {
      setLang(localStorage.getItem('lang') || 'en');
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const t = translations[lang] || translations.en;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          // Sort items: Combo > Shirt > Pant
          const order = { combo: 1, shirt: 2, pant: 3 };
          const sortedItems = [...data].sort((a, b) => {
            const catA = (a.category || '').toLowerCase().trim();
            const catB = (b.category || '').toLowerCase().trim();
            return (order[catA] || 99) - (order[catB] || 99);
          });
          
          const arrivalsItems = sortedItems.slice(0, 16);
          if (arrivalsItems.length > 0) {
            setArrivals(arrivalsItems);
          }
        }
      })
      .catch(err => console.warn('Backend API connection failed, using offline mock data:', err.message));
  }, []);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(value).replace('₹', '₹');
  };

  const toggleWishlist = (product, e) => {
    if (e) e.stopPropagation();
    onToggleWishlist && onToggleWishlist(product);
  };

  const featuredProduct = arrivals[0] || FALLBACK_ARRIVALS[0];
  const regularArrivals = arrivals.slice(1);

  return (
    <div id="products font-serif" className="bg-[#f5f5f0] space-y-16 pb-20 text-left">
      
      {/* ================= SECTION 1: NEW ARRIVALS ================= */}
      <div id="new-arrivals" className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-12 space-y-10">
        
        {/* Header */}
        <div className="flex items-center justify-between font-sans">
          <div className="flex items-center space-x-6">
            <h2 className="text-[20px] sm:text-[24px] font-heading font-medium text-gray-900 tracking-wider uppercase">NEW ARRIVALS</h2>
            <div className="hidden sm:block w-32 h-[1px] bg-gray-300"></div>
          </div>
        </div>

        {/* arrivals layout: 6 columns grid matching the mockup exactly */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {(arrivals.length > 0 ? arrivals : FALLBACK_ARRIVALS).map((prod) => (
            <div 
              key={prod._id}
              onClick={() => onProductSelect && onProductSelect(prod)}
              className="group bg-white border border-neutral-200/40 p-4 flex flex-col justify-between text-left cursor-pointer transition-shadow hover:shadow-md rounded-xl"
            >
              <div className="space-y-4">
                {/* Image container */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-200 rounded-lg">
                  <img 
                    src={prod.images[0]} 
                    alt={prod.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-2 left-2 bg-[#c5a880] text-black text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 font-sans rounded-sm">NEW</span>
                  <button 
                    onClick={(e) => toggleWishlist(prod, e)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/85 hover:bg-white text-gray-400 hover:text-red-500 shadow-sm transition-colors"
                  >
                    <Heart size={12} fill={wishlist.some(item => item._id === prod._id) ? "#ef4444" : "none"} className={wishlist.some(item => item._id === prod._id) ? "text-red-500" : ""} />
                  </button>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="text-gray-900 font-heading text-[13px] font-medium leading-snug truncate group-hover:underline decoration-1 underline-offset-2 select-none">
                    {prod.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-sans font-bold uppercase tracking-widest">{prod.color || 'Signature Style'}</p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100/60 mt-4">
                <span className="text-[13px] font-bold text-gray-900 font-sans">
                  {formatPrice(prod.price)}
                </span>
                <div className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#c5a880] group-hover:underline">
                  + Add
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default ProductGrid;
