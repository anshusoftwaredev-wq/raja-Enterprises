
import React from 'react';
import { Home, Heart, ClipboardList, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'orders', icon: ClipboardList, label: 'Orders' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-t border-slate-100 px-2 py-3 pb-8 flex justify-around items-center safe-bottom shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="relative flex flex-col items-center gap-1 min-w-[72px] transition-all"
        >
          <div className={`px-5 py-1.5 rounded-full transition-all duration-300 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400'}`}>
            <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'fill-current' : ''}`} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest transition-colors mt-1 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};
