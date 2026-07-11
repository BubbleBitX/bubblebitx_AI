import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../constants/caseStudies';

interface HomeViewProps {
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
}

export const HomeView: React.FC<HomeViewProps> = ({
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
  nameInputRef
}) => {
  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 lg:gap-2.5 xl:gap-3">
      {/* Compact Unified Header */}
      <div className="flex flex-col gap-1 bg-gray-50/50 p-3 rounded-2xl border border-gray-100/60 shrink-0">
        <h2 id="form-heading" className="text-sm sm:text-base font-bold text-black tracking-tight leading-none">
          {formType === 'brief' ? 'Detailed Project Briefing' : "Let's Build Your AI Workforce"}
        </h2>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 font-normal">
          {formType === 'brief'
            ? 'Complete our quick planner below to kickstart your AI workforce integration.'
            : 'Drop your details below to get a custom AI strategy within 24 hours.'}
        </p>
      </div>

      {/* Form Type Toggle */}
      <div className="flex gap-1 bg-gray-100/50 p-1 rounded-xl border border-gray-200/40 text-[10px] sm:text-xs font-semibold text-gray-500 mb-1 shrink-0">
        <button
          type="button"
          onClick={() => setFormType('quick')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-black ${
            formType === 'quick'
              ? 'bg-[#0B1528] text-white shadow-sm font-semibold'
              : 'hover:text-black hover:bg-gray-100/50'
          }`}
        >
          Quick Message
        </button>
        <button
          type="button"
          onClick={() => setFormType('brief')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-black ${
            formType === 'brief'
              ? 'bg-[#0B1528] text-white shadow-sm font-semibold'
              : 'hover:text-black hover:bg-gray-100/50'
          }`}
        >
          Detailed Brief
        </button>
      </div>

      {/* Interactive State Area: Form OR Success State */}
      {!sent ? (
        formType === 'brief' ? (
          <div className="w-full flex flex-col gap-2 animate-in fade-in duration-200">
            <iframe
              src="https://tally.so/embed/EkYz1B?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              className="w-full h-[320px] rounded-2xl border-0 overflow-y-auto bg-gray-50/50 p-2 border border-gray-100/50"
              title="BubbleBitX Briefing Form"
            />
            <div className="text-center mt-1">
              <a
                href="https://tally.so/r/EkYz1B"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-gray-400 hover:text-black transition-colors inline-flex items-center gap-1 hover:underline font-medium"
              >
                Can't see the form? Open in a new tab <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          <form 
            id="contact-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1.5">
              <span id="vision-label" className="text-xs font-bold text-black uppercase tracking-tight">
                Tell us about your business
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="contact-name" className="sr-only">Full Name</label>
                <input
                  ref={nameInputRef}
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 min-w-0 text-sm px-3.5 py-2 rounded-xl border border-gray-100 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-black outline-none transition-all focus:bg-white"
                />
                <label htmlFor="contact-email" className="sr-only">Business Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="Business Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 text-sm px-3.5 py-2 rounded-xl border border-gray-100 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-black outline-none transition-all focus:bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="sr-only">Business Challenges and Goals</label>
              <textarea
                id="contact-message"
                required
                rows={2}
                placeholder="Describe your business challenges..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-100 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-black outline-none resize-none transition-all focus:bg-white"
              />
            </div>

            {/* Services Toggle Tag Chips */}
            <div className="flex flex-col gap-1.5 mt-0.5">
              <span id="help-label" className="text-xs font-bold text-black uppercase tracking-tight">
                Select core services...
              </span>
              <div id="service-tags-wrapper" className="flex flex-wrap gap-1">
                {SERVICES.map((service) => {
                  const isSelected = selected.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleToggleService(service)}
                      className={`text-[9px] sm:text-[10px] font-semibold px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/60 ${
                        isSelected
                          ? 'bg-gray-100 text-black border-black font-semibold'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black font-normal'
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {selected.includes("Other") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-1.5"
                  >
                    <label htmlFor="other-service-input" className="sr-only">Specify Other Service</label>
                    <input
                      id="other-service-input"
                      type="text"
                      required
                      placeholder="Please specify other service(s)..."
                      value={otherServiceText}
                      onChange={(e) => setOtherServiceText(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-1.5 sm:py-2.5 rounded-xl border border-gray-100 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-black outline-none transition-all focus:bg-white"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#0B1528] text-white text-sm font-semibold py-2.5 rounded-xl mt-1 hover:bg-[#15233c] focus:outline-none focus:ring-2 focus:ring-[#0B1528] focus:ring-offset-2 shadow-lg shadow-[#0B1528]/10 transition-all disabled:opacity-60 cursor-pointer"
            >
              {sending ? "Sending..." : "Get Free AI Strategy"}
            </button>
          </form>
        )
      ) : (
        /* Success State shown in place of the form */
        <div 
          id="success-state"
          className="flex flex-col items-center justify-center py-6 gap-3 text-center"
        >
          <div 
            id="check-pill"
            className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-xl text-green-600 font-bold"
          >
            ✓
          </div>
          <h3 id="success-heading" className="text-base font-semibold text-gray-900">
            You're all set!
          </h3>
          <p id="success-text" className="text-sm text-gray-500 max-w-xs leading-normal font-normal">
            Expect a reply within 24 hours, or secure a direct session on our calendar right now:
          </p>

          <div className="flex flex-col gap-2 w-full max-w-xs mt-1">
            <a
              href="https://calendly.com/bubblebitxt/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0B1528] hover:bg-[#15233c] text-white text-xs font-semibold py-2.5 rounded-xl transition-all text-center shadow-md flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B1528] focus:ring-offset-2"
            >
              Book Session Instantly <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={handleResetForm}
            className="mt-4 text-xs text-gray-400 hover:text-black hover:underline transition-all cursor-pointer focus:outline-none focus:underline"
          >
            Send another message
          </button>
        </div>
      )}

      {/* Unified Sleek Footer for email & socials */}
      <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1 px-1 border-t border-gray-100 pt-2 shrink-0 font-normal">
        <a href="mailto:hello@bubblebitx.com" className="hover:text-[#0B1528] transition-colors font-medium">
          hello@bubblebitx.com
        </a>
        <div className="flex items-center gap-2">
          <a href="https://in.linkedin.com/company/bubblebitx" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-all font-medium">LinkedIn</a>
          <span>•</span>
          <a href="https://www.instagram.com/bubblebitxt/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-all font-medium">Instagram</a>
          <span>•</span>
          <a href="https://www.youtube.com/@bubblebitx" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-all font-medium">YouTube</a>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
