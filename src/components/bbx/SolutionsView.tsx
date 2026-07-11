import React from 'react';
import { Cpu, MessageSquare, Phone, Layers, ArrowLeft, ArrowRight } from 'lucide-react';

interface SolutionsViewProps {
  navigateToPage: (page: string) => void;
}

export const SolutionsView: React.FC<SolutionsViewProps> = ({ navigateToPage }) => {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Solutions</span>
        </div>
        <h2 className="text-xl font-bold text-black tracking-tight mt-1">AI Workforce Solutions</h2>
        <p className="text-xs text-gray-500 font-normal">Deploy fully-integrated digital employees configured for your goals.</p>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2.5">
        <div className="p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/70 border border-gray-100 transition-all flex gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-black">AI Receptionist & Lead Qualifier</h3>
            <p className="text-[11px] text-gray-500 mt-0.5 font-normal">Captures, qualifies, and schedules meetings 24/7 on complete autopilot.</p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/70 border border-gray-100 transition-all flex gap-3">
          <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-500 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-black">Intelligent Voice Agent</h3>
            <p className="text-[11px] text-gray-500 mt-0.5 font-normal">Automates voice customer telephone supports and outbound scheduling calls.</p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/70 border border-gray-100 transition-all flex gap-3">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-400 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-black">Operations & CRM Sync</h3>
            <p className="text-[11px] text-gray-500 mt-0.5 font-normal">Synchronizes WhatsApp, Gmail, Stripe, and HubSpot in high-fidelity.</p>
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between gap-3 mt-2 pt-3.5 border-t border-gray-100">
        <button 
          onClick={() => navigateToPage('home')} 
          className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer focus:outline-none focus:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Contact Form
        </button>
        <button 
          onClick={() => navigateToPage('industries')} 
          className="bg-[#0B1528] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#15233c] focus:outline-none focus:ring-2 focus:ring-[#0B1528] focus:ring-offset-2 transition-colors cursor-pointer flex items-center gap-1"
        >
          Next: Industries <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default SolutionsView;
