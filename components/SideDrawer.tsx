
import React from 'react';
import { 
  X, MessageSquare, ShieldCheck, LayoutDashboard, 
  Settings, HelpCircle, LogOut, Smartphone, Sparkles,
  Zap, Globe, Headphones
} from 'lucide-react';
import { UserMode } from '../types';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userMode: UserMode;
  onToggleMode: () => void;
  onOpenAI: () => void;
  onOpenAdmin: () => void;
  onOpenB2B: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ 
  isOpen, 
  onClose, 
  userMode, 
  onToggleMode,
  onOpenAI,
  onOpenAdmin,
  onOpenB2B
}) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 bottom-0 z-[210] w-[80%] max-w-xs bg-white shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}
      >
        {/* Header */}
        <div className="p-8 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <Smartphone className="w-8 h-8 text-indigo-400" />
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            <h2 className="text-2xl font-black tracking-tighter">Raja Enterprises</h2>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* AI Section */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">Intelligence</p>
            <button 
              onClick={() => { onOpenAI(); onClose(); }}
              className="w-full flex items-center gap-4 p-4 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-100 transition-all group"
            >
              <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 group-active:scale-90 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              AI Assistant
            </button>
          </div>

          {/* Business Section */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">Business</p>
            <div className="space-y-2">
              <button 
                onClick={() => { onOpenB2B(); onClose(); }}
                className="w-full flex items-center gap-4 p-4 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-all"
              >
                <LayoutDashboard className="w-5 h-5" /> B2B Dashboard
              </button>
              <button 
                onClick={() => { onToggleMode(); onClose(); }}
                className="w-full flex items-center gap-4 p-4 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-all"
              >
                <Zap className="w-5 h-5" /> Switch to {userMode === 'retail' ? 'Wholesale' : 'Retail'}
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-4">Support</p>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-4 p-4 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-all">
                <HelpCircle className="w-5 h-5" /> Help Center
              </button>
              <button className="w-full flex items-center gap-4 p-4 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-all">
                <Headphones className="w-5 h-5" /> Contact Support
              </button>
              <button className="w-full flex items-center gap-4 p-4 text-slate-600 hover:bg-slate-50 rounded-2xl font-bold text-sm transition-all">
                <Globe className="w-5 h-5" /> Track Shipment
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={() => { onOpenAdmin(); onClose(); }}
            className="w-full flex items-center gap-4 p-4 text-slate-400 hover:text-indigo-600 transition-colors font-bold text-sm"
          >
            <ShieldCheck className="w-5 h-5" /> Admin Portal
          </button>
          <button className="w-full flex items-center gap-4 p-4 text-rose-500 hover:bg-rose-50 rounded-2xl font-bold text-sm transition-all mt-2">
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </div>
    </>
  );
};
