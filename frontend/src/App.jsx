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
    { name: 'pant', label: 'Pants' },
    { name: 'shirt', label: 'Shirts' }
  ]);

  const loadCategories = () => {
    fetch(`${API_BASE_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const filtered = data.filter(cat => cat.name !== 'footwear' && cat.name !== 'watches' && cat.name !== 'combo');
          setCategories(filtered);
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
        {categories.map(cat => (
          currentPage === cat.name && (
            <PantCollectionPage 
              key={cat.name}
              category={cat.name}
              categoryLabel={cat.label}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              categoryDesc={cat.name === 'shirt' 
                ? 'Timeless shirts hand-tailored from premium materials. Experience the perfect drape, breathable linen weave, and artisanal craftsmanship built for the modern legend.'
                : cat.name === 'combo' 
                ? 'Pre-curated combination sets matching our premium linens together. Perfectly paired and ready to make a statement.'
                : undefined
              }
              onAddToCart={handleAddToCart} 
              onProductSelect={(prod) => {
                setSelectedProduct(prod);
                setCurrentPage('description');
                window.history.pushState({}, '', `/products/${prod._id}`);
              }}
            />
          )
        ))}
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
    </div>
  );
}

export default App;
