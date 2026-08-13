import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white/5 backdrop-blur-[30px] border-t border-white/10 mt-16 relative z-10 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-8 max-w-[1280px] mx-auto gap-6">
        {/* Logo */}
        <a
          href="#home"
          className="font-montserrat text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-400 tracking-tight uppercase hover:opacity-90 transition-all flex items-center gap-2"
        >
          <div className="w-7 h-7 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg shadow-md border border-white/20 flex items-center justify-center text-white text-xs font-bold">
            AP
          </div>
          <span>APN_PORTFOLIO</span>
        </a>

        {/* Copyright */}
        <div className="font-geist text-xs text-white/60 text-center">
          © 2024 ARYO PRATAMA NUGRAHA. <br className="md:hidden" /> SMK RPL SPECIALIST_v1.0
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-geist text-xs text-white/80 hover:text-white bg-white/5 border border-white/10 hover:bg-white/15 px-4 py-2 rounded-full transition-all flex items-center gap-2 backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[16px] text-cyan-300">code</span>
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-geist text-xs text-white/80 hover:text-white bg-white/5 border border-white/10 hover:bg-white/15 px-4 py-2 rounded-full transition-all flex items-center gap-2 backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[16px] text-indigo-300">work</span>
            LinkedIn
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-geist text-xs text-white/80 hover:text-white bg-white/5 border border-white/10 hover:bg-white/15 px-4 py-2 rounded-full transition-all flex items-center gap-2 backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[16px] text-purple-300">forum</span>
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};
