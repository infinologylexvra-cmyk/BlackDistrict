import React, { useState, useEffect } from 'react';
import { ChevronDown, ShoppingBag, X, Heart } from 'lucide-react';
import { API_BASE_URL } from '../apiConfig';

const FALLBACK_PRODUCTS = [
  { _id: 'p1', name: 'Aura Linen Combo Set', price: 999, compareAtPrice: 1999, images: ['/image/c1.jpg'], category: 'combo', description: 'A hand-tailored premium linen shirt paired with lightweight drawstring trousers.' },
  { _id: 'p2', name: 'Monaco Resort Shirt & Pant Set', price: 999, compareAtPrice: 2199, images: ['/image/c2.jpg'], category: 'combo', description: 'Crafted from high-grade flax blend fabric for casual luxury.' },
  { _id: 'p3', name: 'Riviera Sunset Linen Combo', price: 999, compareAtPrice: 2299, images: ['/image/c3.jpg'], category: 'combo', description: 'Mediterranean inspired ensemble combining a Cuban collar shirt with trousers.' },
  { _id: 'p4', name: 'Elegance Silk Blend Combo', price: 999, compareAtPrice: 2499, images: ['/image/c4.jpg'], category: 'combo', description: 'Sophisticated evening wear featuring a silk-touch button-down.' },
  { _id: 'p5', name: 'Classic White & Earthy Trousers Set', price: 999, compareAtPrice: 1999, images: ['/image/c5.jpg'], category: 'combo', description: 'Crisp white top paired with neutral earthy-toned bottoms.' },
  { _id: 'p6', name: 'Midnight Navy Signature Combo', price: 999, compareAtPrice: 2399, images: ['/image/c6.jpg'], category: 'combo', description: 'Deep navy shirt paired with contrasting light trousers.' },
  { _id: 'p7', name: 'Olive Safari & Chino Combo Set', price: 999, compareAtPrice: 2199, images: ['/image/c7.jpg'], category: 'combo', description: 'Rustic olive tone shirt combined with tailored stone chinos.' },
  { _id: 'p8', name: 'Breeze Linen Short-Sleeve Combo', price: 999, compareAtPrice: 1999, images: ['/image/c8.jpg'], category: 'combo', description: 'Lightweight short-sleeve resort collar shirt with matching pants.' },
  { _id: 'p9', name: 'Old Money Gurkha Combo Set', price: 999, compareAtPrice: 2599, images: ['/image/c9.jpg'], category: 'combo', description: 'Double-buckle Gurkha styled trousers matched with a linen shirt.' },
  { _id: 'p10', name: 'Sandstone Vacation Combo', price: 999, compareAtPrice: 2099, images: ['/image/c10.jpg'], category: 'combo', description: 'Warm sandstone hues in a lightweight textured fabric.' },
  { _id: 'p11', name: 'Charcoal Minimalist Combo Set', price: 999, compareAtPrice: 2399, images: ['/image/c11.jpg'], category: 'combo', description: 'Monochromatic dark charcoal aesthetic for evening events.' },
  { _id: 'p12', name: 'Striped Resort & Linen Pant Set', price: 999, compareAtPrice: 2199, images: ['/image/c12.jpg'], category: 'combo', description: 'Subtle vertical striped short-sleeve shirt with off-white trousers.' },
  { _id: 'p13', name: 'Azure Blue Coastal Combo', price: 999, compareAtPrice: 2299, images: ['/image/c13.jpg'], category: 'combo', description: 'Sky blue breathable linen top with cream cotton pants.' },
  { _id: 'p14', name: 'Heritage Knit & Trousers Set', price: 999, compareAtPrice: 2499, images: ['/image/c14.jpg'], category: 'combo', description: 'Micro-textured knit polo combined with relaxed trousers.' },
  { _id: 'p15', name: 'Terracotta Summer Linen Combo', price: 999, compareAtPrice: 2099, images: ['/image/c15.jpg'], category: 'combo', description: 'Rich earthy terracotta shirt matched with light sand trousers.' },
  { _id: 'p16', name: 'Executive Black & Beige Combo Set', price: 999, compareAtPrice: 2599, images: ['/image/c16.jpg'], category: 'combo', description: 'Tailored black linen shirt paired with classic beige trousers.' }
];

