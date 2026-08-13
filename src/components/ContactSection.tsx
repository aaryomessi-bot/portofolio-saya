import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('PAYLOAD_ERROR: Semua field wajib diisi.');
      return;
    }

    setStatus('transmitting');
    setStatusMessage('ENCRYPTING_PAYLOAD & TRANSMITTING_TO_NODE...');

    setTimeout(() => {
      setStatus('success');
      setStatusMessage('TRANSMISSION_ACKNOWLEDGED: Pesan Anda berhasil terkirim!');
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative z-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-montserrat text-3xl font-bold text-white mb-2 uppercase tracking-wide">
            Initiate<span className="text-cyan-400">_</span>Contact
          </h2>
          <p className="font-inter text-white/70 mt-3 text-base">
            Sistem siap menerima transmisi pesan Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="frosted-glass p-8 md:p-10 rounded-[32px] flex flex-col gap-6 shadow-2xl border border-white/15 backdrop-blur-3xl">
          {status !== 'idle' && (
            <div
              className={`p-4 rounded-2xl font-geist text-xs flex items-center justify-between border backdrop-blur-md ${
                status === 'transmitting'
                  ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 animate-pulse'
                  : status === 'success'
                  ? 'bg-emerald-500/10 border-emerald-400/50 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-400/50 text-rose-300'
              }`}
            >
              <span>{statusMessage}</span>
              {status === 'success' && (
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-xs text-white/70 hover:text-white"
                >
                  [DISMISS]
                </button>
              )}
            </div>
          )}

          {/* Name Input */}
          <div className="flex flex-col gap-2">
            <label
              className="font-geist text-xs text-cyan-300 uppercase tracking-wider font-semibold"
              htmlFor="name"
            >
              ID_PENGIRIM // NAMA
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama Anda..."
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:border-cyan-400 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all font-inter text-sm shadow-inner"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label
              className="font-geist text-xs text-cyan-300 uppercase tracking-wider font-semibold"
              htmlFor="email"
            >
              ALAMAT_NODE // EMAIL
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email Anda..."
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:border-cyan-400 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all font-inter text-sm shadow-inner"
            />
          </div>

          {/* Message Textarea */}
          <div className="flex flex-col gap-2">
            <label
              className="font-geist text-xs text-cyan-300 uppercase tracking-wider font-semibold"
              htmlFor="message"
            >
              DATA_PAYLOAD // PESAN
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Ketik transmisi pesan Anda di sini..."
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:border-cyan-400 focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all font-inter text-sm min-h-[120px] resize-y shadow-inner"
            />
          </div>

          {/* Transmit Button */}
          <button
            type="submit"
            disabled={status === 'transmitting'}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-geist font-bold px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all uppercase tracking-widest mt-2 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xl border border-white/20"
          >
            {status === 'transmitting' ? 'MEMPROSES_TRANSMISI...' : 'KIRIM_TRANSMISI'}
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </form>
      </div>
    </section>
  );
};
