'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Globe2, Clock, Zap, Layers, Music, Award, GitBranch } from 'lucide-react';
import { SiteContent } from '@/lib/types';

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
  const expYearsNum = typeof content.yearsExperience === 'number' 
    ? content.yearsExperience 
    : parseInt(String(content.yearsExperience)) || 1;

  const commitsNum = parseInt(String(content.githubCommits || '110')) || 110;

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Apple Clean */}
        <div className="flex flex-col items-start mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3 block">
            Falsafa & Tajriba
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
            {content.heading || 'Men Haqimda'} — <span className="text-apple-headline">Maqsad & Yondashuv</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-3 max-w-2xl text-base font-normal leading-relaxed">
            Murakkab texnik vazifalarga ijodiy, qulay va mustahkam arxitekturaviy yechimlar yaratish.
          </p>
        </div>

        {/* Apple Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.div 
              whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              className="p-6 sm:p-8 rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] space-y-5 gpu-layer"
            >
              <h3 className="text-lg sm:text-2xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                Raqamli qulaylik va yuqori tezlikdagi arxitektura
              </h3>

              {content.bioParagraphs && content.bioParagraphs.length > 0 ? (
                content.bioParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-xs sm:text-sm md:text-base font-normal">
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-xs sm:text-sm md:text-base font-normal">
                    Zamonaviy veb-arxitektura va yuqori tezlikdagi raqamli mahsulotlar yaratishga ixtisoslashgan Full Stack muhandisman. Murakkab vazifalarga toza kod, ilg&apos;or texnologiyalar va intuitiv interfeyslar orqali qulay yechim topaman.
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-xs sm:text-sm md:text-base font-normal">
                    Mening maqsadim — har bir loyihada yuqori yuklanish tezligi, xavfsizlik va mukammal foydalanuvchi tajribasini (UX) ta&apos;minlash. Next.js, TypeScript va zamonaviy texnologiyalar bilan bizneslar uchun aniq natija beruvchi yechimlar yarataman.
                  </p>
                </>
              )}

              {/* Working Principles */}
              <div className="pt-5 border-t border-black/[0.06] dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-neutral-200/60 dark:bg-neutral-800/80 border border-black/[0.04] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-300 mt-0.5 shrink-0">
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-neutral-950 dark:text-white">Foydalanuvchi Tajribasi (UX)</h4>
                    <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                      Saytga kirgan har bir inson o&apos;zini erkin va ishonchli his qilishi uchun qulay dizayn.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-neutral-200/60 dark:bg-neutral-800/80 border border-black/[0.04] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-300 mt-0.5 shrink-0">
                    <Layers className="w-4 h-4 text-sky-500" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-neutral-950 dark:text-white">Toza & Modulli Arxitektura</h4>
                    <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                      TypeScript, toza komponentlar va kelajakda oson kengayuvchi mustahkam kod bazasi.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Facts Card */}
            <motion.div 
              whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              className="p-4 sm:p-5 rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 gpu-layer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400">
                  <MapPin className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">Manzil</span>
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white">{content.location || 'Toshkent, UZ'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400">
                  <Clock className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">Bandlik</span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{content.availability || 'Frilans & Loyihalar'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400">
                  <Globe2 className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">Muloqot tillari</span>
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white">O&apos;zbek, Ingliz, Rus</span>
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
                <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase">Tajriba</span>
                <div>
                  <span className="text-2xl sm:text-4xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white block">
                    <AnimatedCounter value={expYearsNum} suffix="+" />
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1 block leading-tight">
                    Yillik amaliy dasturlash tajribasi
                  </span>
                </div>
              </motion.div>

              {/* Stat 2: GitHub Commits */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.01, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                className="p-3.5 sm:p-5 rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] flex flex-col justify-between min-h-[8.5rem] sm:min-h-[10rem] gpu-layer cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase">GitHub Faollik</span>
                  <GitBranch className="w-3.5 h-3.5 text-neutral-400" />
                </div>
                <div>
                  <span className="text-2xl sm:text-4xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white block">
                    <AnimatedCounter value={commitsNum} suffix="+" />
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1 block leading-tight">
                    Ushbu yildagi faol commitlar
                  </span>
                </div>
              </motion.div>

              {/* Stat 3: Xalqaro Sertifikatlar */}
              <motion.div 
                whileHover={{ y: -4, scale: 1.01, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                className="p-3.5 sm:p-5 rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] flex flex-col justify-between min-h-[8.5rem] sm:min-h-[10rem] gpu-layer cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase">Sertifikatlar</span>
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
                <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase">Barqarorlik</span>
                <div>
                  <span className="text-2xl sm:text-4xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white block">
                    <AnimatedCounter value={99.9} suffix="%" decimals={1} />
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-1 block leading-tight">
                    Toza kod & sifat kafolati
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Spotify "Coding Vibe / Music in Progress" Card */}
            <motion.div
              whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              className="p-4 sm:p-5 rounded-3xl apple-glass-card border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 flex items-center justify-between gap-3 sm:gap-4 gpu-layer overflow-hidden"
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

      </div>
    </section>
  );
};
