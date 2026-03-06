
import React, { useState } from 'react';
import { Smartphone, Zap, ShieldCheck, ArrowRight, ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Smartphone,
      title: "Premium Mobile Hub",
      description: "Discover the latest flagships and accessories from top global brands, all in one place.",
      color: "bg-indigo-600",
      accent: "text-indigo-600"
    },
    {
      icon: Zap,
      title: "Wholesale & Retail",
      description: "Switch between retail and wholesale modes instantly to get the best prices for your needs.",
      color: "bg-emerald-600",
      accent: "text-emerald-600"
    },
    {
      icon: ShieldCheck,
      title: "Trusted Warranty",
      description: "Every purchase comes with an official Raja Enterprises warranty and pan-India support.",
      color: "bg-amber-600",
      accent: "text-amber-600"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[900] bg-white flex flex-col items-center justify-between p-8 overflow-hidden safe-top safe-bottom">
      {/* Skip Button */}
      <div className="w-full flex justify-end">
        <button 
          onClick={onComplete}
          className="text-slate-400 font-bold uppercase tracking-widest text-[11px] px-4 py-2 active:bg-slate-50 rounded-full transition-all"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm px-4">
        <div className={`p-8 ${step.color} rounded-[2.5rem] shadow-2xl shadow-indigo-100 mb-10 animate-in zoom-in duration-500`}>
          <step.icon className="w-16 h-16 text-white" />
        </div>
        
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
          {step.title}
        </h2>
        <p className="text-slate-500 font-medium leading-relaxed text-base">
          {step.description}
        </p>
      </div>

      {/* Footer */}
      <div className="w-full flex flex-col items-center gap-8">
        {/* Progress Dots */}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? `w-8 ${step.color}` : 'w-1.5 bg-slate-200'}`}
            ></div>
          ))}
        </div>

        {/* Next Button */}
        <button 
          onClick={handleNext}
          className={`w-full py-5 ${step.color} text-white rounded-[1.5rem] font-black text-base shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2`}
        >
          {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
