import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, PhoneCall, Calendar, Sparkles } from 'lucide-react';

interface StrategyCallCTAProps {
  onAction?: () => void;
  className?: string;
}

export const StrategyCallCTA: React.FC<StrategyCallCTAProps> = ({ onAction, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-2xl border border-pink-200/50 bg-gradient-to-br from-pink-50/80 via-white to-indigo-50/30 p-4 sm:p-5.5 shadow-sm hover:shadow-md hover:border-pink-300/60 transition-all duration-300 ${className}`}
    >
      {/* Absolute decorative glowing vector elements */}
      <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-pink-400/10 blur-xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 h-16 w-16 rounded-full bg-indigo-400/10 blur-lg pointer-events-none" />

      {/* Mini badge for priority/highlight */}
      <div className="flex items-center gap-1.5 mb-2.5 select-none">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
        </span>
        <span className="text-[10px] uppercase tracking-widest text-pink-600 font-extrabold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-pink-500" /> Exclusive Invitation
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm sm:text-base font-extrabold text-black tracking-tight leading-snug">
            Ready to design your next AI workforce success?
          </h4>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed font-normal">
            Schedule a custom 30-min strategy call. We will identify high-impact automation areas and model-latency configurations tailored specifically for your brand.
          </p>
        </div>

        <div className="shrink-0 flex flex-col gap-1.5 w-full md:w-auto">
          <motion.a
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            href="https://calendly.com/bubblebitxt/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onAction}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-[#0B1528] hover:bg-pink-600 text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-center shadow-sm shadow-[#0B1528]/10 hover:shadow-pink-500/20"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>Book Free Strategy Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </motion.a>
          <div className="text-[9px] text-gray-400 text-center md:text-right font-mono">
            *No strings attached. 100% value focus.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StrategyCallCTA;
