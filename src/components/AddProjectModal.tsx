import React, { useState } from 'react';
import { Project } from '../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Project) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'FULLSTACK' as Project['category'],
    description: '',
    fullDescription: '',
    techStack: '',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    features: '',
    highlights: '',
  });

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.techStack.trim()) {
      setError('Mohon isi Judul, Deskripsi Singkat, dan Tech Stack!');
      return;
    }

    const techArray = formData.techStack
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const featureArray = formData.features
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const newProject: Project = {
      id: `custom-proj-${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      fullDescription: formData.fullDescription.trim() || formData.description.trim(),
      techStack: techArray.length > 0 ? techArray : ['Web Development'],
      imageUrl: formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      features: featureArray.length > 0 ? featureArray : ['Sistem Berfungsi dengan Baik'],
      highlights: formData.highlights.trim() || 'Proyek Dikembangkan Secara Mandiri',
      isCustom: true,
      isFeatured: false,
    };

    onAddProject(newProject);

    // Reset form
    setFormData({
      title: '',
      category: 'FULLSTACK',
      description: '',
      fullDescription: '',
      techStack: '',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      features: '',
      highlights: '',
    });
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div
        className="frosted-glass w-full max-w-xl rounded-[32px] p-6 md:p-8 relative max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl backdrop-blur-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <span className="material-symbols-outlined text-sm">add</span>
            </div>
            <div>
              <h3 className="font-montserrat text-xl font-bold text-white">
                Tambah Proyek Baru
              </h3>
              <p className="font-geist text-xs text-white/50">
                Tambahkan hasil karya atau proyek Anda ke Portofolio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors font-geist text-xs border border-white/10"
          >
            [CLOSE ✕]
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-400/40 rounded-2xl text-rose-300 text-xs font-geist flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">warning</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judul Proyek */}
          <div>
            <label className="block font-geist text-xs text-cyan-300 uppercase font-semibold mb-1">
              Judul Proyek *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Contoh: Aplikasi Kasir Toko Online"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-3.5 text-white text-sm placeholder-white/30 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block font-geist text-xs text-cyan-300 uppercase font-semibold mb-1">
              Kategori
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as Project['category'],
                })
              }
              className="w-full bg-[#0c0e14] border border-white/10 rounded-2xl p-3.5 text-white text-sm focus:border-cyan-400 focus:outline-none transition-all"
            >
              <option value="FULLSTACK">FULLSTACK</option>
              <option value="FRONTEND">FRONTEND</option>
              <option value="BACKEND">BACKEND</option>
              <option value="MOBILE">MOBILE</option>
              <option value="LAINNYA">LAINNYA</option>
            </select>
          </div>

          {/* Deskripsi Singkat */}
          <div>
            <label className="block font-geist text-xs text-cyan-300 uppercase font-semibold mb-1">
              Deskripsi Singkat *
            </label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan ringkasan proyek dalam 1-2 kalimat..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-3.5 text-white text-sm placeholder-white/30 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Deskripsi Lengkap */}
          <div>
            <label className="block font-geist text-xs text-cyan-300 uppercase font-semibold mb-1">
              Deskripsi Lengkap (Opsional)
            </label>
            <textarea
              rows={3}
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Penjelasan detail latar belakang dan fitur proyek..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-3.5 text-white text-sm placeholder-white/30 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block font-geist text-xs text-cyan-300 uppercase font-semibold mb-1">
              Tech Stack (Pisahkan dengan koma) *
            </label>
            <input
              type="text"
              required
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              placeholder="Contoh: React, PHP, MySQL, Tailwind"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-3.5 text-white text-sm placeholder-white/30 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* URL Gambar Sampul */}
          <div>
            <label className="block font-geist text-xs text-cyan-300 uppercase font-semibold mb-1">
              URL Gambar Sampul (Opsional)
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-3.5 text-white text-sm placeholder-white/30 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Fitur Utama */}
          <div>
            <label className="block font-geist text-xs text-cyan-300 uppercase font-semibold mb-1">
              Fitur-Fitur Utama (Pisahkan dengan koma)
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Contoh: Autentikasi Login, Export PDF, Mode Gelap"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-3.5 text-white text-sm placeholder-white/30 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Highlights */}
          <div>
            <label className="block font-geist text-xs text-cyan-300 uppercase font-semibold mb-1">
              Pencapaian / Catatan Khusus
            </label>
            <input
              type="text"
              value={formData.highlights}
              onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
              placeholder="Contoh: Digunakan oleh 100+ pengguna aktif"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-3.5 text-white text-sm placeholder-white/30 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-geist font-bold py-3.5 px-6 rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all uppercase text-xs tracking-wider flex justify-center items-center gap-2 cursor-pointer border border-white/20 shadow-xl"
            >
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Simpan Proyek
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-white/15 text-white/80 font-geist py-3.5 px-6 rounded-2xl hover:border-white/30 hover:text-white transition-all uppercase text-xs tracking-wider cursor-pointer"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
