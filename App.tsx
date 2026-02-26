
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { AIChatBot } from './components/AIChatBot';
import { B2BDashboard } from './components/B2BDashboard';
import { AdminPanel } from './components/AdminPanel';
import { ProfilePage } from './components/ProfilePage';
import { Checkout } from './components/Checkout';
import { PaymentSuccess } from './components/PaymentSuccess';
import { TrackOrder } from './components/TrackOrder';
import { ProductDetail } from './components/ProductDetail';
import { products } from './data/products';
import { Product, CartItem, UserMode } from './types';
import { ArrowRight, ChevronRight, X, Smartphone, ShieldCheck, Zap, Globe, MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [userMode, setUserMode] = useState<UserMode>('retail');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);

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
    setCart([]);
  }, [userMode]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
        userMode={userMode}
        onToggleMode={() => setUserMode(userMode === 'retail' ? 'wholesale' : 'retail')}
        onDashboardClick={() => setIsDashboardOpen(true)}
        onAdminClick={() => setIsAdminPanelOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left z-10">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 transition-colors ${userMode === 'wholesale' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
              <Zap className="w-3 h-3" /> {userMode === 'wholesale' ? 'Bulk Inventory Access Live' : 'Premium Retail Collection'}
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
              {userMode === 'wholesale' ? 'Power Your' : 'Your Vision,'} <br />
              <span className="gradient-text italic">{userMode === 'wholesale' ? 'Inventory' : 'Your Voice'}</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {userMode === 'wholesale' 
                ? 'Join 500+ retailers sourcing the highest quality mobile products at unbeatable bulk rates from Raja Enterprises.' 
                : 'Experience mobile technology like never before. From the latest flagships to bespoke accessories, Raja Enterprises is your digital partner.'}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
              <button className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-3 tracking-tight">
                {userMode === 'wholesale' ? 'Order Bulk Stock' : 'Explore Store'} <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-3xl font-black hover:bg-slate-50 transition-all tracking-tight">
                {userMode === 'wholesale' ? 'GST Invoice Sample' : 'Best Sellers'}
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-200/40 rounded-full blur-3xl -z-10"></div>
            <div className="relative group">
               <img 
                src={userMode === 'wholesale' ? "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=1000" : "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=1000"} 
                alt="Product Showcase" 
                className="w-full max-w-lg mx-auto rounded-[3rem] shadow-2xl shadow-indigo-500/20 transform -rotate-2 group-hover:rotate-0 transition-all duration-700 ease-out"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden sm:block animate-bounce-slow">
                <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">Stock Level</p>
                <p className="text-2xl font-black text-slate-900 leading-none">99.8% Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Official Warranty", desc: "12-24 Months Coverage" },
            { icon: Globe, title: "Pan-India Reach", desc: "48-Hour Delivery" },
            { icon: Smartphone, title: "Tech Assistance", desc: "Expert On-call Support" },
            { icon: Zap, title: "Instant Logistics", desc: "Real-time Tracking" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200/50 hover:border-indigo-300 transition-all group">
              <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 mb-6 w-fit group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="font-black text-xl text-slate-900 mb-2 tracking-tight">{item.title}</h4>
              <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Feed */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">
              {userMode === 'wholesale' ? 'Wholesale Inventory' : 'Featured Products'}
            </h2>
            <p className="text-slate-500 font-medium max-w-md">
              {userMode === 'wholesale' ? 'Stock your store with our premium selection. Wholesale prices applied automatically.' : 'The latest and greatest in mobile technology, handpicked for you.'}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-2xl">
            {['All', 'Phones', 'Accessories', 'Audio'].map(cat => (
              <button key={cat} className="px-5 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all">{cat}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          {products.map(product => (
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
      </section>

      {/* WhatsApp Support Button - Floating Left */}
      <a 
        href="https://wa.me/91XXXXXXXXXX" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-emerald-500 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform group flex items-center justify-center border-4 border-white"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute left-full ml-4 bg-white text-slate-900 px-4 py-2 rounded-2xl text-xs font-black shadow-2xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest">
          Order on WhatsApp
        </span>
      </a>

      <AIChatBot mode={userMode} />

      {isDashboardOpen && <B2BDashboard onClose={() => setIsDashboardOpen(false)} />}
      
      {isAdminPanelOpen && <AdminPanel onClose={() => setIsAdminPanelOpen(false)} />}
      
      {isProfileOpen && (
        <ProfilePage 
          onClose={() => setIsProfileOpen(false)} 
          userMode={userMode} 
          wishlist={wishlist}
          products={products}
          onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart}
        />
      )}

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

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          userMode={userMode} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={(p) => { addToCart(p); setSelectedProduct(null); }}
          onToggleWishlist={toggleWishlist}
          isInWishlist={wishlist.includes(selectedProduct.id)}
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

      {/* Modern Footer */}
      <footer className="bg-slate-900 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-indigo-600 rounded-xl">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter">RAJA <span className="text-indigo-400">ENTERPRISES</span></span>
            </div>
            <p className="text-slate-400 text-xl font-medium max-w-lg mb-12">
              The premier destination for mobile excellence. Bridging the gap between cutting-edge technology and business growth.
            </p>
            <div className="flex gap-4">
              {['FB', 'IG', 'LI', 'TW'].map(social => (
                <div key={social} className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center font-black text-xs cursor-pointer transition-all">{social}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8">Navigation</h4>
            <ul className="space-y-4 text-lg font-bold">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Retail Store</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Wholesale Portal</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">B2B Dashboard</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Support Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-6 font-medium">Be the first to know about upcoming bulk stock drops and tech events.</p>
            <div className="space-y-4">
              <input type="email" placeholder="Email address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all">Subscribe Now</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center border-t border-white/5 pt-16">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">© 2024 Raja Enterprises Hub. Design & Strategy by World Class Engineering.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
