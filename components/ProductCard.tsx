
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
    <div 
      onClick={() => onViewDetails(product)}
      className="bg-white rounded-3xl p-3 flex flex-col h-full cursor-pointer group shadow-sm border border-slate-100 hover:shadow-md transition-all"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-50 mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full shadow-sm transition-all active:scale-90 ${isInWishlist ? 'bg-rose-500 text-white' : 'bg-white/80 backdrop-blur text-slate-400'}`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex-1 flex flex-col px-1">
        <h3 className="text-slate-900 font-bold text-sm mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-slate-400 text-[10px] font-medium line-clamp-2 mb-3 leading-tight">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <p className="text-slate-900 font-black text-sm">₹{price.toLocaleString()}</p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 active:scale-90 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
