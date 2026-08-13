import React from 'react';

interface BottomNavProps {
  activeSection: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeSection }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'about', label: 'Bio', icon: 'person' },
    { id: 'skills', label: 'Tech', icon: 'code' },
    { id: 'projects', label: 'Work', icon: 'dashboard' },
    { id: 'contact', label: 'Mail', icon: 'mail' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 md:hidden bg-[#0c0e14]/80 backdrop-blur-[40px] border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center p-2.5 pb-safe">
        {tabs.map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-white bg-white/15 border border-white/20 shadow-lg scale-105'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${isActive ? 'text-cyan-300' : ''}`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {tab.icon}
              </span>
              <span className="font-geist text-[11px] mt-0.5 tracking-wider font-medium">
                {tab.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
