import React, { useState, useRef } from 'react';
import { 
  Twitter, Circle, Instagram, Linkedin, Menu, X, 
  Cpu, Building, Layers, TrendingUp, ArrowLeft, ArrowRight, 
  ArrowUpRight, CheckCircle2, MessageSquare, Phone,
  Shield, Database, Activity, Search, Zap, Clock, Check,
  Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import bbxLogo from '/public/BBX-LOGO.png';
import OptimizedVideo from './components/OptimizedVideo';

// Required constants at the top of the file
const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4";

const CASE_STUDIES = [
  {
    id: "clinical-trial",
    num: "01",
    title: "Clinical Trial AI Platform",
    industry: "Healthcare • Pharmaceutical",
    challenge: "Clinical trials were delayed due to manual patient screening, protocol compliance issues, and slow safety monitoring.",
    solution: "Built a collaborative multi-agent AI platform that automated patient eligibility, protocol compliance, and real-time safety monitoring.",
    impact: [
      { stat: "40%", label: "Faster Recruitment", desc: "Accelerated patient screening and eligibility checks" },
      { stat: "58%", label: "Less Deviations", desc: "Fewer protocol non-compliance events" },
      { stat: "$200M+", label: "Losses Avoided", desc: "Estimated regulatory and delay expenses saved" }
    ],
    duration: "6 Months",
    architecture: [
      "Patient matching pipeline: Semantic analysis of EHR records against eligibility criteria",
      "Multi-agent compliance checker: Active screening of trial protocols in real-time",
      "Real-time safety telemetry agent: Monitoring adverse event reports for instant flags"
    ],
    tech: ["Gemini Pro", "Claude 3.5 Sonnet", "LangGraph", "Python", "Vector DB"]
  },
  {
    id: "enterprise-knowledge",
    num: "02",
    title: "Enterprise Knowledge AI",
    industry: "Legal • Compliance • Enterprise",
    challenge: "Employees struggled to search thousands of policies, contracts, and compliance documents.",
    solution: "Developed an enterprise Retrieval-Augmented Generation (RAG) platform with governed AI responses and complete audit trails.",
    impact: [
      { stat: "60%", label: "Research Savings", desc: "Reduction in document search and analysis time" },
      { stat: "100%", label: "Auditable Logs", desc: "Enterprise-grade complete audit trails for every query" },
      { stat: "Active", label: "Knowledge Assistant", desc: "Trusted internal conversational intelligence agent" }
    ],
    duration: "4 Months",
    architecture: [
      "Hierarchical Vector Chunking: Multi-tiered parsing of complex document hierarchies",
      "Hybrid Retrieval: Combined dense semantic search with sparse keyword indexing",
      "Strict Compliance Guardrails: Active validation to prevent hallucinations and leaks"
    ],
    tech: ["OpenAI GPT-4", "Pinecone", "LlamaIndex", "React", "Node.js", "AWS"]
  },
  {
    id: "supply-chain",
    num: "03",
    title: "Supply Chain AI Orchestrator",
    industry: "Logistics",
    challenge: "Disconnected planning systems caused inventory issues, delayed procurement, and inefficient routing.",
    solution: "Designed a multi-agent AI platform coordinating inventory, procurement, and routing decisions.",
    impact: [
      { stat: "20%", label: "Lower Logistics Costs", desc: "Optimized route planning and fuel consumption" },
      { stat: "15%", label: "Lower Inventory Costs", desc: "Dynamic restock triggers and demand predictions" },
      { stat: "Instant", label: "Disruption Response", desc: "Automatic rescheduling in response to weather/delay alerts" }
    ],
    duration: "4 Months",
    architecture: [
      "Multi-Agent Coordinator: Independent agents for warehouse, fleet, and procurement",
      "Time-Series Forecaster: Predictive models mapping seasonality and global trends",
      "Genetic Route Optimizer: Dynamically recalculated navigation grids based on live feeds"
    ],
    tech: ["Python", "FastStream", "Redis", "PostgreSQL", "Gemini Flash"]
  },
  {
    id: "workflow-automation",
    num: "04",
    title: "AI Workflow Automation",
    industry: "Business Operations",
    challenge: "Manual workflows across CRM, onboarding, reporting, and SaaS tools slowed business operations.",
    solution: "Built an intelligent automation platform using n8n and Large Language Models with self-healing workflows.",
    impact: [
      { stat: "50%", label: "Less Manual Work", desc: "Complete automation of back-office administrative tasks" },
      { stat: "Auto", label: "Intelligent Recovery", desc: "Self-healing workflows that fix dynamic API schema changes" },
      { stat: "Scale", label: "Business Engine", desc: "Seamless scaling of operations without adding headcount" }
    ],
    duration: "2.5 Months",
    architecture: [
      "Webhook-Triggered Orchestration: Zero-latency system integrations across services",
      "LLM Exception Classifier: Intelligent sorting of processing failures to retry",
      "Self-Healing State Machine: Automated fallback and payload correction routines"
    ],
    tech: ["n8n", "LangChain", "Make.com", "HubSpot", "Stripe", "OpenAI"]
  },
  {
    id: "product-intelligence",
    num: "05",
    title: "AI Product Classification",
    industry: "E-Commerce",
    challenge: "Thousands of products were manually categorized with inconsistent metadata.",
    solution: "Developed an NLP pipeline using BERT and custom entity extraction for automated product classification.",
    impact: [
      { stat: "30%", label: "Higher Accuracy", desc: "Precision improvements in search and product categorization" },
      { stat: "10,000+", label: "SKUs Daily", desc: "Automated processing of inventory additions" },
      { stat: "200h+", label: "Saved Monthly", desc: "Reclaimed hours spent on manual classification" }
    ],
    duration: "3 Months",
    architecture: [
      "Text Preparation Pipeline: Advanced tokenization, normalization, and language detection",
      "Fine-Tuned BERT Classifier: Core deep learning model optimized for retail taxonomies",
      "Custom NER Engine: Extraction of brand, sizing, color, and key attributes from text"
    ],
    tech: ["PyTorch", "HuggingFace", "FastAPI", "Docker", "PostgreSQL"]
  },
  {
    id: "security-assistant",
    num: "06",
    title: "AI Security Assistant",
    industry: "Cyber Security",
    challenge: "Security teams struggled with alert fatigue and slow incident analysis.",
    solution: "Created an AI-powered incident triage assistant that correlated SIEM alerts using LLMs and retrieval.",
    impact: [
      { stat: "Faster", label: "Incident Response", desc: "Rapid isolation and forensic query correlation" },
      { stat: "Reduced", label: "False Positives", desc: "Intelligent filtering of benign network noise" },
      { stat: "Enhanced", label: "Productivity", desc: "Gives security analysts instantaneous context summaries" }
    ],
    duration: "3 Months",
    architecture: [
      "Alert Correlation Router: Groups telemetry signals into unified timelines",
      "Retrieval-Augmented SIEM Query Engine: Automatic indexing of threat databases",
      "Dynamic Forensic Summarizer: Instant markdown threat analysis briefings"
    ],
    tech: ["Llama-3", "LangChain", "Qdrant", "Elasticsearch", "FastAPI"]
  }
];

const SERVICES = [
  "AI Receptionist",
  "Voice AI",
  "Lead Qualification",
  "CRM Automation",
  "Customer Support",
  "WhatsApp AI",
  "Marketing Automation",
  "Workflow Automation",
  "Custom AI System",
  "Other"
];

// Helper component for social icons
interface SocialBtnProps {
  icon: React.ReactNode;
  className: string;
  href: string;
  label: string;
}

function SocialBtn({ icon, className, href, label }: SocialBtnProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${className}`}
      aria-label={label}
    >
      {icon}
    </a>
  );
}

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

  // Case studies interactive states
  const [currentCaseIdx, setCurrentCaseIdx] = useState<number>(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any | null>(null);

  // Navigation sliding pages states
  const [activePage, setActivePage] = useState<string>('home');
  const [direction, setDirection] = useState<number>(0);

  const pageOrder = ['home', 'solutions', 'industries', 'how-it-works', 'case-studies'];

  const navigateToPage = (newPage: string) => {
    const currentIndex = pageOrder.indexOf(activePage);
    const newIndex = pageOrder.indexOf(newPage);
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

  // References for smooth scrolling and autofocus
  const cardRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Toggle selected service chips
  const handleToggleService = (service: string) => {
    setSelected(prev =>
      prev.includes(service)
         ? prev.filter(s => s !== service)
         : [...prev, service]
    );
  };

  // Triggered when clicking "Start a project" / "Book Strategy Call"
  const handleStartProject = () => {
    setMenuOpen(false);
    setActivePage('home');
    setDirection(-1);
    cardRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 400);
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
        <header 
          id="navbar-header" 
          className="absolute top-4 md:top-8 left-4 md:left-8 lg:left-12 right-4 md:right-8 lg:right-12 z-50 flex flex-col items-center lg:items-start gap-2"
        >
          <div 
            id="navbar-pill"
            className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm pl-3 sm:pl-4 pr-2 py-2 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-none lg:w-auto flex items-center justify-between lg:justify-start gap-4 lg:gap-6 border border-white/40"
          >
            {/* Stylized M Logo & Name */}
            <div id="navbar-logo-group" className="flex items-center gap-2">
              <img 
                src={bbxLogo} 
                alt="BBX Logo" 
                width={48}
                height={48}
                className="h-10 sm:h-12 w-auto object-contain shrink-0" 
                id="logo-img"
              />
              <span id="logo-text" className="font-bold text-sm sm:text-base tracking-tight text-black whitespace-nowrap">
                BubbleBitX
              </span>
            </div>

            {/* Navigation links (hidden on mobile/tablet, shown on desktop) */}
            <nav id="desktop-links" className="hidden lg:flex items-center gap-6">
              <a href="#solutions" onClick={(e) => { e.preventDefault(); navigateToPage('solutions'); }} className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap">Solutions</a>
              <a href="#industries" onClick={(e) => { e.preventDefault(); navigateToPage('industries'); }} className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap">Industries</a>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); navigateToPage('how-it-works'); }} className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap">How It Works</a>
              <a href="#case-studies" onClick={(e) => { e.preventDefault(); navigateToPage('case-studies'); }} className="text-gray-800 text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap">Case Studies</a>
            </nav>

            {/* Right side controls: Desktop CTA & Mobile Hamburger */}
            <div className="flex items-center gap-2">
              {/* Call-to-Action button - shown on desktop */}
              <button
                id="cta-start-project"
                onClick={handleStartProject}
                className="hidden lg:block bg-[#0B1528] text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-[#15233c] transition-colors cursor-pointer whitespace-nowrap"
              >
                Book Strategy Call
              </button>

              {/* Hamburger Button - shown below lg */}
              <button
                id="hamburger-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 text-black hover:bg-black/5 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Dropdown Menu - fully responsive */}
          {menuOpen && (
            <div 
              id="mobile-dropdown-menu"
              className="lg:hidden w-full max-w-md sm:max-w-xl md:max-w-2xl bg-white/85 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <nav className="flex flex-col gap-2">
                <a 
                  href="#solutions" 
                  onClick={(e) => { e.preventDefault(); navigateToPage('solutions'); }} 
                  className="px-3 py-2 text-gray-800 text-sm font-medium hover:bg-black/5 rounded-xl transition-colors"
                >
                  Solutions
                </a>
                <a 
                  href="#industries" 
                  onClick={(e) => { e.preventDefault(); navigateToPage('industries'); }} 
                  className="px-3 py-2 text-gray-800 text-sm font-medium hover:bg-black/5 rounded-xl transition-colors"
                >
                  Industries
                </a>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => { e.preventDefault(); navigateToPage('how-it-works'); }} 
                  className="px-3 py-2 text-gray-800 text-sm font-medium hover:bg-black/5 rounded-xl transition-colors"
                >
                  How It Works
                </a>
                <a 
                  href="#case-studies" 
                  onClick={(e) => { e.preventDefault(); navigateToPage('case-studies'); }} 
                  className="px-3 py-2 text-gray-800 text-sm font-medium hover:bg-black/5 rounded-xl transition-colors"
                >
                  Case Studies
                </a>
              </nav>
              <hr className="border-gray-200/55 my-1" />
              <button
                onClick={handleStartProject}
                className="w-full bg-[#0B1528] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#15233c] transition-colors cursor-pointer"
              >
                Book Strategy Call
              </button>
            </div>
          )}
        </header>

        {/* Interactive Content Layer */}
        <div 
          id="content-layer"
          className="relative z-10 flex flex-col h-full overflow-y-auto lg:overflow-hidden no-scrollbar p-4 sm:p-8 pt-24 sm:pt-28 lg:pt-8"
        >
          {/* Absolute layout container for Hero & Form */}
          <div 
            id="bottom-row"
            className="relative lg:absolute lg:inset-0 pointer-events-auto lg:pointer-events-none flex flex-col lg:block w-full min-h-full lg:min-h-0 mt-4 lg:mt-0 pb-8 lg:pb-0 gap-8 sm:gap-12"
          >
            {/* Headline Section (Left) */}
            <div 
              id="headline-wrapper" 
              className="relative lg:absolute pointer-events-auto left-0 lg:left-12 bottom-0 lg:bottom-12 lg:top-auto lg:translate-y-0 w-full lg:w-auto max-w-full lg:max-w-2xl z-40 text-left p-4 sm:p-8 rounded-[20px] sm:rounded-[24px] shrink-0 bg-white/[0.02] backdrop-blur-[6px] border border-white/10 shadow-2xl transition-all duration-300"
            >
              <h1 
                id="headline-paragraph"
                className="text-white text-3xl sm:text-5xl xl:text-6xl font-medium leading-[1.15] sm:leading-[1.1] text-left tracking-tight drop-shadow-sm"
              >
                AI Employees <br />
                Built for <br />
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }} className="text-3.5xl sm:text-6.5xl xl:text-7.5xl text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]">Growing Businesses.</span>
              </h1>
              <p className="text-white/90 text-sm sm:text-base mt-4 font-normal tracking-wide max-w-sm drop-shadow-sm">
                Reduce costs. Automate operations. Increase revenue.
              </p>
            </div>

            {/* Contact Form Card (Right) */}
            <div 
              ref={cardRef}
              id="contact-form-outer"
              className="relative lg:absolute pointer-events-auto right-0 lg:right-12 bottom-0 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 left-0 lg:left-auto w-full max-w-md lg:max-w-none lg:w-[440px] z-40 mx-auto lg:mx-0 shrink-0"
            >
              <div 
                id="contact-card"
                className={`bg-white rounded-[32px] shadow-2xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col ${
                  activePage === 'case-studies'
                    ? 'p-3.5 sm:p-5 lg:p-3.5 xl:p-5 gap-2.5 sm:gap-3.5 lg:gap-2.5 xl:gap-3.5'
                    : 'p-4 sm:p-6 lg:p-4 xl:p-6 gap-3.5 sm:gap-4 lg:gap-3 xl:gap-4'
                }`}
              >
                {/* Horizontal Navigation Dots / Tiny Pills for the slide deck */}
                <div id="card-nav-tabs" className="flex items-center justify-between gap-0.5 bg-gray-50 p-1 rounded-2xl border border-gray-100">
                  {pageOrder.map((page) => {
                    const isActive = activePage === page;
                    const label = page === 'home' ? 'Contact' : page === 'how-it-works' ? 'Process' : page === 'case-studies' ? 'Cases' : page.charAt(0).toUpperCase() + page.slice(1);
                    return (
                      <button
                        key={page}
                        onClick={() => navigateToPage(page)}
                        className={`text-[9px] sm:text-[10px] font-semibold px-1 py-1.5 rounded-xl transition-all flex-1 text-center cursor-pointer whitespace-nowrap ${
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
                <div className="relative overflow-hidden w-full">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={activePage}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full flex flex-col justify-between"
                    >
                      {activePage === 'home' && (
                        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
                          {/* Heading */}
                          <h2 id="form-heading" className="text-xl sm:text-2xl xl:text-3xl font-semibold text-black tracking-tight leading-tight">
                            Let's Build Your <br />AI Workforce
                          </h2>

                          {/* Email + Socials Row */}
                          <div 
                            id="socials-row"
                            className="flex flex-row items-center justify-between gap-3 bg-gray-50 rounded-2xl px-4 py-2 sm:py-2.5 lg:py-1.5 xl:py-2.5"
                          >
                            <div className="flex flex-col min-w-0">
                              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                                Drop us a line
                              </span>
                              <a 
                                href="mailto:hello@bubblebitx.com" 
                                className="text-blue-600 font-semibold hover:underline truncate text-sm sm:text-base"
                              >
                                hello@bubblebitx.com
                              </a>
                            </div>

                            <div id="socials-buttons" className="flex items-center gap-2 shrink-0">
                              <SocialBtn
                                href="https://in.linkedin.com/company/bubblebitx"
                                className="bg-blue-50 border border-blue-100/60 text-blue-600 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-200 transition-all"
                                label="Bubblebitx LinkedIn"
                                icon={<Linkedin className="w-[14px] h-[14px]" strokeWidth={2.2} />}
                              />
                              <SocialBtn
                                href="https://www.instagram.com/bubblebitxt/"
                                className="bg-pink-50 border border-pink-100/60 text-pink-500 hover:bg-pink-100 hover:text-pink-600 hover:border-pink-200 transition-all"
                                label="Instagram"
                                icon={<Instagram className="w-[14px] h-[14px]" strokeWidth={2.2} />}
                              />
                              <SocialBtn
                                href="https://www.youtube.com/@bubblebitx"
                                className="bg-red-50 border border-red-100/60 text-red-500 hover:bg-red-100 hover:text-red-600 hover:border-red-200 transition-all"
                                label="YouTube"
                                icon={<Youtube className="w-[14px] h-[14px]" strokeWidth={2.2} />}
                              />
                            </div>
                          </div>

                          {/* OR Divider */}
                          <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-gray-100" />
                            <span className="text-gray-400 font-medium text-xs uppercase tracking-widest">OR</span>
                            <div className="flex-1 h-px bg-gray-100" />
                          </div>

                          {/* Interactive State Area: Form OR Success State */}
                          {!sent ? (
                            <form 
                              id="contact-form"
                              onSubmit={handleSubmit}
                              className="flex flex-col gap-3"
                            >
                              <div className="flex flex-col gap-1.5">
                                <label id="vision-label" className="text-xs font-bold text-black uppercase tracking-tight">
                                  Tell us about your business
                                </label>
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
                                    className="flex-1 min-w-0 text-sm px-4 py-2 sm:py-2.5 lg:py-1.5 xl:py-2.5 rounded-xl border border-gray-100 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-black outline-none transition-all"
                                  />
                                  <label htmlFor="contact-email" className="sr-only">Business Email</label>
                                  <input
                                    id="contact-email"
                                    type="email"
                                    required
                                    placeholder="Business Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 min-w-0 text-sm px-4 py-2 sm:py-2.5 lg:py-1.5 xl:py-2.5 rounded-xl border border-gray-100 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-black outline-none transition-all"
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
                                  className="w-full text-sm px-4 py-2 sm:py-2.5 lg:py-1.5 xl:py-2.5 rounded-xl border border-gray-100 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-black outline-none resize-none transition-all"
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
                                        className={`text-[9px] sm:text-[10px] font-semibold px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border transition-all cursor-pointer ${
                                          isSelected
                                            ? 'bg-gray-100 text-black border-black'
                                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
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
                                        className="w-full text-xs sm:text-sm px-3.5 py-1.5 sm:py-2.5 rounded-xl border border-gray-100 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-black outline-none transition-all"
                                      />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              {/* Submit Button */}
                              <button
                                type="submit"
                                disabled={sending}
                                className="w-full bg-[#0B1528] text-white text-sm font-semibold py-2.5 sm:py-3.5 rounded-2xl mt-1.5 lg:mt-1 xl:mt-2 hover:bg-[#15233c] shadow-lg shadow-[#0B1528]/10 transition-all disabled:opacity-60 cursor-pointer"
                              >
                                {sending ? "Sending..." : "Get Free AI Strategy"}
                              </button>
                            </form>
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
                              <p id="success-text" className="text-sm text-gray-500">
                                Expect a reply within 24 hours.
                              </p>

                              <button
                                type="button"
                                onClick={handleResetForm}
                                className="mt-4 text-xs text-gray-500 hover:text-black hover:underline transition-all cursor-pointer"
                              >
                                Send another message
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {activePage === 'solutions' && (
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
                            <p className="text-xs text-gray-500">Deploy fully-integrated digital employees configured for your goals.</p>
                          </div>

                          {/* Items */}
                          <div className="flex flex-col gap-2.5">
                            <div className="p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/70 border border-gray-100 transition-all flex gap-3">
                              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                <MessageSquare className="w-4 h-4" />
                              </div>
                              <div>
                                <h3 className="text-xs sm:text-sm font-bold text-black">AI Receptionist & Lead Qualifier</h3>
                                <p className="text-[11px] text-gray-500 mt-0.5">Captures, qualifies, and schedules meetings 24/7 on complete autopilot.</p>
                              </div>
                            </div>

                            <div className="p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/70 border border-gray-100 transition-all flex gap-3">
                              <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-500 flex items-center justify-center shrink-0">
                                <Phone className="w-4 h-4" />
                              </div>
                              <div>
                                <h3 className="text-xs sm:text-sm font-bold text-black">Intelligent Voice Agent</h3>
                                <p className="text-[11px] text-gray-500 mt-0.5">Automates voice customer telephone supports and outbound scheduling calls.</p>
                              </div>
                            </div>

                            <div className="p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/70 border border-gray-100 transition-all flex gap-3">
                              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-400 flex items-center justify-center shrink-0">
                                <Layers className="w-4 h-4" />
                              </div>
                              <div>
                                <h3 className="text-xs sm:text-sm font-bold text-black">Operations & CRM Sync</h3>
                                <p className="text-[11px] text-gray-500 mt-0.5">Synchronizes WhatsApp, Gmail, Stripe, and HubSpot in high-fidelity.</p>
                              </div>
                            </div>
                          </div>

                          {/* Footer navigation */}
                          <div className="flex items-center justify-between gap-3 mt-2 pt-3.5 border-t border-gray-100">
                            <button 
                              onClick={() => navigateToPage('home')} 
                              className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" /> Contact Form
                            </button>
                            <button 
                              onClick={() => navigateToPage('industries')} 
                              className="bg-[#0B1528] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#15233c] transition-colors cursor-pointer flex items-center gap-1"
                            >
                              Next: Industries <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {activePage === 'industries' && (
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
                            <p className="text-xs text-gray-500">Customized integrations that deliver massive business results.</p>
                          </div>

                          {/* Items */}
                          <div className="flex flex-col gap-2.5">
                            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all">
                              <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-bold text-black">Real Estate & Agencies</span>
                                <span className="text-[9px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full">+43% Tours Booked</span>
                              </div>
                              <p className="text-[11px] text-gray-500 mt-1">Immediate lead qualification, automated property details, and scheduling.</p>
                            </div>

                            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all">
                              <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-bold text-black">E-Commerce & Brands</span>
                                <span className="text-[9px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full">84% Auto Resolved</span>
                              </div>
                              <p className="text-[11px] text-gray-500 mt-1">Order tracking lookups, returns collection, and abandoned cart recovery.</p>
                            </div>

                            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all">
                              <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-bold text-black">Professional & SaaS</span>
                                <span className="text-[9px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full">4x Conv. Rates</span>
                              </div>
                              <p className="text-[11px] text-gray-500 mt-1">Immediate trial follow-up, customer onboarding, and secure system support.</p>
                            </div>
                          </div>

                          {/* Footer navigation */}
                          <div className="flex items-center justify-between gap-3 mt-2 pt-3.5 border-t border-gray-100">
                            <button 
                              onClick={() => navigateToPage('solutions')} 
                              className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" /> Solutions
                            </button>
                            <button 
                              onClick={() => navigateToPage('how-it-works')} 
                              className="bg-[#0B1528] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#15233c] transition-colors cursor-pointer flex items-center gap-1"
                            >
                              Next: Process <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {activePage === 'how-it-works' && (
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
                            <p className="text-xs text-gray-500">Simple onboarding structure for your brand-new digital employees.</p>
                          </div>

                          {/* Stepped timeline */}
                          <div className="flex flex-col gap-3.5 mt-1 relative pl-5 border-l border-gray-100 ml-3.5">
                            <div className="relative">
                              <span className="absolute -left-[27px] top-0.5 w-4 h-4 rounded-full bg-black border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">1</span>
                              <h3 className="text-xs sm:text-sm font-bold text-black">AI Blueprint & Design</h3>
                              <p className="text-[11px] text-gray-500 mt-0.5">We analyze your historical logs and procedures to outline the absolute best automation blueprints.</p>
                            </div>

                            <div className="relative">
                              <span className="absolute -left-[27px] top-0.5 w-4 h-4 rounded-full bg-black border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">2</span>
                              <h3 className="text-xs sm:text-sm font-bold text-black">Model Engineering & Training</h3>
                              <p className="text-[11px] text-gray-500 mt-0.5">We feed custom context files and configure speech latency to craft beautiful dedicated system agents.</p>
                            </div>

                            <div className="relative">
                              <span className="absolute -left-[27px] top-0.5 w-4 h-4 rounded-full bg-black border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">3</span>
                              <h3 className="text-xs sm:text-sm font-bold text-black">Full Launch & Synchronization</h3>
                              <p className="text-[11px] text-gray-500 mt-0.5">Agents plug directly into CRM systems, WhatsApp numbers, and active telephone networks.</p>
                            </div>
                          </div>

                          {/* Footer navigation */}
                          <div className="flex items-center justify-between gap-3 mt-2 pt-3.5 border-t border-gray-100">
                            <button 
                              onClick={() => navigateToPage('industries')} 
                              className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" /> Industries
                            </button>
                            <button 
                              onClick={() => navigateToPage('case-studies')} 
                              className="bg-[#0B1528] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#15233c] transition-colors cursor-pointer flex items-center gap-1"
                            >
                              Next: Cases <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {activePage === 'case-studies' && (
                        <div className="flex flex-col gap-2.5 sm:gap-3 lg:gap-2.5 xl:gap-3.5 animate-in fade-in duration-200">
                          {/* Heading */}
                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1.5">
                              <div className="p-1 rounded bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                                <TrendingUp className="w-3 h-3" />
                              </div>
                              <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-400 font-extrabold">Proof & Impact</span>
                            </div>
                            <h2 className="text-xs sm:text-sm lg:text-xs xl:text-sm font-extrabold text-black tracking-tight mt-0.5 leading-snug">
                              Real AI Systems. Real Business Results.
                            </h2>
                            <p className="text-[9px] sm:text-[10px] text-gray-500 leading-normal hidden sm:block">
                              We deploy production-ready AI systems that solve complex business problems.
                            </p>
                          </div>

                          {/* Metrics mini grid: 4 columns to save massive vertical height */}
                          <div className="grid grid-cols-4 gap-1 sm:gap-1.5 bg-gray-50/50 p-1 sm:p-1.5 rounded-xl border border-gray-100/85">
                            <div className="bg-white p-1 sm:p-1.5 rounded-lg border border-gray-100/50 shadow-sm flex flex-col items-center justify-center text-center">
                              <span className="text-[9px] sm:text-[11px] lg:text-[9px] xl:text-[11px] font-extrabold text-[#0B1528] font-mono leading-none">10+</span>
                              <span className="text-[7px] text-gray-400 font-semibold leading-tight mt-0.5">Projects</span>
                            </div>
                            <div className="bg-white p-1 sm:p-1.5 rounded-lg border border-gray-100/50 shadow-sm flex flex-col items-center justify-center text-center">
                              <span className="text-[9px] sm:text-[11px] lg:text-[9px] xl:text-[11px] font-extrabold text-green-600 font-mono leading-none">50%+</span>
                              <span className="text-[7px] text-gray-400 font-semibold leading-tight mt-0.5">Efficiency</span>
                            </div>
                            <div className="bg-white p-1 sm:p-1.5 rounded-lg border border-gray-100/50 shadow-sm flex flex-col items-center justify-center text-center">
                              <span className="text-[9px] sm:text-[11px] lg:text-[9px] xl:text-[11px] font-extrabold text-[#0B1528] font-mono leading-none">$155K+</span>
                              <span className="text-[7px] text-gray-400 font-semibold leading-tight mt-0.5">Delivered</span>
                            </div>
                            <div className="bg-white p-1 sm:p-1.5 rounded-lg border border-gray-100/50 shadow-sm flex flex-col items-center justify-center text-center">
                              <span className="text-[9px] sm:text-[11px] lg:text-[9px] xl:text-[11px] font-extrabold text-pink-600 font-mono leading-none">Millions</span>
                              <span className="text-[7px] text-gray-400 font-semibold leading-tight mt-0.5">Impact</span>
                            </div>
                          </div>

                          {/* Horizontal slider control */}
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[9px] text-gray-400 font-mono font-bold">
                              Featured Cases ({currentCaseIdx + 1}/6)
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setCurrentCaseIdx(prev => prev === 0 ? CASE_STUDIES.length - 1 : prev - 1)}
                                className="w-5 h-5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-all cursor-pointer"
                                aria-label="Previous case study"
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setCurrentCaseIdx(prev => prev === CASE_STUDIES.length - 1 ? 0 : prev + 1)}
                                className="w-5 h-5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-all cursor-pointer"
                                aria-label="Next case study"
                              >
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* Current Case Card with the requested visual structure */}
                          {(() => {
                            const cs = CASE_STUDIES[currentCaseIdx];
                            return (
                              <div key={cs.id} className="p-2.5 sm:p-3 bg-[#0B1528] text-white rounded-2xl flex flex-col gap-1.5 sm:gap-2 relative overflow-hidden shadow-md animate-in fade-in duration-300">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-bl-full pointer-events-none" />
                                
                                <div className="flex justify-between items-center">
                                  <span className="text-[8px] font-extrabold uppercase tracking-widest text-pink-300 bg-pink-950/45 px-2 py-0.5 rounded-md">
                                    {cs.industry.split(' • ')[0]}
                                  </span>
                                  <span className="text-[8px] sm:text-[9px] font-mono text-gray-400 font-bold">
                                    {cs.duration}
                                  </span>
                                </div>

                                <h4 className="text-[11px] sm:text-xs font-extrabold text-white tracking-tight leading-snug">
                                  {cs.title}
                                </h4>

                                <p className="text-[9px] sm:text-[10px] text-gray-300 leading-relaxed line-clamp-1 sm:line-clamp-2">
                                  {cs.challenge}
                                </p>

                                {/* Mini impact grid */}
                                <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
                                  {cs.impact.map((imp, idx) => (
                                    <div key={idx} className="flex flex-col text-center py-0.5">
                                      <span className="text-[9px] sm:text-[10px] font-extrabold text-green-300 font-mono leading-none">
                                        {imp.stat}
                                      </span>
                                      <span className="text-[7px] text-gray-300 font-semibold leading-tight mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis px-0.5">
                                        {imp.label}
                                      </span>
                                    </div>
                                  ))}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setSelectedCaseStudy(cs)}
                                  className="w-full bg-white hover:bg-gray-100 text-[#0B1528] text-[9px] sm:text-[10px] font-bold py-1 sm:py-1.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer mt-0.5"
                                >
                                  View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })()}

                          {/* Footer navigation */}
                          <div className="flex items-center justify-between gap-3 mt-0.5 pt-2 border-t border-gray-100">
                            <button 
                              type="button"
                              onClick={() => navigateToPage('how-it-works')} 
                              className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1 cursor-pointer"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" /> Process
                            </button>
                            <button 
                              type="button"
                              onClick={() => navigateToPage('home')} 
                              className="bg-[#0B1528] hover:bg-[#15233c] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-[#0B1528]/10"
                            >
                              Get Started Now <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Screen Immersive Case Study Overlay with Glassmorphism */}
        <AnimatePresence>
          {selectedCaseStudy && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 z-50 bg-[#0B1528]/95 sm:bg-[#0B1528]/85 backdrop-blur-xl text-white flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 select-none overflow-hidden"
            >
              {/* Top Bar matching landing page logo & layout */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={bbxLogo} 
                    alt="BBX Logo" 
                    width={40}
                    height={40}
                    className="h-8 sm:h-10 w-auto object-contain shrink-0" 
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm tracking-tight text-white leading-none">
                      BubbleBitX Intel
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-pink-400 font-mono font-bold mt-0.5">
                      Production Systems
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedCaseStudy(null)}
                    className="hidden sm:flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer bg-white/5 px-3 py-1.5 rounded-xl border border-white/5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-pink-400" /> Back to Site
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCaseStudy(null)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                    aria-label="Close Case Study"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Main Content Area: Responsive side-by-side layout */}
              <div className="flex-1 min-h-0 my-4 sm:my-6 overflow-y-auto lg:overflow-hidden no-scrollbar lg:grid lg:grid-cols-12 lg:gap-8">
                
                {/* Left Column (Details, Challenge, Solution, CTA) */}
                <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-5 overflow-y-auto pr-0 lg:pr-2 no-scrollbar lg:h-full shrink-0">
                  {/* Header info */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-pink-300 bg-pink-950/60 border border-pink-500/20 px-2.5 py-1 rounded-lg">
                        {selectedCaseStudy.industry}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-300 font-mono">
                        <Clock className="w-3.5 h-3.5 text-pink-300" /> {selectedCaseStudy.duration} Deployment
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2.5 sm:gap-4 mt-1">
                      <span className="text-2xl sm:text-4xl font-mono font-extrabold text-pink-500/25 select-none leading-none">
                        {selectedCaseStudy.num}
                      </span>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-3.5xl font-extrabold text-white tracking-tight leading-tight">
                        {selectedCaseStudy.title}
                      </h2>
                    </div>
                  </div>

                  {/* Challenge Block */}
                  <div className="bg-[#15233c]/40 backdrop-blur-sm border border-white/5 p-4 sm:p-5 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-400" />
                    <h4 className="text-[10px] uppercase tracking-widest text-red-400 font-extrabold mb-1.5">
                      The Challenge
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-200 font-normal leading-relaxed">
                      {selectedCaseStudy.challenge}
                    </p>
                  </div>

                  {/* Solution Block */}
                  <div className="bg-[#15233c]/40 backdrop-blur-sm border border-white/5 p-4 sm:p-5 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-400" />
                    <h4 className="text-[10px] uppercase tracking-widest text-green-400 font-extrabold mb-1.5">
                      Our Solution
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-200 font-normal leading-relaxed">
                      {selectedCaseStudy.solution}
                    </p>
                  </div>

                  {/* Strategy Call Floating CTA */}
                  <div className="p-4 bg-gradient-to-r from-pink-900/10 to-slate-900/25 backdrop-blur-sm border border-pink-500/20 rounded-2xl flex flex-col gap-3 relative overflow-hidden shadow-md">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-500/20 to-transparent rounded-bl-full pointer-events-none" />
                    <div>
                      <h4 className="text-xs font-extrabold text-white tracking-tight">
                        Ready to build your next AI success story?
                      </h4>
                      <p className="text-[10px] text-gray-300 mt-0.5 leading-normal font-normal">
                        Let's identify where AI can create measurable business impact for your organization.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCaseStudy(null);
                        handleStartProject();
                      }}
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white text-[11px] font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                    >
                      Schedule Free Strategy Call <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Column (Architecture, Business Impact, Tech Stack) */}
                <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-5 mt-6 lg:mt-0 overflow-y-auto pr-0 lg:pr-2 no-scrollbar lg:h-full">
                  
                  {/* Systems Architecture list */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-[10px] uppercase tracking-widest text-pink-300 font-extrabold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" /> System Architecture & AI Data Flow
                    </h4>
                    <div className="flex flex-col gap-2.5">
                      {selectedCaseStudy.architecture.map((step: string, idx: number) => {
                        const parts = step.split(': ');
                        const title = parts[0];
                        const desc = parts.slice(1).join(': ');
                        return (
                          <div key={idx} className="flex gap-3 bg-[#15233c]/30 backdrop-blur-sm border border-white/5 p-3.5 rounded-xl hover:border-pink-500/20 transition-all duration-300">
                            <div className="w-6 h-6 rounded-full bg-pink-500/10 text-pink-300 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                              {idx + 1}
                            </div>
                            <div className="flex flex-col justify-center">
                              <h5 className="text-xs font-extrabold text-white">{title}</h5>
                              <p className="text-[11px] text-gray-300 mt-0.5 leading-normal">{desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Business Impact Checklist */}
                  <div className="bg-[#15233c]/50 backdrop-blur-sm border border-pink-500/10 p-5 rounded-2xl flex flex-col gap-3 relative overflow-hidden shadow-md">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500/5 to-transparent rounded-bl-full pointer-events-none" />
                    <h4 className="text-[10px] uppercase tracking-widest text-green-400 font-extrabold flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" /> Business Impact Delivered
                    </h4>
                    <div className="flex flex-col gap-3">
                      {selectedCaseStudy.impact.map((imp: any, idx: number) => (
                        <div key={idx} className="flex gap-2.5 items-start">
                          <div className="p-1 rounded bg-green-500/10 text-green-400 flex items-center justify-center mt-0.5 shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-sm font-mono font-extrabold text-green-300 leading-none">
                                {imp.stat}
                              </span>
                              <span className="text-[11px] font-bold text-white">
                                {imp.label}
                              </span>
                            </div>
                            {imp.desc && (
                              <p className="text-[10px] text-gray-300 mt-0.5 leading-normal font-normal">
                                {imp.desc}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Utilized */}
                  <div className="flex flex-col gap-2.5">
                    <h4 className="text-[10px] uppercase tracking-widest text-pink-300 font-extrabold flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5" /> Core Integration Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCaseStudy.tech.map((t: string) => (
                        <span
                          key={t}
                          className="bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-all font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Browse/Switch Case Study bottom bar */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5 shrink-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <h4 className="text-[11px] font-extrabold text-white uppercase tracking-widest flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-pink-400" /> Explore Other Case Studies
                  </h4>
                  <span className="text-[9px] text-gray-400 font-mono hidden sm:inline">Select another case study to transition instantly</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {CASE_STUDIES.map((cs) => {
                    const isActive = cs.id === selectedCaseStudy.id;
                    return (
                      <button
                        key={cs.id}
                        type="button"
                        onClick={() => setSelectedCaseStudy(cs)}
                        className={`group p-2 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                          isActive
                            ? 'bg-[#15233c] border-pink-500/40 text-white font-semibold'
                            : 'bg-[#15233c]/15 border-white/5 text-gray-300 hover:bg-[#15233c]/30 hover:border-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-[8px] font-mono font-bold text-gray-400 group-hover:text-pink-300 transition-colors">
                              Case #{cs.num}
                            </span>
                            {isActive && (
                              <span className="text-[7px] font-extrabold uppercase tracking-wider text-pink-300 bg-pink-950/80 px-1 py-0.2 rounded border border-pink-500/20">
                                Active
                              </span>
                            )}
                          </div>
                          <h5 className="text-[9px] font-extrabold leading-tight line-clamp-1">{cs.title}</h5>
                        </div>
                        <div className="flex items-center gap-0.5 text-[8px] font-bold mt-1 text-pink-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-2px] group-hover:translate-x-0">
                          Inspect <ArrowRight className="w-2.5 h-2.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
