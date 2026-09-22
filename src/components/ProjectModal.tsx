'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  UserCheck 
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Project } from '@/lib/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Dialog Card - Apple Clean Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 14 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-neutral-950 p-5 sm:p-8 z-10 shadow-2xl text-left transition-colors duration-300"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors z-20 cursor-pointer"
            aria-label="Close modal dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Cover Image */}
          <div className="relative w-full h-44 sm:h-72 lg:h-80 rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] mb-5 sm:mb-6 bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={project.coverImageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-950 via-transparent to-transparent opacity-60" />
            
            {/* Category badge */}
            <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 flex items-center gap-2">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/80 dark:bg-black/70 border border-black/10 dark:border-white/10 text-[11px] sm:text-xs font-mono text-neutral-900 dark:text-neutral-200 backdrop-blur-md shadow-xs">
                {project.category}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/80 dark:bg-black/70 border border-black/10 dark:border-white/10 text-[11px] sm:text-xs font-mono text-neutral-900 dark:text-neutral-200 backdrop-blur-md shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Featured Case Study</span>
                </span>
              )}
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-3 mb-6">
            <h3 className="text-xl sm:text-3xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
              {project.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              {project.role && (
                <span className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-300">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{project.role}</span>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span suppressHydrationWarning>
                  {project.createdAt 
                    ? new Date(project.createdAt).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'short' })
                    : '2026'}
                </span>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Jonli Sayt / Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/[0.1] hover:border-black/20 dark:hover:border-white/[0.2] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repozitoriya</span>
              </a>
            )}
          </div>

          {/* Detailed Content */}
          <div className="py-6 space-y-6">
            {/* System Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                System Overview & Architecture
              </h4>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Challenges & Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Engineering Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/50 border border-black/[0.06] dark:border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-300 font-mono text-xs font-semibold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                    <span>Technical Challenges</span>
                  </div>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        <span className="text-neutral-400 dark:text-neutral-500 mt-0.5">•</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Outcomes / Impact */}
              {project.outcomes && project.outcomes.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/50 border border-black/[0.06] dark:border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-300 font-mono text-xs font-semibold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Key Metrics & Results</span>
                  </div>
                  <ul className="space-y-2">
                    {project.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Technologies & Tools Leveraged
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-neutral-200/60 dark:bg-neutral-900 border border-black/[0.04] dark:border-white/[0.08] text-xs font-mono text-neutral-800 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
