'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { MilestoneItem } from '@/lib/types';
import { initialMilestones } from '@/lib/initial-data';

interface ExperienceProps {
  milestones?: MilestoneItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ milestones = initialMilestones }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'work' | 'education'>('all');

  const filteredMilestones = milestones.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'work') return item.category === 'work';
    if (activeTab === 'education') return item.category === 'education' || item.category === 'achievement';
    return true;
  });

  const getCategoryIcon = (category: MilestoneItem['category']) => {
    switch (category) {
      case 'work':
        return <Briefcase className="w-4 h-4 text-sky-500" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-indigo-500" />;
      case 'achievement':
        return <Award className="w-4 h-4 text-emerald-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <section id="experience" className="relative py-28 sm:py-36 bg-[#fafafc] dark:bg-[#08080a] transition-colors duration-300 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-sky-500/5 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass-pill text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-4 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5 text-sky-500" />
            <span className="tracking-wide uppercase font-semibold">Faoliyat & Yo&apos;nalish</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
            Tajriba & <span className="text-apple-headline">Rivojlanish Yo&apos;li</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base lg:text-lg font-normal leading-relaxed">
            Amaliy loyihalar, xalqaro akkreditatsiyalar va uzluksiz texnologik yuksalish bosqichlari.
          </p>

          {/* Segmented Filter Pills */}
          <div className="mt-8 inline-flex p-1 rounded-full apple-glass-pill shadow-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-white/15 text-black dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Barchasi ({milestones.length})
            </button>
            <button
              onClick={() => setActiveTab('work')}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'work'
                  ? 'bg-white dark:bg-white/15 text-black dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Amaliy Tajriba
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-white dark:bg-white/15 text-black dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Ta&apos;lim & Sertifikatlar
            </button>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central subtle line (desktop) */}
          <div className="hidden md:block absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-sky-500/20 via-black/[0.08] dark:via-white/[0.08] to-transparent pointer-events-none" />

          <div className="space-y-6 sm:space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredMilestones.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="relative flex flex-col md:flex-row gap-4 sm:gap-6 items-start group"
                >
                  {/* Left Icon Node */}
                  <div className="hidden md:flex relative z-10 w-16 h-16 rounded-2xl apple-glass-card border border-black/[0.08] dark:border-white/[0.1] items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-sky-500/40 transition-all duration-300 shadow-xs">
                    {getCategoryIcon(item.category)}
                  </div>

                  {/* Main Milestone Card */}
                  <div className="flex-1 w-full p-5 sm:p-7 md:p-8 rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] space-y-4 hover:shadow-xl transition-all duration-300">
                    
                    {/* Top Row: Title, Organization & Period Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="md:hidden p-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.08]">
                            {getCategoryIcon(item.category)}
                          </span>
                          <h3 className="text-base sm:text-xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                          {item.organization}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {item.badge}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono text-neutral-700 dark:text-neutral-300">
                          <Calendar className="w-3 h-3 text-neutral-400" />
                          <span>{item.period}</span>
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {/* Highlights / Accomplishments */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="pt-2 space-y-2 border-t border-black/[0.05] dark:border-white/[0.06]">
                        {item.highlights.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{point}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Skills Used */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.08] text-[11px] font-mono text-neutral-700 dark:text-neutral-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};
