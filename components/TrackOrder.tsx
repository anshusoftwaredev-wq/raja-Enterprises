
import React from 'react';
import { 
  Truck, Package, CheckCircle2, MapPin, 
  Calendar, ChevronRight, Smartphone, X, 
  ArrowLeft, ShieldCheck, Clock
} from 'lucide-react';

interface TrackOrderProps {
  orderId: string;
  onClose: () => void;
}

export const TrackOrder: React.FC<TrackOrderProps> = ({ orderId, onClose }) => {
  const steps = [
    { id: 1, label: 'Order Placed', time: 'Feb 26, 01:55 PM', status: 'completed', icon: Package },
    { id: 2, label: 'Processing', time: 'Feb 26, 02:10 PM', status: 'completed', icon: ShieldCheck },
    { id: 3, label: 'Shipped', time: 'Expected Feb 27', status: 'active', icon: Truck },
    { id: 4, label: 'Out for Delivery', time: 'Expected Mar 1', status: 'pending', icon: Smartphone },
    { id: 5, label: 'Delivered', time: 'Expected Mar 2', status: 'pending', icon: CheckCircle2 },
  ];

  return (
    <div className="fixed inset-0 z-[170] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-white/20 animate-slide-up">
        
        <div className="p-10 lg:p-16 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-6">
            <button onClick={onClose} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
              <ArrowLeft className="w-6 h-6 text-slate-900" />
            </button>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Track Order</h2>
              <p className="text-slate-500 font-medium">Order ID: <span className="text-indigo-600 font-black">{orderId}</span></p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-black uppercase tracking-widest">On Schedule</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Tracking Timeline */}
            <div className="lg:col-span-2 space-y-12">
              {steps.map((step, i) => (
                <div key={step.id} className="relative flex gap-8 group">
                  {i !== steps.length - 1 && (
                    <div className={`absolute left-7 top-14 bottom-[-48px] w-1 ${step.status === 'completed' ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
                  )}
                  
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all ${step.status === 'completed' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : step.status === 'active' ? 'bg-white border-4 border-indigo-600 text-indigo-600 shadow-xl' : 'bg-slate-50 text-slate-300'}`}>
                    <step.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 pt-2">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-xl font-black tracking-tight ${step.status === 'pending' ? 'text-slate-300' : 'text-slate-900'}`}>{step.label}</h4>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${step.status === 'pending' ? 'text-slate-200' : 'text-slate-400'}`}>{step.time}</span>
                    </div>
                    <p className={`text-sm font-medium ${step.status === 'pending' ? 'text-slate-200' : 'text-slate-500'}`}>
                      {step.id === 1 ? 'Your order has been successfully placed.' : 
                       step.id === 2 ? 'We are preparing your items for shipment.' :
                       step.id === 3 ? 'Package is in transit to Mumbai hub.' :
                       step.id === 4 ? 'Courier is out for delivery in your area.' :
                       'Package has been handed over to customer.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Info Sidebar */}
            <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Delivery Address</h3>
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-indigo-600 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900 leading-tight mb-2">Anshu Software</p>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      123, Business Park, Phase 2,<br />
                      Andheri East, Mumbai,<br />
                      Maharashtra - 400069
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-600/20">
                <h3 className="text-lg font-black tracking-tight mb-4">Need Help?</h3>
                <p className="text-indigo-100 text-sm font-medium mb-6 leading-relaxed">
                  If you have any questions about your delivery, our support team is available 24/7.
                </p>
                <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
          <X className="w-6 h-6 text-slate-400" />
        </button>
      </div>
    </div>
  );
};
