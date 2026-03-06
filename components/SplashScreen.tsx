
import React, { useEffect, useState } from 'react';
import { Smartphone } from 'lucide-react';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative animate-in zoom-in duration-700">
        <div className="p-6 bg-indigo-600 rounded-[2rem] shadow-2xl shadow-indigo-100">
          <Smartphone className="w-16 h-16 text-white" />
        </div>
      </div>
      
      <div className="mt-8 text-center animate-in slide-in-from-bottom-4 duration-700 delay-200">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Raja <span className="text-indigo-600">Enterprises</span>
        </h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mt-1">Premium Mobile Hub</p>
      </div>

      <div className="absolute bottom-24 flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Initializing</p>
      </div>
    </div>
  );
};