const PantCollectionPage = ({ 
  onAddToCart, 
  onProductSelect, 
  category = 'pant', 
  categoryLabel = 'The Pant',
  categoryDesc = 'Effortless sophistication in a single set, curated for the man who values heritage over trends. Experience the weight of premium fabric and our artisanal craftsmanship, delivered to your door in our signature Deep Plum box.',
  wishlist = [],
  onToggleWishlist
}) => {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  // Filter dropdown states
  const [showAvailability, setShowAvailability] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  // Filter values
  const [filterInStock, setFilterInStock] = useState(true);
  const [filterOutOfStock, setFilterOutOfStock] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Fetch products from Express backend and merge dynamically
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(FALLBACK_PRODUCTS);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Backend API connection failed, using offline fallback data:', err.message);
        setProducts(FALLBACK_PRODUCTS);
        setLoading(false);
      });
  }, []);

  // Filter logic
  const filteredProducts = products.filter((product) => {
    // Availability Filter
    if (!filterInStock && product.availability) return false;
    if (!filterOutOfStock && !product.availability) return false;

    // Price Filter
    if (minPrice !== '' && product.price < parseFloat(minPrice)) return false;
    if (maxPrice !== '' && product.price > parseFloat(maxPrice)) return false;

    return true;
  });

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(value).replace('₹', 'Rs. ');
  };

  const handleResetFilters = () => {
    setFilterInStock(true);
    setFilterOutOfStock(true);
    setMinPrice('');
    setMaxPrice('');
  };

  const getBannerImage = () => {
    if (category === 'combo') return '/image/c1.jpg';
    return '/image/c2.jpg';
  };

  return (
    <div className="bg-[#f5f5f0] min-h-screen text-[#1a1a1a] font-body pb-20">
      
      {/* Centered Collection Header */}
      <div className="py-8 bg-[#f5f5f0] text-center border-b border-[#e5e5e0]">
        <h1 className="text-[32px] sm:text-[40px] font-heading font-medium tracking-wide">
          {categoryLabel}
        </h1>
      </div>

      {/* Hero Banner Section */}
      <div className="w-full h-[350px] md:h-[450px] relative overflow-hidden bg-[#1a1a1a]">
        <img 
          src={getBannerImage()} 
          alt={`${categoryLabel} Collection Banner`} 
          className="w-full h-full object-cover object-[center_35%] opacity-90 transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {/* Card Overlay (Centered at bottom) */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/20 px-8 py-5 sm:px-12 sm:py-6 max-w-[650px] w-[90%] text-center shadow-lg">
          <p className="text-[13px] sm:text-[15px] leading-relaxed tracking-wide font-sans text-white font-light">
            {categoryDesc}
          </p>
        </div>
      </div>

      {/* Filter and Count Section (Constrained max-width to match layout) */}
      <div className="max-w-[1100px] mx-auto px-4 py-8 border-b border-[#e5e5e0] mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
          
          {/* Filters (Left Side) */}
          <div className="flex items-center space-x-6 text-[14px]">
            <span className="text-[#6b6b66] font-medium font-sans">Filter:</span>
            
            {/* Availability Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowAvailability(!showAvailability);
                  setShowPrice(false);
                }}
                className="flex items-center space-x-1 py-1 hover:text-black transition-colors focus:outline-none"
              >
                <span>Availability</span>
                <ChevronDown size={14} className={`transform transition-transform ${showAvailability ? 'rotate-180' : ''}`} />
              </button>

              {showAvailability && (
                <div className="absolute -left-[50px] sm:left-0 mt-2 w-[280px] max-w-[90vw] bg-[#f5f5f0] border border-[#e5e5e0] shadow-xl rounded-none p-4 z-30">
                  <div className="flex justify-between items-center pb-2 border-b border-[#e5e5e0] mb-3">
                    <span className="text-[12px] text-[#6b6b66]">{(filterInStock ? 1 : 0) + (filterOutOfStock ? 1 : 0)} selected</span>
                    <button 
                      onClick={() => {
                        setFilterInStock(true);
                        setFilterOutOfStock(true);
                      }}
                      className="text-[12px] underline hover:text-black"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer text-[14px]">
                      <input 
                        type="checkbox" 
                        checked={filterInStock}
                        onChange={(e) => setFilterInStock(e.target.checked)}
                        className="rounded-none border-[#1a1a1a] text-black focus:ring-0" 
                      />
                      <span>In stock</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer text-[14px]">
                      <input 
                        type="checkbox" 
                        checked={filterOutOfStock}
                        onChange={(e) => setFilterOutOfStock(e.target.checked)}
                        className="rounded-none border-[#1a1a1a] text-black focus:ring-0" 
                      />
                      <span>Out of stock</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Price Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowPrice(!showPrice);
                  setShowAvailability(false);
                }}
                className="flex items-center space-x-1 py-1 hover:text-black transition-colors focus:outline-none"
              >
                <span>Price</span>
                <ChevronDown size={14} className={`transform transition-transform ${showPrice ? 'rotate-180' : ''}`} />
              </button>

              {showPrice && (
                <div className="absolute -left-[140px] sm:-left-[80px] md:left-0 mt-2 w-[280px] max-w-[90vw] bg-[#f5f5f0] border border-[#e5e5e0] shadow-xl rounded-none p-4 z-30">
                  <div className="flex justify-between items-center pb-2 border-b border-[#e5e5e0] mb-3">
                    <span className="text-[12px] text-[#6b6b66]">The highest price is Rs. 1,999.00</span>
                    <button 
                      onClick={() => {
                        setMinPrice('');
                        setMaxPrice('');
                      }}
                      className="text-[12px] underline hover:text-black"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-[#1a1a1a] px-2 py-1 bg-transparent w-1/2">
                      <span className="text-[12px] text-[#6b6b66] mr-1">Rs.</span>
                      <input 
                        type="number" 
                        placeholder="From"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full bg-transparent border-none p-0 focus:ring-0 text-[13px]"
                      />
                    </div>
                    <div className="flex items-center border border-[#1a1a1a] px-2 py-1 bg-transparent w-1/2">
                      <span className="text-[12px] text-[#6b6b66] mr-1">Rs.</span>
                      <input 
                        type="number" 
                        placeholder="To"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full bg-transparent border-none p-0 focus:ring-0 text-[13px]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Count (Right Side) */}
          <div className="text-[14px] text-[#6b6b66] font-sans sm:ml-auto">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>

        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showAvailability || showPrice) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setShowAvailability(false);
            setShowPrice(false);
          }}
        />
      )}

      {/* Product Grid Section (Constrained max-width to match layout exactly) */}
      <div className="max-w-[1100px] mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-[18px]">
            No products found matching the filters.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 sm:gap-y-16">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group flex flex-col text-left">
                
                {/* Image Container with Hover Swap */}
                <div 
                  onClick={() => onProductSelect && onProductSelect(product)}
                  className="relative w-full aspect-[3/4] overflow-hidden mb-5 bg-[#ebd9aa]/10 border border-[#e5e5e0] cursor-pointer"
                >
                  {/* Secondary Image (Visible on Hover) */}
                  <img
                    src={product.images[1] || product.images[0]}
                    alt={`${product.name} alternate view`}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  {/* Primary Image (Fades out on Hover) */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-105"
                  />
                  
                  {/* Sale Tag or Out of Stock Tag */}
                  {product.availability === false ? (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-sans font-medium px-3.5 py-1 tracking-wider uppercase z-10">
                      Sold Out
                    </div>
                  ) : product.onSale && (
                    <div className="absolute top-3 left-3 bg-black text-white text-[11px] font-sans font-medium px-3.5 py-1 tracking-wider uppercase z-10">
                      Sale
                    </div>
                  )}

                  {/* Wishlist Heart Toggle */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist && onToggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/85 hover:bg-white text-gray-400 hover:text-red-500 shadow-sm transition-colors z-10"
                  >
                    <Heart 
                      size={13} 
                      fill={wishlist.some(item => item._id === product._id) ? "#ef4444" : "none"} 
                      className={wishlist.some(item => item._id === product._id) ? "text-red-500" : ""} 
                    />
                  </button>

                  {/* Quick View Button on Hover */}
                  {product.availability === false ? (
                    <div className="absolute inset-x-0 bottom-0 bg-red-600/90 py-3 text-center text-white text-[13px] uppercase tracking-widest font-sans font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      Out of Stock
                    </div>
                  ) : (
                    <div className="absolute inset-x-0 bottom-0 bg-black/90 py-3 text-center text-white text-[13px] uppercase tracking-widest font-sans font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      Choose options
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 
                  onClick={() => onProductSelect && onProductSelect(product)}
                  className="text-[17px] sm:text-[19px] text-[#1a1a1a] font-heading font-medium mb-1.5 hover:underline decoration-1 underline-offset-4 cursor-pointer"
                >
                  {product.name}
                </h3>

                {/* Prices */}
                <div className="flex items-center text-[15px] sm:text-[16px] text-[#1a1a1a] font-sans">
                  {product.compareAtPrice && (
                    <span className="line-through text-[#8c8c82] mr-3 font-light">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                  <span className="font-semibold text-[#1a1a1a]">
                    {formatPrice(product.price)}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>



    </div>
  );
};

export default PantCollectionPage;
