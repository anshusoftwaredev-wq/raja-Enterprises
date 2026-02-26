
import React from 'react';
import { 
  X, ShoppingBag, ShieldCheck, Truck, RefreshCw, 
  Cpu, Smartphone, Camera, Battery, Star, 
  ChevronRight, BadgePercent, Building2, Heart
} from 'lucide-react';
import { Product, UserMode } from '../types';

interface ProductDetailProps {
  product: Product;
  userMode: UserMode;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  isInWishlist: boolean;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  userMode, 
  onClose, 
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}) => {
  const isWholesale = userMode === 'wholesale';
  const price = isWholesale ? product.wholesalePrice : product.retailPrice;

  const specIcons: Record<string, any> = {
    'Processor': Cpu,
    'Display': Smartphone,
    'Camera': Camera,
    'Battery': Battery,
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-[2.5rem] lg:rounded-[4rem] shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row border border-white/20 animate-in slide-in-from-bottom-8 duration-500">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 lg:top-10 lg:right-10 p-3 bg-white/80 backdrop-blur shadow-xl rounded-full hover:bg-white transition-all z-20 group"
        >
          <X className="w-6 h-6 text-slate-900 group-hover:rotate-90 transition-transform" />
        </button>

        {/* Left: Image Gallery (Simplified) */}
        <div className="w-full lg:w-1/2 bg-slate-50 flex flex-col items-center justify-center p-8 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent opacity-60"></div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full max-w-md object-contain z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] transform transition-transform hover:scale-105 duration-700"
          />
          
          <div className="mt-12 flex gap-4 z-10">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
            ))}
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px] bg-indigo-50 px-3 py-1 rounded-full">
                {product.brand} • Official Stock
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-black text-slate-900">4.9</span>
                <span className="text-xs font-bold text-slate-400">(1.2k Reviews)</span>
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-4">
              {product.name}
            </h2>
            
            <p className="text-slate-500 font-medium leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          {/* Key Features Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {Object.entries(product.specs).slice(0, 4).map(([key, val]) => {
              const Icon = specIcons[key] || Smartphone;
              return (
                <div key={key} className="bg-slate-50 p-4 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                  <Icon className="w-5 h-5 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{key}</p>
                  <p className="text-xs font-bold text-slate-900 truncate">{val}</p>
                </div>
              );
            })}
          </div>

          {/* Trust Badges */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 p-4 rounded-3xl border-2 border-dashed border-slate-100">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">12-Month Raja Warranty</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Original Indian Invoices provided</p>
              </div>
            </div>
            {isWholesale && (
              <div className="flex items-center gap-4 p-4 rounded-3xl bg-indigo-50 border border-indigo-100">
                <div className="p-2 bg-white text-indigo-600 rounded-xl">
                  <BadgePercent className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-indigo-900">Wholesale Benefit</p>
                  <p className="text-[10px] font-bold text-indigo-400 uppercase">Saving ₹{(product.retailPrice - product.wholesalePrice).toLocaleString()} per unit</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Pricing & CTA */}
          <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1">
                {isWholesale ? <Building2 className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                {isWholesale ? 'B2B Exclusive Price' : 'Current Best Value'}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">₹{price.toLocaleString()}</span>
                <span className="text-xs font-bold text-slate-400 line-through">₹{(price * 1.15).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex gap-4 w-full sm:w-auto">
              <button 
                onClick={() => onToggleWishlist(product.id)}
                className={`p-5 rounded-[2rem] border-2 transition-all active:scale-95 ${isInWishlist ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-white border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100'}`}
              >
                <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
              
              <button 
                onClick={() => onAddToCart(product)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 active:scale-95 group"
              >
                <ShoppingBag className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                {isWholesale ? `Order Bulk (Min. ${product.moq})` : 'Secure This Device'}
              </button>
            </div>
          </div>
          
          {/* Shipping Info */}
          <div className="mt-6 flex items-center justify-center sm:justify-start gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2"><Truck className="w-3 h-3" /> Same Day Dispatch</div>
            <div className="flex items-center gap-2"><RefreshCw className="w-3 h-3" /> 7 Day Replacement</div>
          </div>
        </div>
      </div>
    </div>
  );
};
