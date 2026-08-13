import React from 'react';
import { HERO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  return (
    <section 
      id="home" 
      className="min-h-[100vh] flex flex-col justify-center relative pt-24 md:pt-32 mb-20 md:mb-32 z-10"
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 mt-4 md:mt-0">
        
        {/* Left Column: Text & Hero CTA */}
        <div className="flex-1 space-y-6 w-full">
          {/* Interactive Terminal Header Banner */}
          <div 
            onClick={onOpenTerminal}
            title="Klik untuk membuka terminal interaktif APN_CLI"
            className="mb-4 font-geist text-cyan-300 text-sm px-5 py-2.5 inline-block w-full max-w-md cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all group shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="group-hover:text-white font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                {HERO_DATA.statusMessage}
              </span>
              <span className="text-xs text-white/50 group-hover:text-cyan-300 font-mono">
                [CLI_READY]
              </span>
            </div>
          </div>

          <h1 className="font-montserrat text-[42px] md:text-[68px] font-extrabold text-white tracking-tight leading-[1.08]">
            Aryo Pratama <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-400">
              Nugraha
            </span>
          </h1>

          <h2 className="font-montserrat text-[18px] md:text-[22px] text-white/80 mt-2 font-medium leading-relaxed">
            {HERO_DATA.role}
          </h2>

          <div className="flex flex-wrap gap-4 mt-8 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-geist text-sm px-8 py-3.5 rounded-2xl shadow-xl shadow-indigo-500/20 border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all font-semibold uppercase tracking-wider"
            >
              <span>Execute: Projects</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 border border-white/15 font-geist text-sm px-8 py-3.5 rounded-2xl hover:bg-white/20 hover:text-white hover:border-white/30 transition-all font-medium uppercase tracking-wider shadow-md"
            >
              <span>Ping: Contact</span>
              <span className="material-symbols-outlined text-sm">mail</span>
            </a>
          </div>

          {/* Quick System Diagnostics Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 text-xs font-geist text-white/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>STATUS: <strong className="text-white">ONLINE</strong></span>
            </div>
            <div>
              LOC: <strong className="text-white">SMK 12 RPL 2</strong>
            </div>
            <div>
              VERSION: <strong className="text-cyan-300">v1.0.4-STABLE</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Cyber Frame Visual */}
        <div className="flex-1 flex justify-center w-full max-w-md md:max-w-none">
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[32px] overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/15 p-2 shadow-2xl group">
            <div className="w-full h-full bg-[#0c0e14]/60 relative overflow-hidden rounded-[26px]">
              {/* Visual image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-screen transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${HERO_DATA.heroImageUrl}')`,
                  filter: 'hue-rotate(180deg) saturate(180%)',
                }}
              />
              {/* Gradient overlays for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e14]/40 via-transparent to-[#0c0e14]/40" />

              {/* Decorative Glass Badges */}
              <div className="absolute top-4 left-4 bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl text-[11px] font-geist text-white backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                APN Portfolio - Home
              </div>
              <div className="absolute bottom-4 right-4 bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl text-[11px] font-geist text-white/90 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                <span className="material-symbols-outlined text-cyan-300 text-xs">memory</span>
                SYS_CORE_ACTIVE
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
