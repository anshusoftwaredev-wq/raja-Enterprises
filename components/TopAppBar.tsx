
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { UserMode } from '../types';

interface TopAppBarProps {
  userMode: UserMode;
  onCartClick: () => void;
  onProfileClick: () => void;
  onAdminClick: () => void;
  onMenuClick: () => void;
  cartCount: number;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ 
  userMode, 
  onCartClick, 
  onProfileClick, 
  onAdminClick,
  onMenuClick,
  cartCount 
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl px-6 h-20 flex items-center justify-between safe-top">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <span className="text-white font-black text-xl">R</span>
        </div>
        <span className="text-xl font-black tracking-tight text-slate-900">
          Raja Ent.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={onCartClick}
          className="p-3 text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all relative border border-slate-100"
        >
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
