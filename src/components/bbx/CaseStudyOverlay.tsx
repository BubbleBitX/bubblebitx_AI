import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, X, Clock, Cpu, TrendingUp, Database, Check, ArrowUpRight } from 'lucide-react';
// @ts-ignore
import bbxLogo from '/public/BBX-LOGO.png';
import { CaseStudy } from '../../types';
import { CASE_STUDIES } from '../../constants/caseStudies';
import StrategyCallCTA from '../StrategyCallCTA';

interface CaseStudyOverlayProps {
  selectedCaseStudy: CaseStudy;
  setSelectedCaseStudy: (study: CaseStudy | null) => void;
}

export const CaseStudyOverlay: React.FC<CaseStudyOverlayProps> = ({
  selectedCaseStudy,
  setSelectedCaseStudy
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute inset-0 z-[60] bg-white text-black flex flex-col select-text overflow-hidden"
    >
      {/* Top Bar - Sticky / Fixed at the top of the overlay */}
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 border-b border-gray-200/60 shrink-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2.5">
          <img 
            src={bbxLogo} 
            alt="BBX Logo" 
            width={40}
            height={40}
            className="h-8 sm:h-10 w-auto object-contain shrink-0" 
          />
          <div className="flex flex-col">
            <span className="font-bold text-xs sm:text-sm tracking-tight text-black leading-none">
              BubbleBitX Intel
            </span>
            <span className="text-[9px] uppercase tracking-widest text-pink-600 font-mono font-bold mt-1">
              Production Systems
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSelectedCaseStudy(null)}
            className="hidden sm:flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-black transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100 px-3.5 py-2 rounded-xl border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-pink-600" /> Back to Site
          </button>
          <button
            type="button"
            onClick={() => setSelectedCaseStudy(null)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center transition-all cursor-pointer border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-label="Close Case Study"
          >
            <X className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Main Unified Scrollable Content Area - Excludes separate scroll zones to completely prevent scroll trapping */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 space-y-8 scrollbar-thin">
        
        {/* Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Details, Challenge, Solution, CTA) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Header info */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-pink-600 bg-pink-50 border border-pink-100/80 px-3 py-1 rounded-xl">
                  {selectedCaseStudy.industry}
                </span>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-mono font-bold">
                  <Clock className="w-4 h-4 text-pink-500 shrink-0" /> {selectedCaseStudy.duration} Deployment
                </div>
              </div>
              <div className="flex items-baseline gap-3.5 sm:gap-4.5 mt-2">
                <span className="text-3xl sm:text-5xl font-mono font-extrabold text-pink-500/15 select-none leading-none">
                  {selectedCaseStudy.num}
                </span>
                <h2 className="text-2xl sm:text-3.5xl font-extrabold text-black tracking-tight leading-tight">
                  {selectedCaseStudy.title}
                </h2>
              </div>
            </div>

            {/* Challenge Block */}
            <div className="bg-red-50/40 border border-red-100 p-5 rounded-2xl relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-red-600 mb-2">
                The Challenge
              </h3>
              <p className="text-sm text-gray-700 font-normal leading-relaxed">
                {selectedCaseStudy.challenge}
              </p>
            </div>

            {/* Solution Block */}
            <div className="bg-green-50/40 border border-green-100 p-5 rounded-2xl relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-green-600 mb-2">
                Our Solution
              </h3>
              <p className="text-sm text-gray-700 font-normal leading-relaxed">
                {selectedCaseStudy.solution}
              </p>
            </div>

            {/* Strategy Call CTA */}
            <StrategyCallCTA 
              onAction={() => setSelectedCaseStudy(null)} 
              className="w-full"
            />
          </div>

          {/* Right Column (Architecture, Business Impact, Tech Stack) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Systems Architecture list */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-pink-600 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> System Architecture & AI Data Flow
              </h3>
              <div className="flex flex-col gap-3">
                {selectedCaseStudy.architecture.map((step: string, idx: number) => {
                  const parts = step.split(': ');
                  const title = parts[0];
                  const desc = parts.slice(1).join(': ');
                  return (
                    <div key={idx} className="flex gap-4 bg-gray-50 border border-gray-100 p-4 rounded-xl hover:border-pink-200 hover:bg-pink-50/10 transition-all duration-300">
                      <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 text-sm font-bold font-mono">
                        {idx + 1}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-xs sm:text-sm font-extrabold text-black">{title}</h4>
                        <p className="text-xs text-gray-600 mt-1 leading-normal font-normal">{desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Business Impact Checklist */}
            <div className="bg-green-50/30 border border-green-100 p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-500/5 to-transparent rounded-bl-full pointer-events-none" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-green-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Business Impact Delivered
              </h3>
              <div className="flex flex-col gap-4">
                {selectedCaseStudy.impact.map((imp: any, idx: number) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="p-1 rounded bg-green-100 text-green-700 flex items-center justify-center mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-mono font-extrabold text-green-600 leading-none">
                          {imp.stat}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-black">
                          {imp.label}
                        </span>
                      </div>
                      {imp.desc && (
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed font-normal">
                          {imp.desc}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Utilized */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-pink-600 flex items-center gap-2">
                <Database className="w-4 h-4" /> Core Integration Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCaseStudy.tech.map((t: string) => (
                  <span
                    key={t}
                    className="bg-gray-100/90 hover:bg-gray-200/50 border border-gray-200 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all font-mono text-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Browse/Switch Case Study bottom bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col gap-4 shrink-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <h3 className="text-xs sm:text-sm font-extrabold text-black uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4 text-pink-600" /> Explore Other Case Studies
            </h3>
            <span className="text-xs text-gray-400 font-mono hidden sm:inline">Select another case study to transition instantly</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CASE_STUDIES.map((cs) => {
              const isActive = cs.id === selectedCaseStudy.id;
              return (
                <button
                  key={cs.id}
                  type="button"
                  onClick={() => setSelectedCaseStudy(cs)}
                  className={`group p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                    isActive
                      ? 'bg-[#0B1528] border-pink-500/40 text-white font-semibold'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300 hover:text-black'
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono font-bold text-gray-400 group-hover:text-pink-600 transition-colors">
                        Case #{cs.num}
                      </span>
                      {isActive && (
                        <span className="text-[8px] font-extrabold uppercase tracking-wider text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded border border-pink-200">
                          Active
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-extrabold leading-tight line-clamp-1">{cs.title}</h4>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold mt-2 text-pink-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-2px] group-hover:translate-x-0">
                    Inspect <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default CaseStudyOverlay;
