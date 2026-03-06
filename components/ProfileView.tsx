
import React from 'react';
import { 
  User, Mail, Phone, MapPin, Package, Heart, Settings, 
  LogOut, ChevronRight, Shield, CreditCard, Bell, X,
  Smartphone, ShieldCheck, Zap, Globe, MessageCircle
} from 'lucide-react';
import { UserMode } from '../types';

interface ProfileViewProps {
  userMode: UserMode;
  onOpenAdmin: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ userMode, onOpenAdmin }) => {
  const sections = [
    { icon: User, label: 'Personal Information', desc: 'Name, Email, Phone' },
    { icon: MapPin, label: 'Shipping Addresses', desc: 'Manage your delivery locations' },
    { icon: CreditCard, label: 'Payment Methods', desc: 'Saved cards and UPI' },
    { icon: Bell, label: 'Notifications', desc: 'Alerts and updates' },
    { icon: Shield, label: 'Security', desc: 'Password and 2FA' },
    { icon: Settings, label: 'App Settings', desc: 'Theme and preferences' },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 pb-32 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10 text-center">
        <div className="relative inline-block mb-6">
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
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Anshu Software</h2>
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-[0.2em] mt-1">{userMode} Account</p>
      </header>

      <div className="space-y-3 mb-12">
        {sections.map((section, i) => (
          <button 
            key={i}
            className="w-full flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-[2rem] active:bg-slate-100 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600 group-active:scale-90 transition-transform">
                <section.icon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-black text-slate-900 tracking-tight leading-none mb-1">{section.label}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{section.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <button 
          onClick={onOpenAdmin}
          className="w-full flex items-center justify-center gap-3 p-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all"
        >
          <ShieldCheck className="w-5 h-5" /> Admin Portal
        </button>
        <button className="w-full flex items-center justify-center gap-3 p-5 bg-rose-50 text-rose-500 rounded-[2rem] font-black text-sm uppercase tracking-widest active:scale-95 transition-all">
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>

      <div className="mt-16 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Raja Enterprises v2.5.0</p>
      </div>
    </div>
  );
};
