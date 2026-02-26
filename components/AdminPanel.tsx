
import React, { useState } from 'react';
import { 
  X, LayoutDashboard, Package, ShoppingBag, Users, BarChart3, Settings, 
  Plus, Search, Filter, TrendingUp, DollarSign, Users2, Box, ArrowUpRight,
  ArrowDownRight, Upload, Save, Smartphone, Briefcase, Lock, LogIn
} from 'lucide-react';
import { products as initialProducts } from '../data/products';
import { Product, Category } from '../types';

export const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [localProducts, setLocalProducts] = useState<Product[]>(initialProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    brand: '',
    retailPrice: 0,
    wholesalePrice: 0,
    moq: 1,
    stock: 0,
    category: 'Phones',
    description: '',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    specs: {}
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock logic
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (localProducts.length + 1).toString();
    const productToAdd = { ...newProduct, id } as Product;
    setLocalProducts([productToAdd, ...localProducts]);
    setShowAddModal(false);
    // Reset form
    setNewProduct({
      name: '',
      brand: '',
      retailPrice: 0,
      wholesalePrice: 0,
      moq: 1,
      stock: 0,
      category: 'Phones',
      description: '',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
      specs: {}
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={onClose}></div>
        <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden p-10 border border-slate-100">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-indigo-600 rounded-3xl mb-4 shadow-xl shadow-indigo-200">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Admin Portal</h2>
            <p className="text-slate-500 font-medium">Secure login for Raja Enterprises</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                placeholder="admin@rajaent.com"
              />
            </div>
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-slate-50 via-slate-400 to-slate-900 text-white py-4 rounded-2xl font-black shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <LogIn className="w-5 h-5" /> Sign In to Dashboard
            </button>
          </form>
          
          <button onClick={onClose} className="mt-8 text-slate-400 font-bold text-sm w-full hover:text-slate-600 transition-colors">
            Cancel and Return
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col md:flex-row border border-white/20">
        
        {/* Sidebar */}
        <div className="w-full md:w-72 bg-slate-900 text-white p-8 flex flex-col">
          <div className="mb-12">
            <h2 className="text-2xl font-black tracking-tighter">RAJA <span className="text-indigo-400">ADMIN</span></h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">Control Center</p>
          </div>
          
          <nav className="flex-1 space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Analytics' },
              { id: 'inventory', icon: Package, label: 'Inventory' },
              { id: 'orders', icon: ShoppingBag, label: 'Orders' },
              { id: 'customers', icon: Users, label: 'Users' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon className="w-5 h-5" /> {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-white/5 space-y-2">
            <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-4 w-full px-5 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:text-red-400 transition-colors">
              <X className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-slate-50 overflow-y-auto p-8 lg:p-12 relative">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter capitalize">{activeTab} Hub</h1>
              <p className="text-slate-500 font-medium">Strategic overview for Raja Enterprises.</p>
            </div>
            <button onClick={onClose} className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {activeTab === 'dashboard' ? (
            <div className="space-y-10 animate-in fade-in duration-500">
              {/* Stat Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Revenue', value: '₹84,20,000', change: '+12.5%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Active Retailers', value: '1,284', change: '+4.2%', icon: Users2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                  { label: 'Orders (MTD)', value: '452', change: '+18.1%', icon: Box, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Stock Value', value: '₹2.4Cr', change: '-2.1%', icon: Package, color: 'text-rose-600', bg: 'bg-rose-50' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-black flex items-center gap-1 ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stat.change} {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      </span>
                    </div>
                    <div>
                      <p className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{stat.value}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Visual (CSS Placeholder) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Revenue Trends (₹)</h3>
                    <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-end gap-3 px-4">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <div key={i} className="flex-1 bg-indigo-50 rounded-t-xl relative group cursor-pointer hover:bg-indigo-100 transition-colors" style={{ height: `${h}%` }}>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold whitespace-nowrap">
                          ₹{h * 12000}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6 px-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                      <span key={d} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Category Mix</h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Phones', perc: 45, color: 'bg-indigo-500' },
                      { label: 'Audio', perc: 30, color: 'bg-indigo-400' },
                      { label: 'Accessories', perc: 15, color: 'bg-indigo-300' },
                      { label: 'Wearables', perc: 10, color: 'bg-indigo-200' },
                    ].map((cat, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span className="text-slate-600">{cat.label}</span>
                          <span className="text-slate-900">{cat.perc}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.perc}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                    <div className="flex items-center gap-3 text-indigo-600 mb-2">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-bold text-sm">Growth Alert</span>
                    </div>
                    <p className="text-xs text-indigo-900 font-medium leading-relaxed">
                      "Phones" segment grew by 15% this week. Consider stocking more iPhone 15 units.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'inventory' ? (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search products..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                >
                  <Plus className="w-5 h-5" /> Add Product
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Product Info</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Pricing Strategy (₹)</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Stock Health</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {localProducts.map(product => (
                      <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100">
                              <img src={product.image} className="w-full h-full object-cover bg-slate-100" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-lg leading-none mb-2 tracking-tight">{product.name}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.brand}</span>
                                <span className="text-slate-200">•</span>
                                <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">{product.category}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="space-y-1">
                            <div className="flex justify-between items-center gap-4 max-w-[160px]">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Retail:</span>
                              <span className="text-sm font-black text-slate-900">₹{product.retailPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center gap-4 max-w-[160px]">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Wholesale:</span>
                              <span className="text-sm font-black text-indigo-600">₹{product.wholesalePrice.toLocaleString()}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-end">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Available Units</span>
                              <span className="text-sm font-bold text-slate-900">{product.stock}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${product.stock > 50 ? 'bg-emerald-500' : product.stock > 10 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="px-5 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                            Edit Entry
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-slate-300">
              <BarChart3 className="w-20 h-20 mb-6 opacity-5" />
              <p className="font-bold tracking-widest uppercase text-xs">Section Coming Soon</p>
            </div>
          )}

          {/* Add Product Modal */}
          {showAddModal && (
            <div className="absolute inset-0 z-[140] flex items-center justify-center p-8 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
                <div className="p-10 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">New Product</h2>
                    <p className="text-slate-500 font-medium">Add to Raja Enterprises digital catalog</p>
                  </div>
                  <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
                
                <form onSubmit={handleAddProduct} className="p-10 flex-1 overflow-y-auto space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Product Name</label>
                      <input 
                        type="text" required 
                        value={newProduct.name}
                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                        placeholder="e.g. Pixel 9 Pro"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Brand</label>
                      <input 
                        type="text" required 
                        value={newProduct.brand}
                        onChange={e => setNewProduct({...newProduct, brand: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                        placeholder="e.g. Google"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Retail Price (₹)</label>
                      <input 
                        type="number" required 
                        value={newProduct.retailPrice}
                        onChange={e => setNewProduct({...newProduct, retailPrice: parseFloat(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Wholesale Price (₹)</label>
                      <input 
                        type="number" required 
                        value={newProduct.wholesalePrice}
                        onChange={e => setNewProduct({...newProduct, wholesalePrice: parseFloat(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Initial Stock Level</label>
                      <input 
                        type="number" required 
                        value={newProduct.stock}
                        onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Category</label>
                      <select 
                        value={newProduct.category}
                        onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                      >
                        <option value="Phones">Phones</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Audio">Audio</option>
                        <option value="Wearables">Wearables</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Description</label>
                    <textarea 
                      required 
                      value={newProduct.description}
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium h-24 resize-none"
                    ></textarea>
                  </div>
                  <div className="pt-4 flex gap-4">
                    <button 
                      type="submit"
                      className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" /> Publish to Store
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-8 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
                    >
                      Discard
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
