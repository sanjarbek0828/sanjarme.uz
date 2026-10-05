'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Globe2, Clock, Zap, Layers, Music, Award, GitBranch, Terminal } from 'lucide-react';
import { SiteContent } from '@/lib/types';
import { DevTerminal } from '@/components/ui/DevTerminal';
import { useLanguage } from '@/lib/language-context';

interface AboutProps {
  content: SiteContent['about'];
}

// Smooth easing counter animation
const AnimatedCounter: React.FC<{ value: number; suffix?: string; decimals?: number }> = ({
  value,
  suffix = '',
  decimals = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    const duration = 1400; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = easedProgress * value;
      setDisplayValue(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue)}
      {suffix}
    </span>
  );
};

export const About: React.FC<AboutProps> = ({ content }) => {
  const { t, language } = useLanguage();

  const expYearsNum = typeof content.yearsExperience === 'number' 
    ? content.yearsExperience 
    : parseInt(String(content.yearsExperience)) || 4;

  const commitsNum = parseInt(String(content.githubCommits || '110')) || 110;

  const uxTitle = language === 'ru' ? 'Пользовательский Опыт (UX)' : language === 'en' ? 'User Experience (UX)' : 'Foydalanuvchi Tajribasi (UX)';
  const uxDesc = language === 'ru'
    ? 'Интуитивный и чистый дизайн, создающий ощущение легкости и доверия у каждого посетителя.'
    : language === 'en'
    ? 'Intuitive, fluid design engineered so every visitor feels empowered, engaged, and delighted.'
    : "Saytga kirgan har bir inson o'zini erkin va ishonchli his qilishi uchun qulay dizayn.";

  const archTitle = language === 'ru' ? 'Чистая & Модульная Архитектура' : language === 'en' ? 'Clean & Modular Architecture' : 'Toza & Modulli Arxitektura';
  const archDesc = language === 'ru'
    ? 'Строгая типизация TypeScript, надежные компоненты и легко масштабируемая кодовая база.'
    : language === 'en'
    ? 'Strict TypeScript, isolated components, and a bulletproof, future-proof codebase.'
    : 'TypeScript, toza komponentlar va kelajakda oson kengayuvchi mustahkam kod bazasi.';

  return (
    <section id="about" className="relative py-14 sm:py-24 lg:py-32 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Apple Clean */}
        <div className="flex flex-col items-start mb-10 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2 sm:mb-3 block">
            {t.about.badge}
          </span>
          <h2 className="text-[1.5rem] sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
            {t.about.heading} — <span className="text-apple-headline">{t.about.cards.philosophy}</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2 sm:mt-3 max-w-2xl text-[13px] sm:text-base font-normal leading-relaxed">
            {t.about.quote}
          </p>
        </div>

        {/* Apple Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Main Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-4 sm:space-y-6"
          >
            <motion.div 
              whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              className="p-4 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] space-y-3.5 sm:space-y-5 gpu-layer"
            >
              <h3 className="text-base sm:text-xl lg:text-2xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                {t.about.cards.philosophy}
              </h3>

              <div className="space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed text-xs sm:text-sm md:text-base font-normal">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>

              {/* Working Principles */}
              <div className="pt-5 border-t border-black/[0.06] dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-neutral-200/60 dark:bg-neutral-800/80 border border-black/[0.04] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-300 mt-0.5 shrink-0">
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-neutral-950 dark:text-white">{uxTitle}</h4>
                    <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                      {uxDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-neutral-200/60 dark:bg-neutral-800/80 border border-black/[0.04] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-300 mt-0.5 shrink-0">
                    <Layers className="w-4 h-4 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-neutral-950 dark:text-white">{archTitle}</h4>
                    <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                      {archDesc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Facts Card */}
            <motion.div 
              whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 gpu-layer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400">
                  <MapPin className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                    {language === 'ru' ? 'Локация' : language === 'en' ? 'Location' : 'Manzil'}
                  </span>
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                    {language === 'ru' ? 'Ташкент, UZ' : language === 'en' ? 'Tashkent, UZ' : 'Toshkent, UZ'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400">
                  <Clock className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                    {language === 'ru' ? 'Занятость' : language === 'en' ? 'Status' : 'Bandlik'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {language === 'ru' ? 'Фриланс & Проекты' : language === 'en' ? 'Freelance & Projects' : 'Frilans & Loyihalar'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400">
                  <Globe2 className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                    {language === 'ru' ? 'Языки' : language === 'en' ? 'Languages' : 'Muloqot tillari'}
                  </span>
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                    {language === 'ru' ? 'Узбекский, Русский, EN' : language === 'en' ? 'Uzbek, English, RU' : "O'zbek, Ingliz, Rus"}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Stats & Spotify Vibe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* 2x2 Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Stat 1: Tajriba */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.01, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                className="p-3.5 sm:p-5 rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] flex flex-col justify-between min-h-[8.5rem] sm:min-h-[10rem] gpu-layer cursor-default"
              >
                <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase">
                  {language === 'ru' ? 'Опыт' : language === 'en' ? 'Experience' : 'Tajriba'}
                </span>
                <div>
                  <span className="text-2xl sm:text-4xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white block">
                    <AnimatedCounter value={expYearsNum} suffix="+" />
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1 block leading-tight">
                    {language === 'ru' ? 'Года практического опыта' : language === 'en' ? 'Years of production engineering' : 'Yillik amaliy dasturlash tajribasi'}
                  </span>
                </div>
              </motion.div>

              {/* Stat 2: GitHub Commits */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.01, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                className="p-3.5 sm:p-5 rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] flex flex-col justify-between min-h-[8.5rem] sm:min-h-[10rem] gpu-layer cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase">
                    {language === 'ru' ? 'Активность' : language === 'en' ? 'GitHub' : 'GitHub Faollik'}
                  </span>
                  <GitBranch className="w-3.5 h-3.5 text-neutral-400" />
                </div>
                <div>
                  <span className="text-2xl sm:text-4xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white block">
                    <AnimatedCounter value={commitsNum} suffix="+" />
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1 block leading-tight">
                    {language === 'ru' ? 'Активных коммитов в этом году' : language === 'en' ? 'Active commits this year' : 'Ushbu yildagi faol commitlar'}
                  </span>
                </div>
              </motion.div>

              {/* Stat 3: Xalqaro Sertifikatlar */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.01, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                className="p-3.5 sm:p-5 rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] flex flex-col justify-between min-h-[8.5rem] sm:min-h-[10rem] gpu-layer cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase">
                    {language === 'ru' ? 'Сертификаты' : language === 'en' ? 'Certs' : 'Sertifikatlar'}
                  </span>
                  <Award className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div>
                  <span className="text-2xl sm:text-4xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white block">
                    <AnimatedCounter value={11} suffix="+" />
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1 block leading-tight">
                    Meta, Google, Coursera
                  </span>
                </div>
              </motion.div>

              {/* Stat 4: Sifat va Ishonchlilik */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.01, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                className="p-3.5 sm:p-5 rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] flex flex-col justify-between min-h-[8.5rem] sm:min-h-[10rem] gpu-layer cursor-default"
              >
                <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase">
                  {language === 'ru' ? 'Надежность' : language === 'en' ? 'Reliability' : 'Barqarorlik'}
                </span>
                <div>
                  <span className="text-2xl sm:text-4xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white block">
                    <AnimatedCounter value={99.9} suffix="%" decimals={1} />
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1 block leading-tight">
                    {language === 'ru' ? 'Чистый код и стандарты качества' : language === 'en' ? 'Clean code & QA standards' : 'Toza kod & sifat kafolati'}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Spotify "Coding Vibe / Music in Progress" Card */}
            <motion.div
              whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              className="p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl apple-glass-card border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 flex items-center justify-between gap-3 sm:gap-4 gpu-layer overflow-hidden"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Music className="w-5 h-5 animate-pulse" />
                  {/* Subtle equalizer bars animation */}
                  <div className="absolute -bottom-1 flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-2 bg-emerald-500 rounded-full animate-[bounce_1s_infinite_100ms]" />
                    <span className="w-0.5 h-3 bg-emerald-500 rounded-full animate-[bounce_1.2s_infinite_300ms]" />
                    <span className="w-0.5 h-1.5 bg-emerald-500 rounded-full animate-[bounce_0.8s_infinite_200ms]" />
                  </div>
                </div>

                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                      Coding Vibe
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                    {content.spotifySong || 'Lofi Programming Coding Playlist'}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                    {content.spotifyArtist || 'Coding Playlist • Deep Focus'}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono border border-emerald-500/20 flex-shrink-0 hidden sm:inline-block">
                Spotify
              </span>
            </motion.div>
          </motion.div>

        </div>

        {/* Interactive Developer Terminal Playground */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 sm:mt-16 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-3 px-1 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span className="uppercase tracking-wider font-semibold">
              {language === 'ru' ? 'Интерактивный Терминал Разработчика (CLI)' : language === 'en' ? 'Interactive Developer Terminal (CLI)' : 'Interaktiv Dasturchi Terminali (CLI)'}
            </span>
            <span className="text-neutral-400 dark:text-neutral-600 hidden sm:inline">
              {language === 'ru' ? '• введите команду для проверки' : language === 'en' ? '• type a command to explore' : "• buyruq yozib tekshirib ko'ring"}
            </span>
          </div>
          <DevTerminal />
        </motion.div>

      </div>
    </section>
  );
};
