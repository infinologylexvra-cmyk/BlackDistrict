import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../apiConfig';
import { translations } from '../utils/translations';
import { Heart } from 'lucide-react';

const FALLBACK_ARRIVALS = [
  {
    _id: 'arr1',
    name: 'Classic Beige Pant & Shirt Set',
    price: 999,
    compareAtPrice: 1999,
    images: ['/image/collection-shirt.png'],
    category: 'combo',
    description: 'A complete combination featuring our tailored beige trousers and a matching premium shirt. Designed for a casual yet sophisticated fit.'
  },
  {
    _id: 'arr2',
    name: 'Classic White Pants & Linen Shirt Combo',
    price: 999,
    compareAtPrice: 1999,
    images: ['/image/collection-summer-edit.jpg'],
    category: 'combo',
    description: 'A premium summer-ready set consisting of regular straight cotton white pants and a breathable linen shirt.'
  },
  {
    _id: 'arr3',
    name: 'Midnight Silk Evening Shirt & Pant Set',
    price: 999,
    compareAtPrice: 3499,
    images: ['/image/midnight_silk_shirt.jpg'],
    category: 'combo',
    description: 'A luxurious deep midnight navy silk button-down shirt paired with tailored dark trousers. Elegant, sophisticated evening wear.'
  },
  {
    _id: 'arr4',
    name: 'Riviera Resort Combo Set',
    price: 999,
    compareAtPrice: 4299,
    images: ['/image/riviera_combo.jpg'],
    category: 'combo',
    description: 'A premium men\'s combination set: a beige linen shirt and white trousers. Resort wear, bright Mediterranean vibe.'
  },
  {
    _id: 'arr5',
    name: 'Emerald Linen Signature Set',
    price: 999,
    compareAtPrice: 4599,
    images: ['/image/emerald_combo.jpg'],
    category: 'combo',
    description: 'An emerald green linen shirt and beige tailored trousers combo. Studio lighting, luxury brand aesthetic.'
  },
  {
    _id: 'arr6',
    name: 'Blue Linen Summer Shirt & Trouser Combo',
    price: 999,
    compareAtPrice: 3499,
    images: ['/image/blue-linen-shirt.jpg'],
    category: 'combo',
    description: 'Lightweight blue linen shirt paired with comfortable matching trousers, perfect for summer outings and beach vacations.'
  },
  {
    _id: 'arr7',
    name: 'Classic Black Pant & Evening Shirt Combo',
    price: 999,
    compareAtPrice: 1999,
    images: ['/image/collection-signature.webp'],
    category: 'combo',
    description: 'An ultra HD solid drawstring black pant paired with a premium evening shirt for a complete sophisticated look.'
  },
  {
    _id: 'arr8',
    name: 'Stone Grey Chino Pants & Shirt Combo',
    price: 999,
    compareAtPrice: 2499,
    images: ['/image/olive-safari-shirt.jpg'],
    category: 'combo',
    description: 'Premium slim-fit stone grey chino trousers combined with a breathable cotton shirt. Crafted for modern elegance and comfort.'
  }
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
          
          const arrivalsItems = sortedItems.slice(0, 8);
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
