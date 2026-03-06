
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { getShoppingAdvice } from '../services/gemini';
import { products } from '../data/products';
import { ChatMessage, UserMode } from '../types';

export const AIChatBot: React.FC<{ mode?: UserMode }> = ({ mode = 'retail' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: mode === 'wholesale' ? "Welcome to the B2B Hub. I'm your wholesale strategist. Need help with bulk pricing or inventory projections?" : "Hello! I'm your Raja Personal Tech Expert. Looking for a new device?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiResponse = await getShoppingAdvice(userMsg, products, mode);
    
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-[1.5rem] shadow-2xl hover:scale-110 transition-all flex items-center gap-3 group border-4 border-white active:scale-95"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 fill-current" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse border-2 border-indigo-600"></div>
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-black text-xs uppercase tracking-widest pr-2">
            AI Assistant
          </span>
        </button>
      ) : (
        <div className="bg-white rounded-[2rem] shadow-2xl w-[90vw] sm:w-[400px] border border-slate-100 flex flex-col h-[70vh] lg:h-[600px] overflow-hidden animate-slide-up">
          <div className="bg-white p-5 text-slate-900 flex justify-between items-center border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 rounded-2xl">
                <Bot className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="font-black tracking-tight text-lg leading-none">Raja Assistant</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Online • Gemini Core</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-slate-100 p-2 rounded-full transition-colors">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 items-center bg-white p-4 rounded-[1.5rem] rounded-tl-none border border-slate-100">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white">
            <div className="flex gap-2 bg-slate-100 p-1.5 rounded-[1.5rem] border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent border-none rounded-full px-4 py-3 text-sm focus:outline-none font-medium text-slate-900"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/20 active:scale-90"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
