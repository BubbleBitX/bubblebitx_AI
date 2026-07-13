import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PAGE_ORDER } from '../../constants/caseStudies';
import { CaseStudy } from '../../types';
import HomeView from './HomeView';
import SolutionsView from './SolutionsView';
import IndustriesView from './IndustriesView';
import HowItWorksView from './HowItWorksView';
import CaseStudiesView from './CaseStudiesView';

interface BbxCardProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  activePage: string;
  direction: number;
  navigateToPage: (page: string) => void;
  slideVariants: any;
  
  // Home Form states & functions
  formType: 'quick' | 'brief';
  setFormType: (type: 'quick' | 'brief') => void;
  sent: boolean;
  sending: boolean;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  message: string;
  setMessage: (val: string) => void;
  selected: string[];
  handleToggleService: (service: string) => void;
  otherServiceText: string;
  setOtherServiceText: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleResetForm: () => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;

  // Case study slider states
  currentCaseIdx: number;
  setCurrentCaseIdx: React.Dispatch<React.SetStateAction<number>>;
  setSelectedCaseStudy: (study: CaseStudy) => void;
}

export const BbxCard: React.FC<BbxCardProps> = ({
  cardRef,
  activePage,
  direction,
  navigateToPage,
  slideVariants,
  formType,
  setFormType,
  sent,
  sending,
  name,
  setName,
  email,
  setEmail,
  message,
  setMessage,
  selected,
  handleToggleService,
  otherServiceText,
  setOtherServiceText,
  handleSubmit,
  handleResetForm,
  nameInputRef,
  currentCaseIdx,
  setCurrentCaseIdx,
  setSelectedCaseStudy
}) => {
  return (
    <div 
      ref={cardRef}
      id="contact-form-outer"
      className="relative lg:absolute pointer-events-auto right-0 lg:right-12 bottom-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 left-0 lg:left-auto w-full max-w-md lg:max-w-none lg:w-[440px] z-40 mx-auto lg:mx-0 shrink-0 mb-12 lg:mb-0"
    >
      <div 
        id="contact-card"
        className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col p-5 sm:p-6 lg:p-5 xl:p-6 gap-4 sm:gap-5 h-[590px] sm:h-[660px] lg:h-[580px] xl:h-[660px]"
      >
        {/* Horizontal Navigation Dots / Tiny Pills for the slide deck */}
        <div id="card-nav-tabs" className="flex items-center justify-between gap-0.5 bg-gray-50 p-1 rounded-2xl border border-gray-100">
          {PAGE_ORDER.map((page) => {
            const isActive = activePage === page;
            const label = page === 'home' ? 'Contact' : page === 'how-it-works' ? 'Process' : page === 'case-studies' ? 'Cases' : page.charAt(0).toUpperCase() + page.slice(1);
            return (
              <button
                key={page}
                onClick={() => navigateToPage(page)}
                className={`text-[9px] sm:text-[10px] font-semibold px-1 py-1.5 rounded-xl transition-all flex-1 text-center cursor-pointer whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-black ${
                  isActive 
                    ? 'bg-[#0B1528] text-white shadow-sm' 
                    : 'text-gray-500 hover:text-black hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Sliding content viewport */}
        <div className="relative overflow-y-auto overflow-x-hidden w-full flex-1 min-h-0 pr-0.5 scrollbar-thin">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={activePage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full flex flex-col justify-between"
            >
              {activePage === 'home' && (
                <HomeView
                  formType={formType}
                  setFormType={setFormType}
                  sent={sent}
                  sending={sending}
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  message={message}
                  setMessage={setMessage}
                  selected={selected}
                  handleToggleService={handleToggleService}
                  otherServiceText={otherServiceText}
                  setOtherServiceText={setOtherServiceText}
                  handleSubmit={handleSubmit}
                  handleResetForm={handleResetForm}
                  nameInputRef={nameInputRef}
                />
              )}

              {activePage === 'solutions' && (
                <SolutionsView navigateToPage={navigateToPage} />
              )}

              {activePage === 'industries' && (
                <IndustriesView navigateToPage={navigateToPage} />
              )}

              {activePage === 'how-it-works' && (
                <HowItWorksView navigateToPage={navigateToPage} />
              )}

              {activePage === 'case-studies' && (
                <CaseStudiesView
                  currentCaseIdx={currentCaseIdx}
                  setCurrentCaseIdx={setCurrentCaseIdx}
                  setSelectedCaseStudy={setSelectedCaseStudy}
                  navigateToPage={navigateToPage}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BbxCard;
