
import React from 'react';
import { ShoppingCart, User, Smartphone, Building2, Store } from 'lucide-react';
import { UserMode } from '../types';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  userMode: UserMode;
  onToggleMode: () => void;
  onDashboardClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, userMode, onToggleMode, onDashboardClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="p-2 bg-indigo-600 rounded-xl">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-slate-900 leading-none">
                RAJA <span className="text-indigo-600">ENT.</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Mobile Hub</span>
            </div>
          </div>

          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
            <button 
              onClick={() => userMode === 'wholesale' && onToggleMode()}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${userMode === 'retail' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Store className="w-4 h-4" /> Retail
            </button>
            <button 
              onClick={() => userMode === 'retail' && onToggleMode()}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${userMode === 'wholesale' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Building2 className="w-4 h-4" /> Wholesale
            </button>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {userMode === 'wholesale' && (
              <button 
                onClick={onDashboardClick}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-full text-sm font-semibold transition-colors"
              >
                Dashboard
              </button>
            )}
            <button className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={onCartClick}
              className="p-2.5 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-all relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
