import React, { useState, useRef, useEffect } from 'react';
import { HERO_DATA, ABOUT_DATA, SKILLS_DATA, PROJECTS_DATA } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: 'sys_init',
      output: (
        <div className="space-y-1 text-[#00E5FF]">
          <div>APN_PORTFOLIO Interactive Shell v1.0.4</div>
          <div>Type <span className="text-white font-bold">'help'</span> for available system commands.</div>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs font-geist">
            <div className="text-[#00E5FF] font-bold">// AVAILABLE APN_CLI COMMANDS:</div>
            <div><span className="text-white font-bold">bio</span> - Profil & latar belakang Aryo</div>
            <div><span className="text-white font-bold">skills</span> - Daftar tech stack & keahlian</div>
            <div><span className="text-white font-bold">projects</span> - Ringkasan proyek Work Log</div>
            <div><span className="text-white font-bold">contact</span> - Informasi kontak transmisi</div>
            <div><span className="text-white font-bold">ping</span> - Tes latensi koneksi sistem</div>
            <div><span className="text-white font-bold">date</span> - Waktu sistem saat ini</div>
            <div><span className="text-white font-bold">whoami</span> - Informasi identitas user aktif</div>
            <div><span className="text-white font-bold">matrix</span> - Tampilkan efek digital matrix</div>
            <div><span className="text-white font-bold">clear</span> - Bersihkan layar terminal</div>
          </div>
        );
        break;

      case 'bio':
      case 'about':
        output = (
          <div className="space-y-2 text-xs font-geist text-white/90">
            <div className="text-[#00E5FF] font-bold">{HERO_DATA.name} ({ABOUT_DATA.grade})</div>
            <div>{ABOUT_DATA.paragraph1}</div>
            <div>{ABOUT_DATA.paragraph2}</div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1 text-xs font-geist">
            <div className="text-[#00E5FF] font-bold">// TECH STACK PROFICIENCY:</div>
            {SKILLS_DATA.map((s) => (
              <div key={s.id} className="flex justify-between max-w-xs text-white/90">
                <span>• {s.name}</span>
                <span className="text-[#00E5FF]">{s.proficiency}%</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
      case 'work':
        output = (
          <div className="space-y-2 text-xs font-geist">
            <div className="text-[#00E5FF] font-bold">// WORK LOG DEPLOYMENTS:</div>
            {PROJECTS_DATA.map((p) => (
              <div key={p.id} className="border-l-2 border-[#00E5FF] pl-2 text-white/90">
                <div className="font-bold text-[#00E5FF]">{p.title} [{p.category}]</div>
                <div>{p.description}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs font-geist text-white/90">
            <div className="text-[#00E5FF] font-bold">// INITIATE CONTACT NODE:</div>
            <div>Email: <a href="mailto:aryo@example.com" className="text-[#00E5FF] underline">aryopratama@smkrpl.sch.id</a></div>
            <div>Location: SMK 12 RPL 2, Indonesia</div>
            <div>Status: Available for Full-Stack Projects & Internships</div>
          </div>
        );
        break;

      case 'ping':
        output = (
          <div className="text-xs font-geist text-emerald-400">
            PONG! Reply from APN_NODE: bytes=64 time=12ms TTL=128 status=ONLINE
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="text-xs font-geist text-[#00E5FF]">
            GUEST_USER@APN_SHELL [PERMISSIONS: READ_ONLY_VISITOR]
          </div>
        );
        break;

      case 'date':
        output = (
          <div className="text-xs font-geist text-white">
            SYS_DATE: {new Date().toLocaleString('id-ID')}
          </div>
        );
        break;

      case 'matrix':
        output = (
          <div className="text-xs font-geist text-emerald-400 tracking-widest animate-pulse leading-none">
            01000001 01010000 01001110 01011111 01010010 01010000 01001100 00110010
            <br />
            10101010 00110101 11001100 00110011 00011100 11110000 00111100 01010101
            <br />
            CYBER_CORE_MATRIX_ACTIVE // APN_PORTFOLIO_SYSTEM_RUNNING
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <div className="text-xs font-geist text-rose-400">
            Command not recognized: '<span className="text-white">{input}</span>'. Type '<span className="text-[#00E5FF]">help</span>' for available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="frosted-glass w-full max-w-2xl rounded-[32px] overflow-hidden border border-white/20 shadow-2xl flex flex-col h-[520px] backdrop-blur-3xl">
        {/* Terminal Header */}
        <div className="bg-white/10 px-5 py-3 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer hover:scale-110 transition-transform" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="font-geist text-xs text-cyan-300 ml-2 font-semibold">
              apn_portfolio_cli ~ bash
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-geist text-white/70 hover:text-white px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
          >
            [EXIT ✕]
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-5 overflow-y-auto bg-black/40 font-geist space-y-4">
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-cyan-300">
                <span className="text-emerald-400">guest@apn-shell:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-4 border-l border-white/15">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Bar */}
        <form onSubmit={handleCommand} className="p-3.5 bg-white/5 border-t border-white/10 flex items-center gap-2 backdrop-blur-md">
          <span className="text-xs font-geist text-emerald-400 font-bold">guest@apn-shell:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik 'help' untuk daftar perintah..."
            className="flex-1 bg-transparent text-xs font-geist text-white outline-none placeholder-white/40"
          />
          <button type="submit" className="text-xs font-geist text-cyan-300 hover:text-white px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-all font-semibold">
            EXEC ↵
          </button>
        </form>
      </div>
    </div>
  );
};
