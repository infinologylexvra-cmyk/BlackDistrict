import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HomePageInfo from './components/HomePageInfo';
import PantCollectionPage from './components/PantCollectionPage';
import ShirtCollectionPage from './components/ShirtCollectionPage';
import AllCollectionsPage from './components/AllCollectionsPage';
import CataloguePage from './components/CataloguePage';
import ProductDescriptionPage from './components/ProductDescriptionPage';
import CheckoutPage from './components/CheckoutPage';
import SearchResultsPage from './components/SearchResultsPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import HomeFeatures from './components/HomeFeatures';
import HomeCategories from './components/HomeCategories';
import HomeSplitBanner from './components/HomeSplitBanner';
import StyleJournal from './components/StyleJournal';
import Testimonials from './components/Testimonials';
import LimitedDropBar from './components/LimitedDropBar';
import Newsletter from './components/Newsletter';
import ProductGrid from './components/ProductGrid';
import NotFoundPage from './components/NotFoundPage';
import HelpSupportPage from './components/HelpSupportPage';
import TrackOrderPage from './components/TrackOrderPage';
import ReturnsExchangesPage from './components/ReturnsExchangesPage';
import ShippingPolicyPage from './components/ShippingPolicyPage';
import FaqPage from './components/FaqPage';
import MyOrdersPage from './components/MyOrdersPage';
import { API_BASE_URL } from './apiConfig';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Hoisted Customer Login / Registration state variables
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('user') ? true : false
  );
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );

  // Dynamic store logo settings
  const [storeLogo, setStoreLogo] = useState('');
  const [categories, setCategories] = useState([
    { id: 'cat1', name: 'combo', label: 'CURATED COMBOS' }
  ]);

  const loadCategories = () => {
    fetch(`${API_BASE_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const filtered = data.filter(cat => cat.name !== 'footwear' && cat.name !== 'watches');
          if (filtered.length > 0) setCategories(filtered);
        }
      })
      .catch(err => console.error("Error loading categories:", err));
  };

  // Global Wishlist State (Dynamic & persistent)
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch {
      return [];
    }
  });

  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some(item => item._id === product._id);
      let updated;
      if (exists) {
        updated = prev.filter(item => item._id !== product._id);
      } else {
        updated = [...prev, product];
      }
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveFromWishlist = (product) => {
    setWishlist((prev) => {
      const updated = prev.filter(item => item._id !== product._id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const loadSettings = () => {
    fetch(`${API_BASE_URL}/api/settings`)
      .then(res => res.json())
      .then(data => {
        if (data && data.storeLogo) {
          setStoreLogo(data.storeLogo);
        }
      })
      .catch(err => console.error("Error loading store logo:", err));
  };

  useEffect(() => {
    loadSettings();
    loadCategories();
    window.addEventListener('settingsChange', loadSettings);
    window.addEventListener('categoriesChange', loadCategories);
    return () => {
      window.removeEventListener('settingsChange', loadSettings);
      window.removeEventListener('categoriesChange', loadCategories);
    };
  }, []);

  // Open KwikPass auth modal trigger from window event listeners
  useEffect(() => {
    const handleOpenAuth = () => setIsAuthOpen(true);
    window.addEventListener('openAuthModal', handleOpenAuth);
    return () => window.removeEventListener('openAuthModal', handleOpenAuth);
  }, []);
  
  // Dynamic product detail & search states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state with path on load & popstate (handles browser navigation and direct URLs)
  useEffect(() => {
    const syncRoute = () => {
      const rawPath = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';

      if (rawPath === '/' || rawPath === '' || rawPath === '/index.html') {
        setCurrentPage('home');
      } else if (rawPath === '/shirt' || rawPath === '/shirts' || rawPath === '/collections/shirt' || rawPath === '/collections/shirts') {
        setCurrentPage('shirt');
      } else if (rawPath === '/pant' || rawPath === '/pants' || rawPath === '/pantts' || rawPath === '/collections/pant' || rawPath === '/collections/pants' || rawPath === '/collections/pantts') {
        setCurrentPage('pant');
      } else if (rawPath === '/combo' || rawPath === '/combos' || rawPath === '/collections/combo' || rawPath === '/collections/combos') {
        setCurrentPage('combo');
      } else if (rawPath === '/collections' || rawPath === '/collections/all' || rawPath === '/all') {
        setCurrentPage('collections');
      } else if (rawPath === '/catalogue' || rawPath === '/catalog') {
        setCurrentPage('catalogue');
      } else if (rawPath === '/pages/contact' || rawPath === '/contact') {
        setCurrentPage('contact');
      } else if (rawPath === '/help') {
        setCurrentPage('help');
      } else if (rawPath === '/track-order') {
        setCurrentPage('track-order');
      } else if (rawPath === '/returns') {
        setCurrentPage('returns');
      } else if (rawPath === '/shipping') {
        setCurrentPage('shipping');
      } else if (rawPath === '/faq') {
        setCurrentPage('faq');
      } else if (rawPath === '/my-orders') {
        setCurrentPage('my-orders');
      } else if (rawPath === '/admin') {
        setCurrentPage('admin');
      } else if (rawPath === '/checkout') {
        setCurrentPage('checkout');
      } else if (rawPath.startsWith('/products/')) {
        const prodId = rawPath.replace('/products/', '');
        if (prodId) {
          fetch(`${API_BASE_URL}/api/products/${prodId}`)
            .then(res => res.json())
            .then(prod => {
              if (prod && prod._id) {
                setSelectedProduct(prod);
                setCurrentPage('description');
              } else {
                setCurrentPage('notfound');
              }
            })
            .catch(() => setCurrentPage('notfound'));
        } else {
          setCurrentPage('notfound');
        }
      } else {
        setCurrentPage('notfound');
      }
    };

    syncRoute();
    window.addEventListener('popstate', syncRoute);

    const handleCustomNavigate = (e) => {
      const path = e.detail;
      setCurrentPage(path);
      window.history.pushState({}, '', `/${path}`);
    };
    window.addEventListener('navigate', handleCustomNavigate);

    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('navigate', handleCustomNavigate);
    };
  }, []);

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  // Cart operations
  const handleAddToCart = (product, size, quantity) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) => item._id === product._id && item.size === size
      );
      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { ...product, size, quantity }];
      }
    });
    setIsCartOpen(true); // Auto-open cart drawer on item addition for premium feel
  };

  const handleRemoveFromCart = (productId, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item._id === productId && item.size === size))
    );
  };

  const handleUpdateQuantity = (productId, size, newQty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleBuyNow = (product, size, quantity) => {
    // Add to cart first so they checkout with this item
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) => item._id === product._id && item.size === size
      );
      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { ...product, size, quantity }];
      }
    });
    // Redirect straight to checkout page
    setCurrentPage('checkout');
  };

  const handleCollectionsNavigation = (path) => {
    if (path === 'pant') {
      setCurrentPage('pant');
      window.history.pushState({}, '', '/collections/pantts');
    } else if (path === 'shirt') {
      setCurrentPage('shirt');
      window.history.pushState({}, '', '/collections/shirts');
    } else if (path === 'home') {
      setCurrentPage('home');
      window.history.pushState({}, '', '/');
    } else if (path === 'collections' || path === 'all' || path === 'clothing') {
      setCurrentPage('collections');
      window.history.pushState({}, '', '/collections');
    } else {
      // Default fallback for other mock collections to featured home page
      setCurrentPage('home');
      window.history.pushState({}, '', `/collections/${path}`);
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f5f5f0]">
      {currentPage !== 'admin' && (
        <Header 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          cartCount={cartCount}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          isAuthOpen={isAuthOpen}
          setIsAuthOpen={setIsAuthOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCheckout={() => {
            setIsCartOpen(false);
            setCurrentPage('checkout');
          }}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          storeLogo={storeLogo}
          categories={categories}
          wishlist={wishlist}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onAddToCart={handleAddToCart}
        />
      )}
      
      <main className="flex-grow">
        {(currentPage === 'combo' || currentPage === 'shirt' || currentPage === 'pant') && (
          <PantCollectionPage 
            category={currentPage}
            categoryLabel={currentPage === 'combo' ? 'CURATED COMBOS' : currentPage.toUpperCase()}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            categoryDesc="Pre-curated combination sets matching our premium linens together. Perfectly paired and ready to make a statement."
            onAddToCart={handleAddToCart} 
            onProductSelect={(prod) => {
              setSelectedProduct(prod);
              setCurrentPage('description');
              window.history.pushState({}, '', `/products/${prod._id}`);
            }}
          />
        )}
        {(currentPage === 'collections' || currentPage === 'all') && (
          <AllCollectionsPage onNavigate={handleCollectionsNavigation} />
        )}
        {currentPage === 'catalogue' && (
          <CataloguePage 
            onProductSelect={(prod) => {
              setSelectedProduct(prod);
              setCurrentPage('description');
              window.history.pushState({}, '', `/products/${prod._id}`);
            }}
            onNavigate={handleCollectionsNavigation}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}
        {currentPage === 'description' && (
          <ProductDescriptionPage 
            product={selectedProduct}
            onBack={() => {
              // Return to previous view category
              if (selectedProduct && selectedProduct.category === 'shirt') {
                setCurrentPage('shirt');
              } else {
                setCurrentPage('pant');
              }
              window.history.pushState({}, '', '/');
            }}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        )}
        {currentPage === 'checkout' && (
          <div className="relative">
            {/* Background page details */}
            <ProductDescriptionPage 
              product={selectedProduct}
              onBack={() => {}}
              onAddToCart={() => {}}
              onBuyNow={() => {}}
            />
            {/* Centered overlay checkout drawer */}
            <CheckoutPage 
              cartItems={cartItems}
              onBack={() => {
                if (selectedProduct) {
                  setCurrentPage('description');
                } else {
                  setCurrentPage('pant');
                }
              }}
              onClearCart={() => setCartItems([])}
              isLoggedIn={isLoggedIn}
              storeLogo={storeLogo}
            />
          </div>
        )}
        {currentPage === 'search' && (
          <SearchResultsPage 
            searchQuery={searchQuery}
            onBack={() => {
              setCurrentPage('pant');
              setSearchQuery('');
            }}
            onProductSelect={(prod) => {
              setSelectedProduct(prod);
              setCurrentPage('description');
              window.history.pushState({}, '', `/products/${prod._id}`);
            }}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage />
        )}
        {currentPage === 'help' && (
          <HelpSupportPage />
        )}
        {currentPage === 'track-order' && (
          <TrackOrderPage />
        )}
        {currentPage === 'returns' && (
          <ReturnsExchangesPage />
        )}
        {currentPage === 'shipping' && (
          <ShippingPolicyPage />
        )}
        {currentPage === 'faq' && (
          <FaqPage />
        )}
        {currentPage === 'my-orders' && (
          <MyOrdersPage />
        )}
        {currentPage === 'admin' && (
          <AdminPanel 
            onBack={() => {
              setCurrentPage('home');
              window.history.pushState({}, '', '/');
            }} 
            categories={categories}
            loadCategories={loadCategories}
          />
        )}
        {(currentPage === 'notfound' || currentPage === '404') && (
          <NotFoundPage 
            onNavigate={(page) => {
              setCurrentPage(page);
              if (page === 'shirt') window.history.pushState({}, '', '/shirts');
              else if (page === 'pant') window.history.pushState({}, '', '/pants');
              else if (page === 'combo') window.history.pushState({}, '', '/combo');
              else if (page === 'catalogue') window.history.pushState({}, '', '/catalogue');
              else if (page === 'contact') window.history.pushState({}, '', '/pages/contact');
              else window.history.pushState({}, '', '/');
            }} 
          />
        )}
        {currentPage === 'home' && (
          <>
            <Hero />
            <HomeFeatures />
            <HomeCategories onNavigate={handleCollectionsNavigation} />
            <ProductGrid 
              onNavigate={handleCollectionsNavigation}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onProductSelect={(prod) => {
                setSelectedProduct(prod);
                setCurrentPage('description');
                window.history.pushState({}, '', `/products/${prod._id}`);
              }}
            />
            <HomeSplitBanner onNavigate={handleCollectionsNavigation} />
            <StyleJournal />
            <Testimonials />
            <LimitedDropBar onNavigate={handleCollectionsNavigation} />
            <Newsletter />
          </>
        )}
      </main>
      
      {currentPage !== 'admin' && <Footer />}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919888695199" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`fixed right-6 z-50 flex items-center group cursor-pointer animate-fade-in transition-all duration-300 ${currentPage === 'description' ? 'bottom-[90px] md:bottom-[100px]' : 'bottom-6 md:bottom-8'}`}
      >
        <div className="bg-[#1a1a1a] text-white text-[12px] font-sans px-4 py-2 rounded-full mr-3 shadow-lg pointer-events-none hidden sm:block">
          Chat with us
        </div>
        <div className="bg-[#25D366] p-3.5 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.28 5.28 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </div>
      </a>
    </div>
  );
}

export default App;
