import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { Skill } from '../types';

export const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <section id="skills" className="py-20 md:py-28 relative z-10">
      <div className="mb-12">
        <h2 className="font-montserrat text-3xl font-bold text-white uppercase tracking-wide">
          Tech<span className="text-cyan-400">_</span>Stack
        </h2>
        <div className="h-[3px] w-20 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full mt-4 shadow-lg shadow-cyan-500/20" />
      </div>

      {/* Skills Badges */}
      <div className="flex flex-wrap gap-4">
        {SKILLS_DATA.map((skill) => {
          const isSelected = selectedSkill?.id === skill.id;
          return (
            <button
              key={skill.id}
              onClick={() => setSelectedSkill(isSelected ? null : skill)}
              className={`px-6 py-3.5 rounded-2xl flex items-center gap-2.5 border transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg ${
                isSelected
                  ? 'border-cyan-400 bg-white/20 text-white shadow-cyan-500/20 scale-[1.03]'
                  : 'border-white/10 bg-white/5 text-white/90 hover:border-white/25 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-cyan-300 text-sm">
                {skill.icon}
              </span>
              <span className="font-geist text-sm text-white font-medium tracking-wide">
                {skill.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Skill Inspector Drawer/Card */}
      {selectedSkill && (
        <div className="mt-8 frosted-glass p-8 rounded-[32px] border-l-4 border-l-cyan-400 animate-fade-in relative shadow-2xl">
          <button
            onClick={() => setSelectedSkill(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-cyan-300 text-xs font-geist transition-colors"
          >
            [CLOSE_INSPECTOR ✕]
          </button>
          
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-cyan-300 text-2xl">
              {selectedSkill.icon}
            </span>
            <h3 className="font-montserrat text-2xl font-bold text-white">
              {selectedSkill.name}
            </h3>
            <span className="font-geist text-xs px-3 py-1 rounded-full border border-white/20 bg-white/10 text-cyan-300 font-medium">
              {selectedSkill.category}
            </span>
          </div>

          <p className="font-inter text-base text-white/80 mb-6 max-w-xl">
            {selectedSkill.description}
          </p>

          {/* Proficiency Bar */}
          <div className="space-y-2 max-w-md bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex justify-between font-geist text-xs text-white/70">
              <span>Mastery Index</span>
              <span className="text-cyan-300 font-bold">{selectedSkill.proficiency}%</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 rounded-full transition-all duration-500 shadow-md"
                style={{ width: `${selectedSkill.proficiency}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
