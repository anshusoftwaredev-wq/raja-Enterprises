
import React, { useState } from 'react';
import { 
  X, CreditCard, Truck, ShieldCheck, ChevronRight, 
  MapPin, Phone, Mail, User, CheckCircle2, ArrowRight
} from 'lucide-react';
import { CartItem, UserMode } from '../types';

interface CheckoutProps {
  items: CartItem[];
  total: number;
  userMode: UserMode;
  onClose: () => void;
  onSuccess: (orderId: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ items, total, userMode, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess("RE-" + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row border border-white/20 animate-slide-up">
        
        {/* Left Side: Form */}
        <div className="flex-1 overflow-y-auto p-10 lg:p-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Checkout</h2>
              <p className="text-slate-500 font-medium">Complete your {userMode} order</p>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`w-3 h-3 rounded-full transition-all ${step >= s ? 'bg-indigo-600 w-8' : 'bg-slate-200'}`}
                ></div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Shipping Details</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Full Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none font-medium" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Phone Number</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none font-medium" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Shipping Address</label>
                  <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none font-medium h-32 resize-none" placeholder="123, Business Park, Mumbai..."></textarea>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full mt-8 bg-slate-900 text-white py-5 rounded-3xl font-black flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
              >
                Continue to Payment <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Payment Method</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                  { id: 'upi', label: 'UPI Payment', icon: CheckCircle2, desc: 'Google Pay, PhonePe, Paytm' },
                  { id: 'netbanking', label: 'Net Banking', icon: ShieldCheck, desc: 'All major Indian banks' }
                ].map((method) => (
                  <label key={method.id} className="relative flex items-center gap-6 p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl cursor-pointer hover:border-indigo-200 transition-all has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/30">
                    <input type="radio" name="payment" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" defaultChecked={method.id === 'card'} />
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <method.icon className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 leading-none mb-1">{method.label}</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-12">
                <button 
                  onClick={() => setStep(1)}
                  className="px-8 py-5 bg-slate-100 text-slate-600 rounded-3xl font-black hover:bg-slate-200 transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 bg-indigo-600 text-white py-5 rounded-3xl font-black flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : `Pay ₹${total.toLocaleString()}`} <ShieldCheck className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full md:w-[400px] bg-slate-50 border-l border-slate-100 p-10 lg:p-16 flex flex-col">
          <h3 className="text-xl font-black text-slate-900 tracking-tight mb-10">Order Summary</h3>
          
          <div className="flex-1 overflow-y-auto space-y-6 mb-10">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 overflow-hidden shrink-0 p-2">
                  <img src={item.product.image} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm leading-tight mb-1">{item.product.name}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty: {item.quantity} × ₹{(userMode === 'wholesale' ? item.product.wholesalePrice : item.product.retailPrice).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-8 border-t border-slate-200">
            <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-widest">
              <span>Subtotal</span>
              <span className="text-slate-900">₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-widest">
              <span>Shipping</span>
              <span className="text-emerald-600">FREE</span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-slate-900 font-black text-xl tracking-tighter">Total</span>
              <span className="text-3xl font-black text-slate-900 tracking-tighter">₹{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-10 p-6 bg-white rounded-3xl border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
              Your transaction is secured with 256-bit SSL encryption.
            </p>
          </div>
        </div>

        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
          <X className="w-6 h-6 text-slate-400" />
        </button>
      </div>
    </div>
  );
};
