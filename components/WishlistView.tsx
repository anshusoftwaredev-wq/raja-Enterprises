
import React from 'react';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Product, UserMode } from '../types';

interface WishlistViewProps {
  wishlist: string[];
  products: Product[];
  userMode: UserMode;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (p: Product) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({ 
  wishlist, 
  products, 
  userMode, 
  onToggleWishlist, 
  onAddToCart 
}) => {
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-white pt-20 pb-32 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Wishlist</h1>
        <p className="text-slate-500 font-medium text-sm mt-1">Items you've saved for later</p>
      </header>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-slate-200" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Your wishlist is empty</h3>
          <p className="text-slate-500 text-sm max-w-[240px] mb-8">Start adding items you love to your wishlist to see them here.</p>
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100">
            Explore Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {wishlistProducts.map((item) => (
            <div key={item.id} className="bg-white border border-slate-100 rounded-[2rem] p-4 flex gap-4 shadow-sm">
              <div className="w-28 h-28 bg-slate-50 rounded-2xl overflow-hidden shrink-0">
                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">{item.brand}</span>
                    <button 
                      onClick={() => onToggleWishlist(item.id)}
                      className="text-rose-500 p-1"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                  <h4 className="text-lg font-black text-slate-900 tracking-tight line-clamp-1">{item.name}</h4>
                  <p className="text-lg font-black text-slate-900 mt-1">₹{(userMode === 'wholesale' ? item.wholesalePrice : item.retailPrice).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => onAddToCart(item)}
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
