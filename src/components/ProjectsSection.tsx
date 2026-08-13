import React, { useState } from 'react';
import { Project } from '../types';
import { AddProjectModal } from './AddProjectModal';
import { ImageSelectorModal } from './ImageSelectorModal';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onAddProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onUpdateProjectImage: (projectId: string, newImageUrl: string) => void;
  onResetProjects?: () => void;
  onOpenImageSelector?: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onAddProject,
  onDeleteProject,
  onUpdateProjectImage,
  onResetProjects,
  onOpenImageSelector,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingImageProject, setEditingImageProject] = useState<Project | null>(null);

  const categories = ['ALL', 'FULLSTACK', 'FRONTEND', 'BACKEND', 'MOBILE', 'LAINNYA'];

  // Filter projects by category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'ALL' ||
      project.category.toUpperCase() === selectedCategory;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  // Calculate statistics
  const totalProjects = projects.length;
  const fullstackCount = projects.filter((p) => p.category === 'FULLSTACK').length;
  const frontendCount = projects.filter((p) => p.category === 'FRONTEND').length;
  const backendCount = projects.filter((p) => p.category === 'BACKEND').length;

  return (
    <section id="projects" className="py-20 md:py-28 relative z-10">
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={onAddProject}
      />

      {editingImageProject && (
        <ImageSelectorModal
          isOpen={!!editingImageProject}
          currentImageUrl={editingImageProject.imageUrl}
          projectTitle={editingImageProject.title}
          onClose={() => setEditingImageProject(null)}
          onSaveImage={(newUrl) => {
            onUpdateProjectImage(editingImageProject.id, newUrl);
            setEditingImageProject(null);
          }}
        />
      )}

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-montserrat text-3xl font-bold text-white uppercase tracking-wide">
            Work<span className="text-cyan-400">_</span>Log
          </h2>
          <div className="h-[3px] w-20 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full mt-4 shadow-lg shadow-cyan-500/20" />
        </div>

        {/* Add Project CTA & Reset Button */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {onResetProjects && (
            <button
              onClick={onResetProjects}
              title="Kembalikan semua proyek awal dan hapus riwayat"
              className="inline-flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-geist text-xs px-4 py-3 rounded-full border border-white/10 transition-all font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              <span>Reset Data</span>
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-geist text-xs px-6 py-3 rounded-full shadow-xl hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all font-semibold uppercase tracking-wider border border-white/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            <span>+ Tambah Proyek Saya</span>
          </button>
        </div>
      </div>

      {/* Projects Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
          <div className="font-geist text-xs text-white/50 uppercase mb-1">Total Proyek</div>
          <div className="font-montserrat text-2xl font-bold text-white">{totalProjects}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
          <div className="font-geist text-xs text-cyan-300 uppercase mb-1">Fullstack</div>
          <div className="font-montserrat text-2xl font-bold text-white">{fullstackCount}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
          <div className="font-geist text-xs text-indigo-300 uppercase mb-1">Frontend</div>
          <div className="font-montserrat text-2xl font-bold text-white">{frontendCount}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
          <div className="font-geist text-xs text-purple-300 uppercase mb-1">Backend</div>
          <div className="font-montserrat text-2xl font-bold text-white">{backendCount}</div>
        </div>
      </div>

      {/* Search & Category Filter Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Input */}
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari proyek berdasarkan judul, deskripsi, atau teknologi..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white text-xs placeholder-white/40 focus:border-cyan-400 focus:bg-white/10 focus:outline-none transition-all shadow-inner font-inter"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-geist"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md self-start md:self-auto overflow-x-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-geist text-xs px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white/20 text-white font-semibold shadow-sm border border-white/20'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat === 'ALL' ? 'SEMUA' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="frosted-glass rounded-[32px] p-12 text-center border border-white/10">
          <span className="material-symbols-outlined text-white/30 text-5xl mb-3">
            folder_off
          </span>
          <h3 className="font-montserrat text-lg font-bold text-white mb-2">
            Proyek Tidak Ditemukan
          </h3>
          <p className="font-inter text-xs text-white/60 max-w-md mx-auto mb-6">
            Tidak ada proyek yang sesuai dengan kriteria pencarian atau kategori yang dipilih.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
            }}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-geist text-white transition-all cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const hasNoImage = project.imageUrl === 'none';
            const projectImage =
              !hasNoImage && project.imageUrl
                ? project.imageUrl
                : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80';

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="frosted-glass rounded-[32px] p-5 flex flex-col justify-between group relative overflow-hidden cursor-pointer transition-all duration-300 shadow-2xl border border-white/12 hover:border-white/30 hover:bg-white/10 hover:-translate-y-1"
              >
                {/* Soft hover glow background */}
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />

                <div>
                  {/* Image Cover Container */}
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 border border-white/10 bg-black/50 group-hover:border-white/25 transition-all">
                    {hasNoImage ? (
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-950 flex flex-col items-center justify-center p-4 text-center border border-white/5">
                        <span className="material-symbols-outlined text-white/20 text-4xl mb-1">
                          no_photography
                        </span>
                        <span className="font-geist text-xs text-white/40 uppercase tracking-wider">
                          Tanpa Gambar Sampul
                        </span>
                        <span className="font-geist text-[10px] text-cyan-400/60 mt-1">
                          [Klik 📷 untuk ganti]
                        </span>
                      </div>
                    ) : (
                      <img
                        src={projectImage}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                      <span className="font-geist text-xs text-cyan-300 border border-white/20 bg-black/60 px-3 py-1 rounded-full tracking-wider uppercase font-semibold backdrop-blur-md shadow-sm">
                        {project.category}
                      </span>
                      {project.isCustom && (
                        <span className="font-geist text-[10px] text-amber-300 bg-amber-500/30 border border-amber-400/40 px-2 py-0.5 rounded-full font-semibold backdrop-blur-md">
                          CUSTOM
                        </span>
                      )}
                    </div>

                    {/* Top Right Actions (Ganti Gambar & Delete) */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenImageSelector) {
                            onOpenImageSelector(project);
                          } else {
                            setEditingImageProject(project);
                          }
                        }}
                        title="Ganti Gambar Proyek Ini"
                        className="p-2 rounded-full bg-black/60 hover:bg-cyan-500/30 text-white/80 hover:text-cyan-300 transition-all border border-white/20 backdrop-blur-md shadow-md cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">
                          photo_camera
                        </span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Yakin ingin menghapus proyek "${project.title}"?`)) {
                            onDeleteProject(project.id);
                          }
                        }}
                        title="Hapus Proyek Ini"
                        className="p-2 rounded-full bg-black/60 hover:bg-rose-500/50 text-white/70 hover:text-rose-200 transition-all border border-white/20 backdrop-blur-md shadow-md cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">
                          delete
                        </span>
                      </button>
                    </div>

                    {/* Bottom overlay highlight */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs font-geist text-white/80">
                      <span className="line-clamp-1 opacity-90">
                        {project.highlights || 'RPL Showcase'}
                      </span>
                      <span className="material-symbols-outlined text-sm text-cyan-300">
                        arrow_forward
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <h3 className="font-montserrat text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="font-inter text-white/70 text-xs leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-geist text-[11px] bg-white/10 border border-white/10 text-white/90 px-2.5 py-0.5 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

