import React from 'react';
import { Layers, ArrowLeft, ArrowRight } from 'lucide-react';

interface HowItWorksViewProps {
  navigateToPage: (page: string) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ navigateToPage }) => {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Process</span>
        </div>
        <h2 className="text-xl font-bold text-black tracking-tight mt-1">Our 3-Step Integration</h2>
        <p className="text-xs text-gray-500 font-normal">Simple onboarding structure for your brand-new digital employees.</p>
      </div>

      {/* Stepped timeline */}
      <div className="flex flex-col gap-3.5 mt-1 relative pl-5 border-l border-gray-100 ml-3.5">
        <div className="relative">
          <span className="absolute -left-[27px] top-0.5 w-4 h-4 rounded-full bg-black border-2 border-white flex items-center justify-center text-[8px] text-white font-bold" aria-hidden="true">1</span>
          <h3 className="text-xs sm:text-sm font-bold text-black">AI Blueprint & Design</h3>
          <p className="text-[11px] text-gray-500 mt-0.5 font-normal">We analyze your historical logs and procedures to outline the absolute best automation blueprints.</p>
        </div>

        <div className="relative">
          <span className="absolute -left-[27px] top-0.5 w-4 h-4 rounded-full bg-black border-2 border-white flex items-center justify-center text-[8px] text-white font-bold" aria-hidden="true">2</span>
          <h3 className="text-xs sm:text-sm font-bold text-black">Model Engineering & Training</h3>
          <p className="text-[11px] text-gray-500 mt-0.5 font-normal">We feed custom context files and configure speech latency to craft beautiful dedicated system agents.</p>
        </div>

        <div className="relative">
          <span className="absolute -left-[27px] top-0.5 w-4 h-4 rounded-full bg-black border-2 border-white flex items-center justify-center text-[8px] text-white font-bold" aria-hidden="true">3</span>
          <h3 className="text-xs sm:text-sm font-bold text-black">Full Launch & Synchronization</h3>
          <p className="text-[11px] text-gray-500 mt-0.5 font-normal">Agents plug directly into CRM systems, WhatsApp numbers, and active telephone networks.</p>
        </div>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between gap-3 mt-2 pt-3.5 border-t border-gray-100">
        <button 
          onClick={() => navigateToPage('industries')} 
          className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer focus:outline-none focus:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Industries
        </button>
        <button 
          onClick={() => navigateToPage('case-studies')} 
          className="bg-[#0B1528] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#15233c] focus:outline-none focus:ring-2 focus:ring-[#0B1528] focus:ring-offset-2 transition-colors cursor-pointer flex items-center gap-1"
        >
          Next: Cases <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default HowItWorksView;
