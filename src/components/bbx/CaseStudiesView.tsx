import React from 'react';
import { TrendingUp, ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CaseStudy } from '../../types';
import { CASE_STUDIES } from '../../constants/caseStudies';

interface CaseStudiesViewProps {
  currentCaseIdx: number;
  setCurrentCaseIdx: React.Dispatch<React.SetStateAction<number>>;
  setSelectedCaseStudy: (study: CaseStudy) => void;
  navigateToPage: (page: string) => void;
}

export const CaseStudiesView: React.FC<CaseStudiesViewProps> = ({
  currentCaseIdx,
  setCurrentCaseIdx,
  setSelectedCaseStudy,
  navigateToPage
}) => {
  const cs = CASE_STUDIES[currentCaseIdx];

  const handlePrev = () => {
    setCurrentCaseIdx(prev => prev === 0 ? CASE_STUDIES.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentCaseIdx(prev => prev === CASE_STUDIES.length - 1 ? 0 : prev + 1);
  };

  return (
    <div className="h-full flex flex-col justify-between gap-3.5 animate-in fade-in duration-200">
      <div className="flex flex-col gap-3.5">
        {/* Heading */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-pink-600 font-extrabold">Proof & Impact</span>
        </div>
        <h2 className="text-sm sm:text-base font-extrabold text-black tracking-tight mt-0.5 leading-snug">
          Real AI Systems. Real Business Results.
        </h2>
        <p className="text-xs text-gray-500 leading-normal hidden sm:block font-normal">
          We deploy production-ready AI systems that solve complex business problems.
        </p>
      </div>

      {/* Metrics mini grid: 4 columns with enhanced legibility and contrast */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 bg-gray-50/50 p-1.5 sm:p-2 rounded-2xl border border-gray-100/85">
        <div className="bg-white p-1.5 sm:p-2 rounded-xl border border-gray-100/50 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs sm:text-sm font-extrabold text-[#0B1528] font-mono leading-none">10+</span>
          <span className="text-[9px] sm:text-[10px] text-gray-500 font-semibold leading-tight mt-1">Projects</span>
        </div>
        <div className="bg-white p-1.5 sm:p-2 rounded-xl border border-gray-100/50 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs sm:text-sm font-extrabold text-green-600 font-mono leading-none">50%+</span>
          <span className="text-[9px] sm:text-[10px] text-gray-500 font-semibold leading-tight mt-1">Efficiency</span>
        </div>
        <div className="bg-white p-1.5 sm:p-2 rounded-xl border border-gray-100/50 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs sm:text-sm font-extrabold text-[#0B1528] font-mono leading-none">$155K+</span>
          <span className="text-[9px] sm:text-[10px] text-gray-500 font-semibold leading-tight mt-1">Delivered</span>
        </div>
        <div className="bg-white p-1.5 sm:p-2 rounded-xl border border-gray-100/50 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs sm:text-sm font-extrabold text-pink-600 font-mono leading-none">Millions</span>
          <span className="text-[9px] sm:text-[10px] text-gray-500 font-semibold leading-tight mt-1">Impact</span>
        </div>
      </div>

      {/* Horizontal slider control */}
      <div className="flex items-center justify-between px-1 mt-1">
        <span className="text-xs text-gray-500 font-mono font-bold">
          Featured Cases ({currentCaseIdx + 1}/6)
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Previous case study"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Next case study"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Current Case Card with the requested visual structure */}
      {cs && (
        <div key={cs.id} className="p-3 sm:p-4 bg-[#0B1528] text-white rounded-2xl flex flex-col gap-2 sm:gap-2.5 relative overflow-hidden shadow-md animate-in fade-in duration-300">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="flex justify-between items-center">
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-pink-300 bg-pink-950/45 px-2.5 py-1 rounded-md border border-pink-500/20">
              {cs.industry.split(' • ')[0]}
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-gray-400 font-bold">
              {cs.duration}
            </span>
          </div>

          <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-tight leading-snug">
            {cs.title}
          </h4>

          <p className="text-xs text-gray-300 leading-relaxed line-clamp-2 font-normal">
            {cs.challenge}
          </p>

          {/* Mini impact grid */}
          <div className="grid grid-cols-3 gap-1.5 bg-white/5 p-1.5 rounded-xl border border-white/5 mt-1">
            {cs.impact.map((imp, idx) => (
              <div key={idx} className="flex flex-col text-center py-0.5">
                <span className="text-[11px] sm:text-xs font-extrabold text-green-300 font-mono leading-none">
                  {imp.stat}
                </span>
                <span className="text-[9px] sm:text-[10px] text-gray-300 font-medium leading-tight mt-1 whitespace-nowrap overflow-hidden text-ellipsis px-0.5">
                  {imp.label}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSelectedCaseStudy(cs)}
            className="w-full bg-white hover:bg-gray-100 text-[#0B1528] text-xs font-bold py-2 sm:py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1 focus:outline-none focus:ring-2 focus:ring-white"
          >
            View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between gap-3 mt-1.5 pt-3 border-t border-gray-100 font-semibold">
        <button 
          type="button"
          onClick={() => navigateToPage('how-it-works')} 
          className="text-xs sm:text-sm font-semibold text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer focus:outline-none focus:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Process
        </button>
        <button 
          type="button"
          onClick={() => navigateToPage('home')} 
          className="bg-[#0B1528] hover:bg-[#15233c] text-white text-xs sm:text-sm font-semibold px-4.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-[#0B1528]/10 focus:outline-none focus:ring-2 focus:ring-[#0B1528] focus:ring-offset-2"
        >
          Get Started Now <CheckCircle2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default CaseStudiesView;
