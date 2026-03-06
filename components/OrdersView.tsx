
import React from 'react';
import { ClipboardList, Clock } from 'lucide-react';

export const OrdersView: React.FC = () => {
  const orders = [
    { 
      id: '1', 
      date: '2/27/2026', 
      status: 'Pending', 
      total: '₹4,999', 
      items: [
        { name: 'Wireless Earbuds', qty: 1, price: '₹4,999', image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=200" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-32 px-6 animate-in fade-in duration-500">
      <header className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <ClipboardList className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Order History</h1>
      </header>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            {/* Order Header */}
            <div className="p-6 flex justify-between items-start border-b border-slate-50">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Order #{order.id}</h3>
                <p className="text-sm font-medium text-slate-400">{order.date}</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-2xl">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-wider">{order.status}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6 space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                      <p className="text-xs font-medium text-slate-400">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-slate-900">{item.price}</span>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="p-6 bg-slate-50/50 flex justify-between items-center border-t border-slate-50">
              <span className="text-base font-bold text-slate-500">Total Amount</span>
              <span className="text-xl font-black text-slate-900">{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
