'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Terminal } from 'lucide-react';
import { SkillItem } from '@/lib/types';
import { getAuthenticSkillLogo } from '@/components/ui/TechLogos';

interface SkillsProps {
  skills: SkillItem[];
}

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Database', 'DevOps & Tools', 'Design & Other'] as const;

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.category && skill.category.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [skills, activeCategory, searchQuery]);

  const parseLevelNumber = (lvl: number | string): number => {
    if (typeof lvl === 'number') return lvl;
    const num = parseInt(lvl);
    if (!isNaN(num)) return num;
    const lower = String(lvl).toLowerCase();
    if (lower.includes('expert')) return 95;
    if (lower.includes('advanced')) return 80;
    return 65;
  };

  const getLevelColor = (level: number | string) => {
    const num = parseLevelNumber(level);
    if (num >= 80) return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
    if (num >= 65) return 'bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30';
    return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30';
  };

  const getLevelDot = (level: number | string) => {
    const num = parseLevelNumber(level);
    if (num >= 80) return 'bg-emerald-500';
    if (num >= 65) return 'bg-sky-500';
    return 'bg-amber-500';
  };

  return (
    <section id="skills" className="relative py-28 sm:py-36 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      {/* Ambient Glassmorphism Refraction Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Apple Clean Editorial */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full apple-glass-pill text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span className="tracking-wide uppercase font-semibold">Texnik Ko&apos;nikmalar</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
            Amaliy <span className="text-apple-headline">Texnologiyalar & Stack</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-4 max-w-2xl text-base sm:text-lg font-normal leading-relaxed">
            Haqiqiy loyihalarda sinovdan o&apos;tgan, tezkor va xavfsiz tizimlarni yaratishda foydalaniladigan zamonaviy vositalar.
          </p>

          {/* Controls: Segmented Category Pills & Search Input */}
          <div className="mt-10 flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl justify-center">
            
            {/* Apple Segmented Filter Pills */}
            <div className="inline-flex p-1 rounded-full apple-glass-pill max-w-full overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white whitespace-nowrap"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSkillCategoryTab"
                        className="absolute inset-0 rounded-full bg-white dark:bg-white/15 border border-black/10 dark:border-white/20 shadow-xs"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-black dark:text-white font-semibold' : ''}`}>
                      {cat}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Filter Search Bar */}
            <div className="relative w-full md:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Qidirish..."
                className="w-full pl-8 pr-4 py-2 rounded-full apple-glass-pill text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-black dark:hover:text-white font-mono px-1"
                >
                  ✕
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Skills Grid - Apple Ultra-Frosted Glass Cards */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const numLevel = parseLevelNumber(skill.level);
              return (
                <motion.div
                  key={skill.name + index}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  whileHover={{ y: -3, scale: 1.015, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                  transition={{ duration: 0.28, delay: index * 0.012 }}
                  className="apple-glass-card rounded-2xl p-3.5 sm:p-5 group cursor-default gpu-layer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      
                      {/* Left: Authentic Logo + Skill Name & Experience */}
                      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.1] shadow-xs flex items-center justify-center p-2 sm:p-2.5 group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-neutral-800/80 transition-all duration-300 shrink-0">
                          {skill.iconUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img 
                              src={skill.iconUrl} 
                              alt={skill.name} 
                              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                              onError={(e) => {
                                // Fallback to TechLogos
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            getAuthenticSkillLogo(skill.name, "w-5 h-5 sm:w-6 sm:h-6 object-contain")
                          )}
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold tracking-tight text-neutral-900 dark:text-white group-hover:text-black dark:group-hover:text-neutral-100 transition-colors truncate">
                            {skill.name}
                          </h4>
                        </div>
                      </div>

                      {/* Right: Proficiency Badge */}
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-medium shrink-0 ${getLevelColor(skill.level)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getLevelDot(skill.level)} animate-pulse`} />
                        {numLevel}%
                      </span>

                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3.5 w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${numLevel}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-sky-400 dark:to-indigo-400"
                      />
                    </div>
                  </div>

                  {/* Subtle Refined Bottom Metadata */}
                  <div className="mt-4 pt-3 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      {skill.category || 'Dasturlash'}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {numLevel >= 85 ? 'Mastery' : numLevel >= 70 ? 'Advanced' : 'Proficient'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state when search yields no matches */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-16 apple-glass-card rounded-2xl max-w-md mx-auto">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              &quot;{searchQuery}&quot; bo&apos;yicha ko&apos;nikmalar topilmadi.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-3 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}

        {/* Apple Architecture Callout Card */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl apple-glass-card border border-black/[0.08] dark:border-white/[0.1] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-sky-500/10 dark:bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <Terminal className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
              <span>Full-Stack & Cloud Arxitektura</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white font-['Space_Grotesk'] tracking-tight">
              Yangi loyihangiz uchun mos texnologiyalar kerakmi?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Veb-ilovalardan tortib avtomatlashtirilgan Telegram botlargacha har qanday vazifaga eng maqbul va ishonchli texnologik yechim tanlaymiz.
            </p>
          </div>

          <div className="relative z-10">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full text-xs font-semibold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 active:scale-[0.98] transition-all whitespace-nowrap shadow-xs inline-flex items-center gap-2"
            >
              <span>Loyiha bo&apos;yicha maslahat olish</span>
              <span>→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
