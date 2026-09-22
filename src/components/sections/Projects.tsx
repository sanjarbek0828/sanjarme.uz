'use client';

import React, { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  ArrowUpRight 
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Project } from '@/lib/types';
import { ProjectModal } from '../ProjectModal';

interface ProjectsProps {
  projects: Project[];
}

// Project Card with Apple Vision Mouse Spotlight Glare
const ProjectCard: React.FC<{
  project: Project;
  idx: number;
  onSelect: (p: Project) => void;
}> = ({ project, idx, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
      transition={{ duration: 0.3, delay: idx * 0.025 }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] flex flex-col justify-between overflow-hidden gpu-layer cursor-pointer"
    >
      {/* Dynamic Mouse Spotlight Refraction Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.12), transparent 70%)`,
        }}
      />

      {/* Visual Cover Container */}
      <div 
        onClick={() => onSelect(project)}
        className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-950"
      >
        <Image
          src={project.coverImageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fbfbfd] dark:from-neutral-950 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-black/70 border border-black/10 dark:border-white/10 text-[11px] font-mono text-neutral-800 dark:text-neutral-300 backdrop-blur-md shadow-xs">
            {project.category}
          </span>

          {project.featured && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-black/70 border border-black/10 dark:border-white/10 text-[11px] font-mono text-neutral-800 dark:text-neutral-300 backdrop-blur-md shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Featured</span>
            </span>
          )}
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 relative z-20">
        <div className="space-y-2">
          <h3 
            onClick={() => onSelect(project)}
            className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors cursor-pointer flex items-center justify-between gap-2"
          >
            <span className="line-clamp-1">{project.title}</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
          </h3>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed line-clamp-2 font-normal">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills - Neutral Monospace */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800/60 border border-black/[0.04] dark:border-white/[0.06] text-[11px] font-mono text-neutral-700 dark:text-neutral-400"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800/60 border border-black/[0.04] dark:border-white/[0.06] text-[11px] font-mono text-neutral-600 dark:text-neutral-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
          <button
            onClick={() => onSelect(project)}
            className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Case study</span>
            <span>→</span>
          </button>

          <div className="flex items-center gap-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors"
                title="GitHub Source"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-black/10 dark:border-white/[0.1] text-xs font-mono text-neutral-800 dark:text-neutral-200 transition-colors"
                title="Live Demo"
                aria-label={`Live demo for ${project.title}`}
              >
                <span>Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Barchasi');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => {
      if (p.category) set.add(p.category);
      else if (p.tag) set.add(p.tag);
    });
    return ['Barchasi', ...Array.from(set)];
  }, [projects]);

  // Filter and sort: featured first, then by order
  const filteredProjects = projects
    .filter(p => activeCategory === 'Barchasi' || p.category === activeCategory || p.tag === activeCategory)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.order || 0) - (b.order || 0);
    });

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Apple Clean */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3 block">
            Mening Loyihalarim
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
            Saralangan <span className="text-apple-headline">Loyiha & Ishlanmalar</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-3 max-w-xl text-base font-normal leading-relaxed">
            Haqiqiy mijozlar uchun ishlab chiqilgan veb-platformalar, 3D interaktiv grafikalar va PWA ilovalari.
          </p>

          {/* Apple Segmented Filter Pill */}
          <div className="mt-6 sm:mt-8 inline-flex p-1 rounded-full bg-neutral-100/80 dark:bg-neutral-900/70 border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-xl max-w-full overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white whitespace-nowrap"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterTabApple"
                      className="absolute inset-0 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 shadow-xs"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-black dark:text-white font-semibold' : ''}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid - Apple Developer Showcase Cards with Mouse Spotlight */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                idx={idx}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
