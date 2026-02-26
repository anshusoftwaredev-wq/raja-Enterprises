
import React from 'react';
import { Product, UserMode } from '../types';
import { Plus, Info, Layers, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  userMode: UserMode;
  onAddToCart: (p: Product) => void;
  onViewDetails: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  isInWishlist: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  userMode, 
  onAddToCart, 
  onViewDetails,
  onToggleWishlist,
  isInWishlist
}) => {
  const isWholesale = userMode === 'wholesale';
  const price = isWholesale ? product.wholesalePrice : product.retailPrice;

  return (
    <div className="group bg-white rounded-[2rem] border border-slate-100 p-5 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 relative flex flex-col h-full">
      {product.isNew && (
        <span className="absolute top-5 left-5 z-10 bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-indigo-600/20">
          New Drop
        </span>
      )}
      
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-50 mb-5">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <button 
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-4 right-4 z-10 p-3 rounded-2xl shadow-xl transition-all active:scale-95 ${isInWishlist ? 'bg-rose-500 text-white' : 'bg-white/80 backdrop-blur-sm text-slate-400 hover:text-rose-500'}`}
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
        <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 gap-3">
          <button 
            onClick={() => onViewDetails(product)}
            className="p-4 bg-white text-slate-900 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl"
          >
            <Info className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onAddToCart(product)}
            className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-xl delay-75"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{product.brand}</span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
            <Layers className="w-3 h-3" /> {product.stock} in stock
          </span>
        </div>
        <h3 className="text-slate-900 font-bold text-xl mb-3 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{isWholesale ? 'Wholesale Rate' : 'Price'}</p>
            <p className="text-slate-900 font-black text-2xl tracking-tighter">₹{price.toLocaleString()}</p>
          </div>
          {isWholesale && (
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Min. Order</p>
              <p className="text-indigo-600 font-bold">{product.moq} Units</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
