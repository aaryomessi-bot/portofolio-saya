import React from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onChangeImage?: (project: Project) => void;
  onDeleteProject?: (projectId: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onChangeImage,
  onDeleteProject,
}) => {
  if (!project) return null;

  const hasNoImage = project.imageUrl === 'none';
  const imageUrl =
    !hasNoImage && project.imageUrl
      ? project.imageUrl
      : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-fade-in">
      <div 
        className="frosted-glass w-full max-w-2xl rounded-[32px] p-6 md:p-8 relative max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl backdrop-blur-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-geist text-xs text-cyan-300 border border-white/20 bg-white/10 px-3 py-1 rounded-full tracking-wider uppercase font-semibold">
              {project.category}
            </span>
            <span className="font-geist text-xs text-white/50">PROJ_ID: {project.id}</span>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors font-geist text-xs border border-white/10 cursor-pointer"
          >
            [CLOSE ✕]
          </button>
        </div>

        {/* Project Cover Image Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 mb-6 group shadow-xl aspect-video bg-black/50">
          {hasNoImage ? (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
              <span className="material-symbols-outlined text-white/20 text-5xl mb-2">
                no_photography
              </span>
              <span className="font-geist text-xs text-white/50 uppercase tracking-wider font-semibold">
                Tanpa Gambar Sampul
              </span>
              <span className="font-geist text-xs text-cyan-400/80 mt-1">
                Klik tombol di bawah untuk menambahkan atau memilih gambar
              </span>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 pointer-events-none">
            <span className="font-geist text-xs text-white/80 bg-black/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
              {hasNoImage ? 'No Cover' : 'Visual Preview'}
            </span>
            {onChangeImage && (
              <button
                onClick={() => onChangeImage(project)}
                className="bg-white/20 hover:bg-cyan-500/40 text-white font-geist text-xs px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/30 flex items-center gap-1.5 transition-all shadow-lg cursor-pointer pointer-events-auto"
              >
                <span className="material-symbols-outlined text-sm">photo_camera</span>
                <span>Ganti Gambar</span>
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-3">
          {project.title}
        </h2>

        {/* Description */}
        <p className="font-inter text-white/80 text-base leading-relaxed mb-6">
          {project.fullDescription || project.description}
        </p>

        {/* Key Features List */}
        {project.features && project.features.length > 0 && (
          <div className="mb-6 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
            <h4 className="font-geist text-xs text-cyan-300 uppercase tracking-wider mb-3 font-semibold">
              // KEY_SPECIFICATIONS
            </h4>
            <ul className="space-y-2">
              {project.features.map((feat, idx) => (
                <li key={idx} className="font-inter text-sm text-white/90 flex items-start gap-2">
                  <span className="text-cyan-400 font-geist">&gt;</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Highlights */}
        {project.highlights && (
          <div className="mb-6 p-3.5 bg-white/10 border border-white/15 rounded-2xl text-xs font-geist text-cyan-300 flex items-center gap-2.5 backdrop-blur-md shadow-sm">
            <span className="material-symbols-outlined text-sm text-cyan-300">verified</span>
            <span>{project.highlights}</span>
          </div>
        )}

        {/* Tech Stack List */}
        <div className="mb-8">
          <h4 className="font-geist text-xs text-white/60 uppercase tracking-wider mb-3 font-semibold">
            TECH_STACK_MODULES
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-geist text-xs bg-white/10 border border-white/15 text-white/90 px-3.5 py-1.5 rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => alert(`Simulasi membuka demo proyek "${project.title}"`)}
            className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-geist font-bold py-3.5 px-6 rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all uppercase text-xs tracking-wider flex justify-center items-center gap-2 cursor-pointer border border-white/20 shadow-xl"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            Launch Live Demo
          </button>
          {onDeleteProject && (
            <button
              onClick={() => {
                if (confirm(`Yakin ingin menghapus proyek "${project.title}" secara permanen?`)) {
                  onDeleteProject(project.id);
                  onClose();
                }
              }}
              className="border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 hover:border-rose-400/50 font-geist py-3.5 px-4 rounded-2xl transition-all uppercase text-xs tracking-wider cursor-pointer flex items-center gap-1.5"
              title="Hapus proyek ini"
            >
              <span className="material-symbols-outlined text-base">delete</span>
              <span>Hapus Proyek</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="border border-white/15 text-white/80 font-geist py-3.5 px-6 rounded-2xl hover:border-white/30 hover:text-white hover:bg-white/5 transition-all uppercase text-xs tracking-wider cursor-pointer"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};
