
import React from 'react';
import { 
  User, Mail, Phone, MapPin, Package, Heart, Settings, 
  LogOut, ChevronRight, Shield, CreditCard, Bell, X
} from 'lucide-react';

import { Product } from '../types';

interface ProfilePageProps {
  onClose: () => void;
  userMode: 'retail' | 'wholesale';
  wishlist: string[];
  products: Product[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (p: Product) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ 
  onClose, 
  userMode, 
  wishlist, 
  products,
  onToggleWishlist,
  onAddToCart
}) => {
  const [activeSection, setActiveSection] = React.useState('personal');

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row border border-white/20 animate-slide-up">
        
        {/* Sidebar */}
        <div className="w-full md:w-80 bg-slate-50 border-r border-slate-100 p-10 flex flex-col">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-[2.3rem] bg-white flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl border-4 border-white shadow-lg">
                <Shield className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Anshu Software</h2>
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mt-1">{userMode} Account</p>
          </div>

          <nav className="flex-1 space-y-2">
            {[
              { id: 'personal', icon: User, label: 'Personal Info' },
              { id: 'orders', icon: Package, label: 'My Orders' },
              { id: 'wishlist', icon: Heart, label: 'Wishlist' },
              { id: 'payments', icon: CreditCard, label: 'Payments' },
              { id: 'notifications', icon: Bell, label: 'Notifications' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item, i) => (
              <button 
                key={i}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center justify-between w-full px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeSection === item.id ? 'bg-white shadow-xl shadow-slate-200/50 text-slate-900 border border-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-indigo-600' : ''}`} />
                  {item.label}
                </div>
                <ChevronRight className={`w-4 h-4 ${activeSection === item.id ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </nav>

          <button className="mt-10 flex items-center gap-4 px-6 py-4 text-rose-500 font-bold text-sm hover:bg-rose-50 rounded-2xl transition-all">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white overflow-y-auto p-12 relative">
          <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>

          <div className="max-w-3xl">
            <header className="mb-12">
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
                {activeSection === 'personal' ? 'Profile Settings' : 
                 activeSection === 'orders' ? 'Order History' : 
                 activeSection === 'wishlist' ? 'My Wishlist' : 'Settings'}
              </h1>
              <p className="text-slate-500 font-medium">
                {activeSection === 'personal' ? 'Manage your personal information and account security.' : 
                 activeSection === 'orders' ? 'Track and manage your recent purchases.' : 
                 activeSection === 'wishlist' ? 'Your saved items for future purchases.' : 'Manage your account preferences.'}
              </p>
            </header>

            <div className="space-y-10">
              {activeSection === 'personal' && (
                <>
                  <section>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Full Name</label>
                        <div className="flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <User className="w-5 h-5 text-slate-400" />
                          <span className="font-bold text-slate-900">Anshu Software</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Email Address</label>
                        <div className="flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <Mail className="w-5 h-5 text-slate-400" />
                          <span className="font-bold text-slate-900">anshu.dev@gmail.com</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Phone Number</label>
                        <div className="flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <Phone className="w-5 h-5 text-slate-400" />
                          <span className="font-bold text-slate-900">+91 98765 43210</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Location</label>
                        <div className="flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <MapPin className="w-5 h-5 text-slate-400" />
                          <span className="font-bold text-slate-900">Mumbai, India</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Account Security</h3>
                    <div className="bg-indigo-50 border border-indigo-100 rounded-[2rem] p-8 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-white rounded-2xl shadow-sm">
                          <Shield className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 tracking-tight">Two-Factor Authentication</h4>
                          <p className="text-sm text-slate-500 font-medium">Add an extra layer of security to your account.</p>
                        </div>
                      </div>
                      <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
                        Enable
                      </button>
                    </div>
                  </section>
                </>
              )}

              {activeSection === 'orders' && (
                <div className="space-y-6">
                  {[
                    { id: 'RE-X92831', date: 'Feb 24, 2024', status: 'Delivered', total: '₹84,999', items: 1 },
                    { id: 'RE-B10293', date: 'Feb 18, 2024', status: 'Shipped', total: '₹1,24,500', items: 3 },
                    { id: 'RE-K88271', date: 'Jan 12, 2024', status: 'Delivered', total: '₹12,499', items: 1 }
                  ].map((order) => (
                    <div key={order.id} className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 flex flex-wrap items-center justify-between gap-6 group hover:border-indigo-200 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <Package className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order {order.id}</p>
                          <h4 className="text-xl font-black text-slate-900 tracking-tight">{order.total}</h4>
                          <p className="text-sm text-slate-500 font-medium">{order.items} items • {order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
                          {order.status}
                        </span>
                        <button className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-100 transition-colors">
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'wishlist' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlistProducts.length === 0 ? (
                    <div className="col-span-full py-20 text-center">
                      <Heart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-400 font-bold">Your wishlist is empty.</p>
                    </div>
                  ) : (
                    wishlistProducts.map((item) => (
                      <div key={item.id} className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-6 group hover:border-indigo-200 transition-all">
                        <div className="relative aspect-square rounded-3xl overflow-hidden mb-6 bg-white border border-slate-100">
                          <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <button 
                            onClick={() => onToggleWishlist(item.id)}
                            className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                          >
                            <Heart className="w-5 h-5 fill-current" />
                          </button>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.brand}</p>
                        <h4 className="text-xl font-black text-slate-900 tracking-tight mb-4">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-black text-indigo-600">₹{(userMode === 'wholesale' ? item.wholesalePrice : item.retailPrice).toLocaleString()}</span>
                          <button 
                            onClick={() => onAddToCart(item)}
                            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all"
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeSection === 'personal' && (
                <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
                  <button className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all">
                    Cancel Changes
                  </button>
                  <button className="px-10 py-4 bg-gradient-to-r from-slate-50 via-slate-400 to-slate-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all">
                    Save Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
