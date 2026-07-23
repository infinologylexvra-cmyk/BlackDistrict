import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../apiConfig';
import { translations } from '../utils/translations';
import { Heart, Filter, Grid, SlidersHorizontal, ArrowRight, Eye, ShoppingBag } from 'lucide-react';

const CATALOGUE_FALLBACKS = [
  {
    _id: 'cb1',
    name: 'Classic Beige Pant & Shirt Set',
    price: 999,
    compareAtPrice: 1999,
    images: ['/image/collection-shirt.png', '/image/collection-signature.webp', '/image/beige-pant-1.jpg'],
    description: 'A complete combination featuring our tailored beige trousers and a matching premium shirt.',
    sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
    onSale: true,
    availability: true,
    category: 'combo'
  },
  {
    _id: 'cb2',
    name: 'Classic White Pants & Linen Shirt Combo',
    price: 999,
    compareAtPrice: 1999,
    images: ['/image/collection-summer-edit.jpg', '/image/collection-summer-edit.jpg', '/image/white-pants-1.png'],
    description: 'A premium summer-ready set consisting of regular straight cotton white pants and a breathable linen shirt.',
    sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
    onSale: true,
    availability: true,
    category: 'combo'
  },
  {
    _id: 'cb3',
    name: 'Classic Black Pant & Evening Shirt Combo',
    price: 999,
    compareAtPrice: 1999,
    images: ['/image/midnight_silk_shirt.jpg', '/image/black-pant-2-hd.jpg'],
    description: 'An ultra HD solid drawstring black pant paired with a premium evening shirt for a complete sophisticated look.',
    sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
    onSale: true,
    availability: true,
    category: 'combo'
  },
  {
    _id: 'cb4',
    name: 'Riviera Resort Combo Set',
    price: 999,
    compareAtPrice: 4299,
    images: ['/image/riviera_combo.jpg', '/image/collection-signature.webp'],
    description: 'A premium men\'s combination set: a beige linen shirt and white trousers. Resort wear, bright Mediterranean vibe.',
    sizes: ['S / 30', 'M / 32', 'L / 34', 'XL / 36'],
    onSale: true,
    availability: true,
    category: 'combo'
  }
];

