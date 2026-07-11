import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <div 
      id="headline-wrapper" 
      className="relative lg:absolute pointer-events-auto left-0 lg:left-12 bottom-0 lg:bottom-12 lg:top-auto lg:translate-y-0 w-full lg:w-auto max-w-full lg:max-w-2xl z-40 text-left p-4 sm:p-8 rounded-[20px] sm:rounded-[24px] shrink-0 bg-white/[0.02] backdrop-blur-[6px] border border-white/10 shadow-2xl transition-all duration-300"
    >
      <h1 
        id="headline-paragraph"
        className="text-white text-3xl sm:text-5xl xl:text-6xl font-medium leading-[1.15] sm:leading-[1.1] tracking-tight drop-shadow-sm"
      >
        AI Employees <br />
        Built for <br />
        <span 
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }} 
          className="text-3.5xl sm:text-6.5xl xl:text-7.5xl text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
        >
          Growing Businesses.
        </span>
      </h1>
      <p className="text-white/90 text-sm sm:text-base mt-4 font-normal tracking-wide max-w-sm drop-shadow-sm">
        Reduce costs. Automate operations. Increase revenue.
      </p>
    </div>
  );
};

export default HeroSection;
