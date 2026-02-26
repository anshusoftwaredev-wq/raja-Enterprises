
import React from 'react';
import { 
  CheckCircle2, Package, Truck, Smartphone, 
  ArrowRight, ShoppingBag, ChevronRight, MapPin, 
  Calendar, CreditCard, ShieldCheck, X
} from 'lucide-react';

interface PaymentSuccessProps {
  orderId: string;
  total: number;
  onClose: () => void;
  onTrack: () => void;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ orderId, total, onClose, onTrack }) => {
  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-white rounded-[4rem] shadow-2xl w-full max-w-2xl overflow-hidden p-12 text-center animate-slide-up border border-white/20">
        
        <div className="inline-flex p-8 bg-emerald-50 rounded-[3rem] mb-10 relative">
          <CheckCircle2 className="w-20 h-20 text-emerald-500" />
          <div className="absolute -top-2 -right-2 bg-indigo-600 text-white p-3 rounded-2xl shadow-xl animate-bounce">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Order Confirmed!</h2>
        <p className="text-xl text-slate-500 font-medium mb-12">
          Your payment of <span className="text-slate-900 font-black">₹{total.toLocaleString()}</span> was successful.
        </p>

        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-left">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Order ID</p>
            <p className="text-lg font-black text-slate-900 tracking-tight">{orderId}</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-left">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Delivery By</p>
            <p className="text-lg font-black text-slate-900 tracking-tight">March 2, 2024</p>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={onTrack}
            className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/30 hover:-translate-y-1"
          >
            Track My Order <Truck className="w-6 h-6" />
          </button>
          <button 
            onClick={onClose}
            className="w-full bg-white text-slate-900 border-2 border-slate-100 py-6 rounded-3xl font-black text-lg hover:bg-slate-50 transition-all"
          >
            Continue Shopping
          </button>
        </div>

        <p className="mt-10 text-slate-400 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Secure Transaction by Raja Enterprises
        </p>

        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
          <X className="w-6 h-6 text-slate-400" />
        </button>
      </div>
    </div>
  );
};
