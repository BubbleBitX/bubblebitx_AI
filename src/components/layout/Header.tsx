import React from 'react';
import { Menu, X } from 'lucide-react';
// @ts-ignore
import bbxLogo from '/public/BBX-LOGO.png';

interface HeaderProps {
  activePage: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  navigateToPage: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  menuOpen,
  setMenuOpen,
  navigateToPage
}) => {
  const navLinks = [
    { id: 'solutions', label: 'Solutions' },
    { id: 'industries', label: 'Industries' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'case-studies', label: 'Case Studies' },
  ];

  return (
    <header 
      id="navbar-header" 
      className="absolute top-4 md:top-8 left-4 md:left-8 lg:left-12 right-4 md:right-8 lg:right-12 z-50 flex flex-col items-center lg:items-start gap-2 pointer-events-none"
    >
      <div 
        id="navbar-pill"
        className="bg-white/60 backdrop-blur-md rounded-2xl shadow-sm pl-3 sm:pl-4 pr-2 py-2 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-none lg:w-auto flex items-center justify-between lg:justify-start gap-4 lg:gap-6 border border-white/40 pointer-events-auto"
      >
        {/* Stylized Logo & Name */}
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
        <nav id="desktop-links" className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                navigateToPage(link.id);
              }}
              className={`text-sm font-medium transition-opacity whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-black/50 rounded-md px-1.5 py-0.5 ${
                activePage === link.id ? 'text-black opacity-100' : 'text-gray-800 opacity-80 hover:opacity-100'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side controls: Desktop CTA & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          {/* Call-to-Action button - shown on desktop */}
          <a
            id="cta-start-project"
            href="https://calendly.com/bubblebitxt/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center justify-center bg-[#0B1528] text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-[#15233c] focus:outline-none focus:ring-2 focus:ring-[#0B1528] focus:ring-offset-2 transition-colors cursor-pointer whitespace-nowrap"
          >
            Book Strategy Call
          </a>

          {/* Hamburger Button - shown below lg */}
          <button
            id="hamburger-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-black hover:bg-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-colors cursor-pointer flex items-center justify-center"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Menu - fully responsive */}
      {menuOpen && (
        <div 
          id="mobile-dropdown-menu"
          className="lg:hidden w-full max-w-md sm:max-w-xl md:max-w-2xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto"
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage(link.id);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-black ${
                  activePage === link.id 
                    ? 'bg-black/5 text-black font-semibold' 
                    : 'text-gray-800 hover:bg-black/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <hr className="border-gray-200/55 my-1" />
          <a
            href="https://calendly.com/bubblebitxt/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="w-full bg-[#0B1528] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-[#15233c] focus:outline-none focus:ring-2 focus:ring-[#0B1528] focus:ring-offset-2 transition-colors cursor-pointer text-center block"
          >
            Book Strategy Call
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
