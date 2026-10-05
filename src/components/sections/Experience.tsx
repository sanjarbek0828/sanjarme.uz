'use client';

import React, { useState, useMemo } from 'react';
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
import { useLanguage } from '@/lib/language-context';

interface ExperienceProps {
  milestones?: MilestoneItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ milestones = initialMilestones }) => {
  const { t, getTranslatedMilestone } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'work' | 'education'>('all');

  const translatedMilestones = useMemo(() => {
    return (milestones || initialMilestones).map(getTranslatedMilestone);
  }, [milestones, getTranslatedMilestone]);

  const filteredMilestones = translatedMilestones.filter((item) => {
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
    <section id="experience" className="relative py-14 sm:py-28 lg:py-36 bg-[#fafafc] dark:bg-[#08080a] transition-colors duration-300 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-sky-500/5 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass-pill text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-3 sm:mb-4 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5 text-sky-500" />
            <span className="tracking-wide uppercase font-semibold">{t.experience.badge}</span>
          </div>

          <h2 className="text-[1.5rem] sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
            {t.experience.headingPart1} <span className="text-apple-headline">{t.experience.headingPart2}</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2 sm:mt-4 max-w-2xl text-xs sm:text-base lg:text-lg font-normal leading-relaxed">
            {t.experience.sub}
          </p>

          {/* Segmented Filter Pills with iOS Spring Motion */}
          <div className="mt-5 sm:mt-8 inline-flex p-1 rounded-full apple-glass-pill shadow-xs max-w-full overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'all', label: `${t.experience.filterAll} (${milestones.length})` },
                { id: 'work', label: t.experience.filterWork },
                { id: 'education', label: t.experience.filterEdu },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeExperienceTab"
                      className="absolute inset-0 bg-white dark:bg-white/15 rounded-full shadow-xs border border-black/5 dark:border-white/10"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-black dark:text-white font-semibold' : ''}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central subtle line (desktop) with glowing gradient */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-sky-500/40 via-indigo-500/20 to-transparent pointer-events-none" />

          <div className="space-y-4 sm:space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredMilestones.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="relative flex flex-col md:flex-row gap-3 sm:gap-6 items-start group"
                >
                  {/* Left Icon Node with Glowing Aura */}
                  <div className="hidden md:flex relative z-10 w-16 h-16 rounded-2xl vision-glass-card border border-black/[0.08] dark:border-white/[0.1] items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-sky-500/50 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-300 shadow-xs">
                    {getCategoryIcon(item.category)}
                  </div>

                  {/* Main Milestone Card with Shimmer Rim Light */}
                  <div className="flex-1 w-full p-4 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl vision-glass-card specular-rim border border-black/[0.07] dark:border-white/[0.09] space-y-3 sm:space-y-4 hover:shadow-2xl transition-all duration-300 relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-sky-400/60 before:to-transparent before:opacity-30 group-hover:before:opacity-100 before:transition-opacity before:duration-500">
                    
                    {/* Top Row: Title, Organization & Period Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="md:hidden p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08]">
                            {getCategoryIcon(item.category)}
                          </span>
                          <h3 className="text-base sm:text-xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500/60 inline-block" />
                          <span>{item.organization}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {item.badge}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono text-neutral-700 dark:text-neutral-300">
                          <Calendar className="w-3 h-3 text-sky-500" />
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
                      <div className="pt-2.5 space-y-2 border-t border-black/[0.05] dark:border-white/[0.06]">
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
                            className="px-2.5 py-0.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] border border-black/[0.05] dark:border-white/[0.08] text-[11px] font-mono text-neutral-700 dark:text-neutral-300 transition-colors cursor-default"
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

