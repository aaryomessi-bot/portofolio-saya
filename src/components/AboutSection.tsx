import React from 'react';
import { ABOUT_DATA } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative z-10">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Section Heading Column */}
        <div className="md:col-span-4">
          <h2 className="font-montserrat text-3xl font-bold text-white uppercase tracking-wide">
            Tentang<span className="text-cyan-400">_</span>Saya
          </h2>
          <div className="h-[3px] w-20 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full mt-4 shadow-lg shadow-cyan-500/20" />
          
          <div className="mt-8 space-y-3 font-geist text-xs text-white/70">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <span>SPECIALTY: <strong className="text-white">Full-Stack Web Dev</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <span>CLASS: <strong className="text-white">12 RPL 2</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <span>FOCUS: <strong className="text-white">Clean Code & Architecture</strong></span>
            </div>
          </div>
        </div>

        {/* Content Cyber Card Column */}
        <div className="md:col-span-8 cyber-card p-8 md:p-10 rounded-[32px] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-white text-8xl">
              memory
            </span>
          </div>

          <div className="relative z-10 space-y-6">
            <p className="font-inter text-lg text-white/90 leading-relaxed font-normal">
              {ABOUT_DATA.paragraph1}
            </p>
            <p className="font-inter text-base text-white/70 leading-relaxed">
              {ABOUT_DATA.paragraph2}
            </p>

            {/* Core Values / Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="font-geist text-xs text-cyan-300 mb-1">// PHILOSOPHY</div>
                <div className="text-sm font-semibold text-white">Clean Code</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="font-geist text-xs text-indigo-300 mb-1">// METHOD</div>
                <div className="text-sm font-semibold text-white">Problem Solving</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="font-geist text-xs text-purple-300 mb-1">// VISION</div>
                <div className="text-sm font-semibold text-white">Scalable Architecture</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
