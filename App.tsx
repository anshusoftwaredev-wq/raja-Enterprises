
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { AIChatBot } from './components/AIChatBot';
import { B2BDashboard } from './components/B2BDashboard';
import { AdminPanel } from './components/AdminPanel';
import { Checkout } from './components/Checkout';
import { PaymentSuccess } from './components/PaymentSuccess';
import { TrackOrder } from './components/TrackOrder';
import { ProductDetail } from './components/ProductDetail';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { BottomNav } from './components/BottomNav';
import { TopAppBar } from './components/TopAppBar';
import { SideDrawer } from './components/SideDrawer';
import { WishlistView } from './components/WishlistView';
import { OrdersView } from './components/OrdersView';
import { ProfileView } from './components/ProfileView';
import { products } from './data/products';
import { Product, CartItem, UserMode } from './types';
import { ChevronRight, X, Smartphone, ShieldCheck, Zap, Globe, MessageCircle, Search, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [userMode, setUserMode] = useState<UserMode>('retail');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [appState, setAppState] = useState<'splash' | 'onboarding' | 'main'>('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Items');

  const addToCart = (product: Product) => {
    const minQty = userMode === 'wholesale' ? product.moq : 1;
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + minQty } : item
        );
      }
      return [...prev, { product, quantity: minQty }];
    });
    if (userMode === 'retail') setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((acc, item) => {
    const price = userMode === 'wholesale' ? item.product.wholesalePrice : item.product.retailPrice;
    return acc + (price * item.quantity);
  }, 0);
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (appState === 'splash') {
      // Splash screen handles its own timeout
    } else if (appState === 'onboarding' && hasSeenOnboarding) {
      setAppState('main');
    }
  }, [appState]);

  useEffect(() => {
    setCart([]);
  }, [userMode]);

  if (appState === 'splash') {
    return <SplashScreen onComplete={() => {
      const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
      setAppState(hasSeenOnboarding ? 'main' : 'onboarding');
    }} />;
  }

  if (appState === 'onboarding') {
    return <Onboarding onComplete={() => {
      localStorage.setItem('hasSeenOnboarding', 'true');
      setAppState('main');
    }} />;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset modal states
    setIsDashboardOpen(false);
    setIsAdminPanelOpen(false);
    setIsCartOpen(false);
  };

  const renderHomeContent = () => {
    const filteredProducts = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Items' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="animate-in fade-in duration-700 pt-24 px-6">
        {/* Headline */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Find your <span className="text-indigo-600">perfect</span> item.
          </h1>
        </div>

        {/* Search Bar */}
        <section className="mb-10">
          <div className="bg-slate-100 rounded-2xl p-4 flex items-center gap-3 border border-slate-200/50">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm font-bold text-slate-900 w-full placeholder:text-slate-400"
            />
          </div>
        </section>

        {/* Categories */}
        <section className="mb-10">
          <h3 className="text-lg font-black text-slate-900 mb-4 tracking-tight">Categories</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {['All Items', 'Electronics', 'Clothing', 'Home', 'Beauty'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl whitespace-nowrap font-bold text-sm transition-all border ${selectedCategory === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Product Feed Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Popular Products</h2>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filteredProducts.length} items</span>
        </div>

        {/* Product Feed */}
        <section className="pb-12">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  userMode={userMode}
                  onAddToCart={addToCart}
                  onViewDetails={setSelectedProduct}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={wishlist.includes(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400 font-bold">No products found matching your criteria.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All Items'); }}
                className="mt-4 text-indigo-600 font-black text-sm uppercase tracking-widest"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 lg:pb-0">
      <SideDrawer 
        isOpen={isSideDrawerOpen}
        onClose={() => setIsSideDrawerOpen(false)}
        userMode={userMode}
        onToggleMode={() => setUserMode(userMode === 'retail' ? 'wholesale' : 'retail')}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
        onOpenB2B={() => setIsDashboardOpen(true)}
      />

      <div className="lg:hidden">
        <TopAppBar 
          userMode={userMode}
          onCartClick={() => setIsCartOpen(true)}
          onProfileClick={() => handleTabChange('profile')}
          onAdminClick={() => setIsAdminPanelOpen(true)}
          onMenuClick={() => setIsSideDrawerOpen(true)}
          cartCount={cartCount}
        />
      </div>
      
      <div className="hidden lg:block">
        <Navbar 
          cartCount={cartCount} 
          onCartClick={() => setIsCartOpen(true)} 
          userMode={userMode}
          onToggleMode={() => setUserMode(userMode === 'retail' ? 'wholesale' : 'retail')}
          onDashboardClick={() => setIsDashboardOpen(true)}
          onAdminClick={() => setIsAdminPanelOpen(true)}
          onProfileClick={() => handleTabChange('profile')}
        />
      </div>

      <main className="min-h-screen pb-32">
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            userMode={userMode} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={(p) => { addToCart(p); setSelectedProduct(null); }}
            onToggleWishlist={toggleWishlist}
            isInWishlist={wishlist.includes(selectedProduct.id)}
          />
        ) : (
          <>
            {activeTab === 'home' && renderHomeContent()}
            {activeTab === 'wishlist' && (
              <WishlistView 
                wishlist={wishlist}
                products={products}
                userMode={userMode}
                onToggleWishlist={toggleWishlist}
                onAddToCart={addToCart}
              />
            )}
            {activeTab === 'orders' && <OrdersView />}
            {activeTab === 'profile' && (
              <ProfileView 
                userMode={userMode}
                onOpenAdmin={() => setIsAdminPanelOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* WhatsApp Support Button - Floating Right */}
      <a 
        href="https://wa.me/91XXXXXXXXXX" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group flex items-center justify-center border-4 border-white active:scale-95"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-2xl text-[10px] font-black shadow-2xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest">
          WhatsApp Support
        </span>
      </a>

      {isAIOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAIOpen(false)}></div>
          <div className="relative z-10 w-full max-w-lg">
            <AIChatBot mode={userMode} />
            <button 
              onClick={() => setIsAIOpen(false)}
              className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {isDashboardOpen && <B2BDashboard onClose={() => setIsDashboardOpen(false)} />}
      
      {isAdminPanelOpen && <AdminPanel onClose={() => setIsAdminPanelOpen(false)} />}
      
      {isCheckoutOpen && (
        <Checkout 
          items={cart} 
          total={cartTotal * (userMode === 'wholesale' ? 1.18 : 1)} 
          userMode={userMode} 
          onClose={() => setIsCheckoutOpen(false)} 
          onSuccess={(orderId) => {
            setLastOrderId(orderId);
            setIsCheckoutOpen(false);
            setIsPaymentSuccessOpen(true);
            setCart([]);
          }}
        />
      )}

      {isPaymentSuccessOpen && (
        <PaymentSuccess 
          orderId={lastOrderId} 
          total={cartTotal * (userMode === 'wholesale' ? 1.18 : 1)} 
          onClose={() => setIsPaymentSuccessOpen(false)} 
          onTrack={() => {
            setIsPaymentSuccessOpen(false);
            setIsTrackOrderOpen(true);
          }}
        />
      )}

      {isTrackOrderOpen && (
        <TrackOrder 
          orderId={lastOrderId} 
          onClose={() => setIsTrackOrderOpen(false)} 
        />
      )}

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[120]">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl flex flex-col animate-slide-in">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white">
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                Your Bag <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">{cartCount} items</span>
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 text-center">
                  <Smartphone className="w-20 h-20 mb-6 opacity-10" />
                  <p className="font-bold text-slate-400">Your bag is currently empty.</p>
                  <button onClick={() => setIsCartOpen(false)} className="mt-4 text-indigo-600 font-bold text-sm underline">Start Shopping</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex gap-6 group">
                    <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                      <img src={item.product.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-black text-slate-900 text-lg tracking-tight group-hover:text-indigo-600 transition-colors leading-none">{item.product.name}</h4>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-slate-300 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{item.product.brand}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">Qty: {item.quantity}</span>
                        <span className="font-black text-slate-900 text-lg">₹{((userMode === 'wholesale' ? item.product.wholesalePrice : item.product.retailPrice) * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50">
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-900">₹{cartTotal.toLocaleString()}</span>
                </div>
                {userMode === 'wholesale' && (
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-600 uppercase tracking-widest">
                    <span>GST (Integrated)</span>
                    <span>18% Applied</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="text-slate-900 font-black text-xl tracking-tighter">Total Amount</span>
                  <span className="text-3xl font-black text-slate-900 tracking-tighter">₹{(cartTotal * (userMode === 'wholesale' ? 1.18 : 1)).toLocaleString()}</span>
                </div>
              </div>
              <button 
                disabled={cart.length === 0}
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className={`w-full py-6 rounded-[2rem] font-black text-white shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${userMode === 'wholesale' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20' : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/20'}`}
              >
                {userMode === 'wholesale' ? 'Confirm Bulk Order' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
    </div>
  );
};

export default App;
