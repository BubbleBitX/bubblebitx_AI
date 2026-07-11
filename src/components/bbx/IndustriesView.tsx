import React from 'react';
import { Building, ArrowLeft, ArrowRight } from 'lucide-react';

interface IndustriesViewProps {
  navigateToPage: (page: string) => void;
}

export const IndustriesView: React.FC<IndustriesViewProps> = ({ navigateToPage }) => {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center">
            <Building className="w-4 h-4" />
          </div>
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Industries</span>
        </div>
        <h2 className="text-xl font-bold text-black tracking-tight mt-1">Industries We Transform</h2>
        <p className="text-xs text-gray-500 font-normal">Customized integrations that deliver massive business results.</p>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2.5">
        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-black">Real Estate & Agencies</span>
            <span className="text-[9px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full">+43% Tours Booked</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1 font-normal">Immediate lead qualification, automated property details, and scheduling.</p>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-black">E-Commerce & Brands</span>
            <span className="text-[9px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full">84% Auto Resolved</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1 font-normal">Order tracking lookups, returns collection, and abandoned cart recovery.</p>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-black">Professional & SaaS</span>
            <span className="text-[9px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full">4x Conv. Rates</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1 font-normal">Immediate trial follow-up, customer onboarding, and secure system support.</p>
        </div>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between gap-3 mt-2 pt-3.5 border-t border-gray-100">
        <button 
          onClick={() => navigateToPage('solutions')} 
          className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer focus:outline-none focus:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Solutions
        </button>
        <button 
          onClick={() => navigateToPage('how-it-works')} 
          className="bg-[#0B1528] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#15233c] focus:outline-none focus:ring-2 focus:ring-[#0B1528] focus:ring-offset-2 transition-colors cursor-pointer flex items-center gap-1"
        >
          Next: Process <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default IndustriesView;