const CataloguePage = ({ onProductSelect, onNavigate, onAddToCart, wishlist = [], onToggleWishlist }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(5000);
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
    setLoading(true);
    fetch(`${API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const valid = data.filter(p => p.category !== 'footwear' && p.category !== 'watches');
          const hasCombo = valid.some(p => (p.category || '').toLowerCase().includes('combo'));
          if (!hasCombo) {
            setProducts([...valid, ...CATALOGUE_FALLBACKS]);
          } else {
            setProducts(valid);
          }
        } else {
          setProducts(CATALOGUE_FALLBACKS);
        }
      })
      .catch(err => {
        console.warn('Failed to load catalogue products from API, using fallbacks:', err);
        setProducts(CATALOGUE_FALLBACKS);
      })
      .finally(() => setLoading(false));
  }, []);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value).replace('₹', 'Rs. ');
  };

  // Filtering & Sorting
  const filteredProducts = products.filter(p => {
    const pCat = (p.category || '').toLowerCase().trim();
    const sCat = (selectedCategory || 'all').toLowerCase().trim();
    
    const matchesCat = sCat === 'all' || 
      pCat === sCat || 
      (sCat === 'combo' && (pCat.includes('combo') || pCat.includes('set') || p.name?.toLowerCase().includes('combo')));

    const matchesPrice = p.price <= priceRange;
    return matchesCat && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'low-high') return a.price - b.price;
    if (sortBy === 'high-low') return b.price - a.price;
    if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    
    // Default featured sorting: Combo > Shirt > Pant
    const order = { combo: 1, shirt: 2, pant: 3 };
    const catA = (a.category || '').toLowerCase().trim();
    const catB = (b.category || '').toLowerCase().trim();
    return (order[catA] || 99) - (order[catB] || 99);
  });

  return (
    <div className="bg-[#fcfbf7] min-h-screen text-[#1a1a1a] font-sans">
      
      {/* Editorial Catalogue Hero */}
      <section className="relative w-full h-[55vh] min-h-[420px] bg-black overflow-hidden flex items-center justify-center text-center text-white px-6">
        <img
          src="/image/hero_slide_1_1784623631603.jpg"
          alt="BlackDistrict Catalogue"
          className="absolute inset-0 w-full h-full object-cover opacity-50 filter brightness-75 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-block uppercase tracking-[0.35em] text-[#c5a880] text-[11px] font-extrabold bg-black/60 px-4 py-1.5 border border-[#c5a880]/30 backdrop-blur-md rounded-full">
            2026 OFFICIAL LOOKBOOK & CATALOGUE
          </span>
          <h1 className="text-[38px] sm:text-[56px] lg:text-[68px] leading-[1.1] font-heading font-medium tracking-tight">
            The BlackDistrict<br />Master Catalogue
          </h1>
          <div className="w-20 h-[1px] bg-[#c5a880] mx-auto my-3" />
          <p className="text-[13px] sm:text-[15px] text-white/80 font-light max-w-lg mx-auto leading-relaxed">
            Discover our complete repertoire of handcrafted linen shirts, structured Gurkha trousers, and relaxed resortwear.
          </p>
        </div>
      </section>

      {/* Catalogue Filter & Toolbar Header */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#e5e2d8] pb-6 gap-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {[
              { id: 'all', label: 'All Catalogue' },
              { id: 'combo', label: 'Curated Combos' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-5 py-2 text-[12px] uppercase font-bold tracking-widest transition-all rounded-full ${
                  selectedCategory === tab.id
                    ? 'bg-black text-white shadow-md'
                    : 'bg-[#f0eee6] text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sorting & Counter */}
          <div className="flex flex-wrap items-center gap-4 text-[12px] font-semibold text-neutral-600 w-full md:w-auto justify-between md:justify-end">
            <span className="text-neutral-500 font-normal">
              {filteredProducts.length > 0 ? (
                <>Showing <strong className="text-black">{filteredProducts.length}</strong> items</>
              ) : (
                <span className="text-neutral-400">Curated Collection</span>
              )}
            </span>

            <div className="flex items-center space-x-2">
              <SlidersHorizontal size={14} className="text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-neutral-300 rounded-md px-3 py-1.5 text-[12px] font-semibold focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-[13px] text-neutral-500 uppercase tracking-widest">Loading Catalogue...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white border border-neutral-200 rounded-2xl my-8 p-8 max-w-xl mx-auto shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c5a880]">BLACKDISTRICT SELECTION</span>
            <h3 className="text-[22px] font-heading font-medium text-neutral-900">Curated Collection Loading</h3>
            <p className="text-[13px] text-neutral-500 font-light max-w-md mx-auto leading-relaxed">
              New seasonal drops and handcrafted combinations are currently being curated for this view. Explore all items in our master catalogue.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setPriceRange(5000); }}
              className="px-8 py-3 bg-black hover:bg-neutral-800 text-white text-[11px] font-bold uppercase tracking-widest rounded-md transition-colors shadow-md"
            >
              View All Catalogue Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-10">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.some(item => item._id === product._id);

              return (
                <div
                  key={product._id}
                  className="group relative bg-white border border-[#e5e2d8] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Image Box */}
                  <div
                    onClick={() => onProductSelect && onProductSelect(product)}
                    className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-100 cursor-pointer"
                  >
                    <img
                      src={product.images && product.images[0] ? product.images[0] : '/image/collection-shirt.png'}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleWishlist) onToggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:bg-white text-neutral-800 transition-transform active:scale-90 z-10"
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart
                        size={16}
                        className={isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-600"}
                      />
                    </button>

                    {/* Badge */}
                    <span className="absolute top-3 left-3 bg-black/80 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded backdrop-blur-sm">
                      {product.category === 'shirt' ? 'Shirt' : product.category === 'pant' ? 'Trouser' : 'Combo'}
                    </span>

                    {/* Quick View Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                      <button
                        onClick={() => onProductSelect && onProductSelect(product)}
                        className="px-4 py-2 bg-white text-black text-[11px] font-bold uppercase tracking-wider rounded-md shadow-lg flex items-center space-x-1.5 hover:bg-black hover:text-white transition-colors"
                      >
                        <Eye size={14} />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-left bg-white">
                    <div>
                      <span className="text-[10px] text-[#c5a880] font-bold uppercase tracking-widest block mb-1">
                        BLACKDISTRICT SELECTION
                      </span>
                      <h3
                        onClick={() => onProductSelect && onProductSelect(product)}
                        className="text-[15px] font-heading font-medium text-neutral-900 line-clamp-1 cursor-pointer hover:underline"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[12px] text-neutral-500 line-clamp-2 mt-1 font-light leading-relaxed">
                        {product.description || 'Premium tailored garment crafted from signature materials.'}
                      </p>
                    </div>

                    {/* Price & Add to Cart Action */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <div className="text-[15px] font-bold text-black font-sans">
                          {formatPrice(product.price)}
                        </div>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <div className="text-[11px] text-neutral-400 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          if (onAddToCart) {
                            const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M';
                            onAddToCart(product, defaultSize, 1);
                          }
                        }}
                        className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-widest rounded transition-all flex items-center space-x-1.5"
                      >
                        <ShoppingBag size={13} />
                        <span>+ ADD</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* Editorial Lookbook Banner */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 max-w-xl text-left z-10">
            <span className="text-[#c5a880] text-[11px] font-bold tracking-[0.25em] uppercase block">
              EDITORIAL LOOKBOOK 2026
            </span>
            <h2 className="text-[28px] sm:text-[40px] font-heading font-medium leading-tight">
              Crafted for Men Who Lead.
            </h2>
            <p className="text-[13px] sm:text-[14px] text-neutral-300 font-light leading-relaxed">
              Explore how our linen shirts and Gurkha trousers pair together for coastal retreats, business casual settings, and evening events.
            </p>
            <button
              onClick={() => onNavigate && onNavigate('all')}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#c5a880] hover:bg-[#b0936c] text-black text-[11px] font-bold uppercase tracking-widest transition-colors rounded"
            >
              <span>Explore All Collections</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="w-full md:w-1/2 aspect-[16/9] md:aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-white/10 z-10">
            <img
              src="/image/hero_slide_2_1784623650681.jpg"
              alt="Editorial Lookbook"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default CataloguePage;
