import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import OptimizedVideo from './components/OptimizedVideo';
import Header from './components/layout/Header';
import HeroSection from './components/layout/HeroSection';
import BbxCard from './components/bbx/BbxCard';
import CaseStudyOverlay from './components/bbx/CaseStudyOverlay';
import { CaseStudy } from './types';
import { PAGE_ORDER } from './constants/caseStudies';

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4";

export default function App() {
  // Required states
  const [selected, setSelected] = useState<string[]>([]);
  const [otherServiceText, setOtherServiceText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<'quick' | 'brief'>('quick');

  // Case studies interactive states
  const [currentCaseIdx, setCurrentCaseIdx] = useState<number>(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  // Navigation sliding pages states
  const [activePage, setActivePage] = useState<string>('home');
  const [direction, setDirection] = useState<number>(0);

  // References for smooth scrolling and autofocus
  const cardRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const navigateToPage = (newPage: string) => {
    const currentIndex = PAGE_ORDER.indexOf(activePage);
    const newIndex = PAGE_ORDER.indexOf(newPage);
    if (newIndex > currentIndex) {
      setDirection(1);
    } else if (newIndex < currentIndex) {
      setDirection(-1);
    } else {
      setDirection(0);
    }
    setActivePage(newPage);
    setMenuOpen(false);
    
    // Smooth scroll the interactive card into view for mobile users
    cardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Toggle selected service chips
  const handleToggleService = (service: string) => {
    setSelected(prev =>
      prev.includes(service)
         ? prev.filter(s => s !== service)
         : [...prev, service]
    );
  };

  // Motion sliding variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -150 : 150,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.15 }
      }
    })
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSending(true);

    const servicesText = selected.map(s => {
      if (s === "Other" && otherServiceText.trim()) {
        return `Other: ${otherServiceText.trim()}`;
      }
      return s;
    }).join(", ") || "None selected";

    const discordPayload = {
      embeds: [
        {
          title: "🚀 New AI Strategy Request - BubbleBitX",
          color: 0x000000,
          fields: [
            {
              name: "👤 Name",
              value: name.trim(),
              inline: true
            },
            {
              name: "✉️ Email",
              value: email.trim(),
              inline: true
            },
            {
              name: "🛠️ Requested Services",
              value: servicesText,
              inline: false
            },
            {
              name: "💬 Message / Goals",
              value: message.trim() || "No message provided",
              inline: false
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Forma / BubbleBitX Landing Page"
          }
        }
      ]
    };

    try {
      const response = await fetch("https://discord.com/api/webhooks/1513078599031459910/WHakJTmbkPM81iQp7JY3DWFE7kfZaEX3AkSbi3oKP3Ml9gV9aP5ebAwhh4hxe3U08qb8", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(discordPayload)
      });

      if (!response.ok) {
        console.error("Failed to send lead to Discord: Status " + response.status);
      }
    } catch (err) {
      console.error("Error sending lead to Discord webhook:", err);
    } finally {
      setSent(true);
      setSending(false);
    }
  };

  // Reset form to allow another submission
  const handleResetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSelected([]);
    setOtherServiceText("");
    setSent(false);
  };

  return (
    <div id="landing-root" className="fixed inset-0 overflow-hidden bg-white p-3 sm:p-4 md:p-6 flex flex-col justify-center box-border">
      {/* Outer Rounded Container Card with Clean Minimalism shadow and border-radius */}
      <div 
        id="video-container-card"
        className="relative w-full h-full rounded-[32px] overflow-hidden bg-black shadow-sm"
      >
        {/* Full-screen Background Video */}
        <OptimizedVideo src={VIDEO_URL} />

        {/* Ambient minimalist light dark scrim for elegant typography contrast */}
        <div className="absolute inset-0 bg-black/10 z-0" />

        {/* Navbar (Top) - Outside content-layer to remain fixed on all devices */}
        <Header 
          activePage={activePage}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          navigateToPage={navigateToPage}
        />

        {/* Interactive Content Layer */}
        <div 
          id="content-layer"
          className="relative z-10 flex flex-col h-full overflow-y-auto lg:overflow-hidden no-scrollbar px-5 pb-8 pt-24 sm:px-8 sm:pb-8 sm:pt-28 lg:pt-8"
        >
          {/* Absolute layout container for Hero & Form */}
          <div 
            id="bottom-row"
            className="relative lg:absolute lg:inset-0 pointer-events-auto lg:pointer-events-none flex flex-col lg:block w-full max-w-7xl mx-auto min-h-full lg:min-h-0 mt-2 lg:mt-0 pb-8 lg:pb-0 gap-8 sm:gap-12"
          >
            {/* Headline Section (Left) */}
            <HeroSection />

            {/* Contact Form Card (Right) */}
            <BbxCard
              cardRef={cardRef}
              activePage={activePage}
              direction={direction}
              navigateToPage={navigateToPage}
              slideVariants={slideVariants}
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
              currentCaseIdx={currentCaseIdx}
              setCurrentCaseIdx={setCurrentCaseIdx}
              setSelectedCaseStudy={setSelectedCaseStudy}
            />
          </div>
        </div>

        {/* Full-Screen Immersive Case Study Overlay with Glassmorphism */}
        <AnimatePresence>
          {selectedCaseStudy && (
            <CaseStudyOverlay
              selectedCaseStudy={selectedCaseStudy}
              setSelectedCaseStudy={setSelectedCaseStudy}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
