import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { ProjectModal } from './components/ProjectModal';
import { ImageSelectorModal } from './components/ImageSelectorModal';
import { PROJECTS_DATA } from './data/portfolioData';
import { Project } from './types';

const STORAGE_KEY = 'APN_CUSTOM_PROJECTS';
const IMAGE_STORAGE_KEY = 'APN_PROJECT_IMAGES';
const DELETED_PROJECTS_KEY = 'APN_DELETED_PROJECT_IDS';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingImageProject, setEditingImageProject] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Initialize projects state combining default data, custom projects, and saved image overrides
  const [projects, setProjects] = useState<Project[]>(() => {
    let baseList = [...PROJECTS_DATA];
    try {
      const savedCustom = localStorage.getItem(STORAGE_KEY);
      if (savedCustom) {
        const customProjects: Project[] = JSON.parse(savedCustom);
        baseList = [...PROJECTS_DATA, ...customProjects];
      }
      // Exclude deleted projects (both default & custom)
      const deletedIdsRaw = localStorage.getItem(DELETED_PROJECTS_KEY);
      if (deletedIdsRaw) {
        const deletedIds: string[] = JSON.parse(deletedIdsRaw);
        baseList = baseList.filter((p) => !deletedIds.includes(p.id));
      }
      // Apply saved custom images
      const savedImages = localStorage.getItem(IMAGE_STORAGE_KEY);
      if (savedImages) {
        const imageMap: Record<string, string> = JSON.parse(savedImages);
        baseList = baseList.map((p) => ({
          ...p,
          imageUrl: imageMap[p.id] !== undefined ? imageMap[p.id] : p.imageUrl,
        }));
      }
    } catch (e) {
      console.error('Failed to load saved projects or images', e);
    }
    return baseList;
  });

  // Handler to update project cover image (or clear image if newImageUrl is empty string or 'none')
  const handleUpdateProjectImage = (projectId: string, newImageUrl: string) => {
    const finalUrl = newImageUrl.trim() === '' ? 'none' : newImageUrl.trim();

    const updated = projects.map((p) =>
      p.id === projectId ? { ...p, imageUrl: finalUrl } : p
    );
    setProjects(updated);

    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject({ ...selectedProject, imageUrl: finalUrl });
    }

    try {
      const savedImages = localStorage.getItem(IMAGE_STORAGE_KEY);
      const imageMap: Record<string, string> = savedImages ? JSON.parse(savedImages) : {};
      imageMap[projectId] = finalUrl;
      localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(imageMap));
    } catch (e) {
      console.error('Failed to save image map', e);
    }

    const proj = projects.find((p) => p.id === projectId);
    if (finalUrl === 'none') {
      showToast(`Gambar proyek "${proj?.title || 'Proyek'}" berhasil dihapus.`);
    } else {
      showToast(`Gambar proyek "${proj?.title || 'Proyek'}" berhasil diperbarui!`);
    }
  };

  // Handler to add new project
  const handleAddProject = (newProject: Project) => {
    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);

    try {
      const customProjects = updatedProjects.filter((p) => p.isCustom);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customProjects));
    } catch (e) {
      console.error('Failed to save custom projects', e);
    }

    showToast(`Proyek "${newProject.title}" berhasil ditambahkan!`);
  };

  // Handler to delete project (works for both custom and default projects)
  const handleDeleteProject = (projectId: string) => {
    const targetProject = projects.find((p) => p.id === projectId);
    const updatedProjects = projects.filter((p) => p.id !== projectId);
    setProjects(updatedProjects);

    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }

    try {
      // Update custom projects list
      const customProjects = updatedProjects.filter((p) => p.isCustom);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customProjects));

      // Track deleted IDs in localStorage
      const deletedIdsRaw = localStorage.getItem(DELETED_PROJECTS_KEY);
      const deletedIds: string[] = deletedIdsRaw ? JSON.parse(deletedIdsRaw) : [];
      if (!deletedIds.includes(projectId)) {
        deletedIds.push(projectId);
        localStorage.setItem(DELETED_PROJECTS_KEY, JSON.stringify(deletedIds));
      }

      // Clean up image map
      const savedImages = localStorage.getItem(IMAGE_STORAGE_KEY);
      if (savedImages) {
        const imageMap: Record<string, string> = JSON.parse(savedImages);
        delete imageMap[projectId];
        localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(imageMap));
      }
    } catch (e) {
      console.error('Failed to update deleted projects', e);
    }

    showToast(`Proyek "${targetProject?.title || 'Proyek'}" berhasil dihapus.`);
  };

  // Restore deleted projects & images reset
  const handleResetProjects = () => {
    if (confirm('Kembalikan semua proyek bawaan awal dan reset data yang dihapus?')) {
      localStorage.removeItem(DELETED_PROJECTS_KEY);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(IMAGE_STORAGE_KEY);
      setProjects(PROJECTS_DATA);
      showToast('Semua data proyek berhasil direset ke kondisi awal.');
    }
  };

  // Intersection Observer for highlighting active nav item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0e14] text-white font-inter selection:bg-indigo-500/30 selection:text-indigo-300 relative overflow-x-hidden">
      {/* Frosted Glass Background Ambient Glowing Orbs */}
      <div className="fixed w-[600px] h-[600px] bg-purple-600/25 rounded-full blur-[140px] -top-48 -left-48 pointer-events-none z-0"></div>
      <div className="fixed w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -bottom-24 -right-24 pointer-events-none z-0"></div>
      <div className="fixed w-[450px] h-[450px] bg-pink-500/10 rounded-full blur-[130px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
      <div className="fixed w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[110px] top-1/4 right-10 pointer-events-none z-0"></div>

      {/* Top Desktop Navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Sections Container */}
      <main className="max-w-[1280px] mx-auto px-5 md:px-6 pb-20 md:pb-32">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
          onAddProject={handleAddProject}
          onDeleteProject={handleDeleteProject}
          onUpdateProjectImage={handleUpdateProjectImage}
          onResetProjects={handleResetProjects}
          onOpenImageSelector={(project) => setEditingImageProject(project)}
        />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav activeSection={activeSection} />

      {/* Terminal Modal Drawer */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onDeleteProject={handleDeleteProject}
        onChangeImage={(proj) => setEditingImageProject(proj)}
      />

      {/* Image Selector Modal */}
      {editingImageProject && (
        <ImageSelectorModal
          key={editingImageProject.id}
          isOpen={!!editingImageProject}
          currentImageUrl={editingImageProject.imageUrl}
          projectTitle={editingImageProject.title}
          onClose={() => setEditingImageProject(null)}
          onSaveImage={(newUrl) => {
            handleUpdateProjectImage(editingImageProject.id, newUrl);
            setEditingImageProject(null);
          }}
        />
      )}

      {/* Floating Action Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-cyan-400/30 text-white font-geist text-xs px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-bounce-short">
          <span className="material-symbols-outlined text-cyan-400 text-lg">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
