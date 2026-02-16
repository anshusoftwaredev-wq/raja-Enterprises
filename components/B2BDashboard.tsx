
import React from 'react';
import { Package, CreditCard, FileText, Truck, ChevronRight, X } from 'lucide-react';

export const B2BDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row border border-white/20">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-8">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">B2B <span className="text-indigo-600">HUB</span></h2>
            <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">Retailer ID: RAJ-9921</p>
          </div>
          <nav className="space-y-2">
            {[
              { icon: Package, label: 'Bulk Orders', active: true },
              { icon: CreditCard, label: 'Credit Limit', active: false },
              { icon: FileText, label: 'GST Invoices', active: false },
              { icon: Truck, label: 'Shipments', active: false },
            ].map((item, i) => (
              <button 
                key={i} 
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-bold transition-all ${item.active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-200'}`}
              >
                <item.icon className="w-4 h-4" /> {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Welcome back, Raja Enterprises</h3>
              <p className="text-slate-500 font-medium">Your current business health is looking great.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X /></button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Total Volume', value: '₹14,20,000', color: 'bg-indigo-50 text-indigo-600' },
              { label: 'Available Credit', value: '₹5,00,000', color: 'bg-emerald-50 text-emerald-600' },
              { label: 'Pending GST', value: '₹42,050', color: 'bg-amber-50 text-amber-600' },
            ].map((stat, i) => (
              <div key={i} className={`${stat.color} p-6 rounded-[2rem] border border-current/10`}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">{stat.label}</p>
                <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
              Recent Bulk Transactions
              <button className="text-indigo-600 text-sm">View All</button>
            </h4>
            <div className="space-y-4">
              {[1, 2, 3].map(id => (
                <div key={id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Package className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Order #ORD-772{id}</p>
                      <p className="text-xs text-slate-500">Processing • 12 Items • May 2{id}, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-black text-slate-900 tracking-tighter">₹2,45,000.00</p>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
