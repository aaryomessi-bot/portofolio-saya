import React, { useState } from 'react';

interface ImageSelectorModalProps {
  isOpen: boolean;
  currentImageUrl?: string;
  projectTitle: string;
  onClose: () => void;
  onSaveImage: (newImageUrl: string) => void;
}

const PRESET_IMAGES = [
  {
    id: 'school-dashboard',
    label: 'Dashboard Admin & Sekolah',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    category: 'Dashboard',
  },
  {
    id: 'qr-security',
    label: 'QR Code & Scan Matrix',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    category: 'Mobile & QR',
  },
  {
    id: 'ecommerce-analytics',
    label: 'E-Commerce & Store Analytics',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    category: 'E-Commerce',
  },
  {
    id: 'code-editor',
    label: 'IDE & Code Development',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    category: 'Backend & Code',
  },
  {
    id: 'digital-library',
    label: 'Perpustakaan & Koleksi Digital',
    url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=80',
    category: 'Education',
  },
  {
    id: 'pos-cashier',
    label: 'Kasir & Point of Sale',
    url: 'https://images.unsplash.com/photo-1556742049-0a67f572c9f7?auto=format&fit=crop&w=1000&q=80',
    category: 'Retail',
  },
  {
    id: 'cyber-circuit',
    label: 'Cyber Circuit & AI System',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    category: 'Futuristic',
  },
  {
    id: 'modern-web',
    label: 'Modern Web Interface',
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    category: 'Frontend',
  },
  {
    id: 'mobile-app',
    label: 'Mobile App Wireframe & UI',
    url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80',
    category: 'Mobile',
  },
  {
    id: 'data-grid',
    label: 'Dark Data Grid & Charts',
    url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80',
    category: 'Analytics',
  },
];

export const ImageSelectorModal: React.FC<ImageSelectorModalProps> = ({
  isOpen,
  currentImageUrl,
  projectTitle,
  onClose,
  onSaveImage,
}) => {
  const [selectedUrl, setSelectedUrl] = useState<string>(
    currentImageUrl || PRESET_IMAGES[0].url
  );
  const [customInputUrl, setCustomInputUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'presets' | 'url' | 'upload'>('presets');
  const [uploadError, setUploadError] = useState<string>('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Mohon pilih file gambar (JPG, PNG, WebP, GIF)!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Ukuran file maksimal 5MB!');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result) {
        const base64Data = evt.target.result as string;
        setSelectedUrl(base64Data);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputUrl.trim()) return;
    setSelectedUrl(customInputUrl.trim());
  };

  const handleSave = () => {
    onSaveImage(selectedUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-fade-in">
      <div
        className="frosted-glass w-full max-w-2xl rounded-[32px] p-6 md:p-8 relative max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl backdrop-blur-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5 shadow-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">
                image_search
              </span>
            </div>
            <div>
              <h3 className="font-montserrat text-lg font-bold text-white">
                Ganti Gambar Proyek
              </h3>
              <p className="font-geist text-xs text-white/60">
                Pilih atau unggah gambar sampul untuk &quot;{projectTitle}&quot;
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors font-geist text-xs border border-white/10"
          >
            [TUTUP ✕]
          </button>
        </div>

        {/* Live Preview Box */}
        <div className="mb-6 relative rounded-2xl overflow-hidden border border-white/20 bg-black/40 group shadow-xl aspect-video">
          <img
            src={selectedUrl}
            alt="Preview Proyek"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span className="font-geist text-xs text-cyan-300 bg-black/60 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              ✓ Pratinjau Sampul Saat Ini
            </span>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl mb-6 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-2 rounded-xl text-xs font-geist font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'presets'
                ? 'bg-white/20 text-white shadow-md border border-white/20'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">grid_view</span>
            Galeri Pilihan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 rounded-xl text-xs font-geist font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'upload'
                ? 'bg-white/20 text-white shadow-md border border-white/20'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">upload_file</span>
            Unggah File HP/PC
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-2 rounded-xl text-xs font-geist font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'url'
                ? 'bg-white/20 text-white shadow-md border border-white/20'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">link</span>
            Tautan URL
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'presets' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-1 mb-6">
            {PRESET_IMAGES.map((preset) => {
              const isSelected = selectedUrl === preset.url;
              return (
                <div
                  key={preset.id}
                  onClick={() => setSelectedUrl(preset.url)}
                  className={`group relative rounded-xl overflow-hidden border cursor-pointer aspect-video transition-all ${
                    isSelected
                      ? 'border-cyan-400 ring-2 ring-cyan-400/50 scale-[1.02]'
                      : 'border-white/15 opacity-70 hover:opacity-100 hover:border-white/40'
                  }`}
                >
                  <img
                    src={preset.url}
                    alt={preset.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-2 flex flex-col justify-end">
                    <span className="font-geist text-[10px] text-white font-medium line-clamp-1">
                      {preset.label}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-cyan-400 text-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-xs font-bold">
                        check
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="mb-6 space-y-4">
            <div className="border-2 border-dashed border-white/20 hover:border-cyan-400/60 rounded-2xl p-8 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="material-symbols-outlined text-cyan-300 text-4xl mb-2">
                cloud_upload
              </span>
              <h4 className="font-montserrat text-sm font-bold text-white mb-1">
                Pilih atau Geser Foto ke Sini
              </h4>
              <p className="font-geist text-xs text-white/50">
                Mendukung JPG, PNG, WebP (Maksimal 5MB)
              </p>
            </div>

            {uploadError && (
              <p className="text-xs text-rose-400 font-geist flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">error</span>
                {uploadError}
              </p>
            )}
          </div>
        )}

        {activeTab === 'url' && (
          <form onSubmit={handleApplyCustomUrl} className="mb-6 space-y-3">
            <label className="block font-geist text-xs text-cyan-300 font-semibold uppercase">
              Masukkan URL Gambar Publik (Unsplash, Imgur, PostImages, dll)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={customInputUrl}
                onChange={(e) => setCustomInputUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-xs placeholder-white/30 focus:border-cyan-400 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-3 rounded-2xl text-xs font-geist text-white font-semibold transition-all"
              >
                Terapkan
              </button>
            </div>
          </form>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-geist font-bold py-3.5 px-6 rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all uppercase text-xs tracking-wider flex justify-center items-center gap-2 cursor-pointer border border-white/20 shadow-xl"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            Simpan Gambar
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm('Hapus gambar untuk proyek ini? Gambar akan dikosongkan/direset.')) {
                onSaveImage('');
              }
            }}
            className="border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 hover:border-rose-400/50 font-geist py-3.5 px-4 rounded-2xl transition-all uppercase text-xs tracking-wider cursor-pointer flex items-center gap-1.5"
            title="Hapus gambar proyek ini"
          >
            <span className="material-symbols-outlined text-base">no_photography</span>
            <span>Hapus Gambar</span>
          </button>
          <button
            onClick={onClose}
            className="border border-white/15 text-white/80 font-geist py-3.5 px-6 rounded-2xl hover:border-white/30 hover:text-white transition-all uppercase text-xs tracking-wider cursor-pointer"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};
