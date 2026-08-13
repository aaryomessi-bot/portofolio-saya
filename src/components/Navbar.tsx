import React from 'react';

interface NavbarProps {
  activeSection: string;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenTerminal }) => {
  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'about', label: 'Tentang' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Proyek' },
    { id: 'contact', label: 'Kontak' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-[30px] border-b border-white/10 hidden md:block transition-all shadow-2xl">
      <div className="flex justify-between items-center px-8 py-4 max-w-[1280px] mx-auto">
        <a 
          href="#home" 
          className="font-montserrat text-[22px] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-400 hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl shadow-lg border border-white/20 flex items-center justify-center text-white text-xs font-bold">
            AP
          </div>
          <span>APN_PORTFOLIO</span>
        </a>

        <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {/* Navigation Links */}
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`font-inter text-xs tracking-wide transition-all duration-200 px-4 py-1.5 rounded-full ${
                  isActive
                    ? 'text-white font-semibold bg-white/15 border border-white/20 shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          {/* Terminal Launcher Action Button */}
          <button
            onClick={onOpenTerminal}
            title="Buka Terminal APN_CLI"
            className="text-cyan-300 hover:text-white transition-all duration-200 ml-1 flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 group shadow-sm"
          >
            <span 
              className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform" 
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              terminal
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
