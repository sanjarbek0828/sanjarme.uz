'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { SiteContent } from '@/lib/types';

interface HeroProps {
  content: SiteContent['hero'];
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sanjarbekotabekov010@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Smooth Atmospheric Ambient Glows (Zero-Jank GPU Layers) */}
      <div className="absolute top-1/4 left-1/12 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-sky-500/10 dark:bg-sky-500/8 blur-3xl pointer-events-none animate-ambient-float gpu-layer" />
      <div className="absolute bottom-1/4 right-1/12 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-500/8 blur-3xl pointer-events-none animate-ambient-float gpu-layer" style={{ animationDelay: '-7s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Apple Editorial Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-7 gpu-layer"
          >
            {/* Apple-style Minimal Status Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900/90 border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{content.availabilityStatus || 'Loyihalar va frilans uchun ochiq'}</span>
            </motion.div>

            {/* Apple Grand Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 w-full"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-['Space_Grotesk'] text-neutral-950 dark:text-white leading-[1.1] break-words">
                <span className="block">{content.name || 'Sanjarbek Otabekov'}</span>
                <span className="block text-apple-headline font-semibold mt-1">
                  {content.role || 'Full Stack Dasturchi'}
                </span>
              </h1>
            </motion.div>

            {/* Editorial Tagline */}
            <motion.p 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg lg:text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl font-normal leading-relaxed"
            >
              {content.tagline || 'Tezkor, xavfsiz va zamonaviy raqamli tizimlar arxitekturasi.'}
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed font-normal"
            >
              {content.subtext || 'Next.js, TypeScript va zamonaviy veb texnologiyalar yordamida biznes va foydalanuvchilar uchun yuqori samaradorlikka ega mahsulotlar yarataman.'}
            </motion.p>

            {/* Apple Signature Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 w-full"
            >
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 shadow-xs group cursor-pointer"
              >
                <span>{content.primaryCtaText || 'Loyihalarni ko‘rish'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.1] dark:border-white/[0.12] transition-colors cursor-pointer"
              >
                <span>{content.secondaryCtaText || 'Bog‘lanish'}</span>
              </motion.a>

              {/* Instant Copy Email Pill */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyEmail}
                className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.1] transition-colors inline-flex items-center gap-2 cursor-pointer"
                title="Email manzilni nusxalash"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">Nusxalandi!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs font-mono sm:hidden">Email nusxalash</span>
                    <span className="text-xs font-mono hidden sm:inline">sanjarbekotabekov010@gmail.com</span>
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Apple Minimalist Footer Line: Social & Core Tech */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="pt-6 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-black/[0.08] dark:border-white/[0.08] w-full text-xs font-mono text-neutral-500 dark:text-neutral-400"
            >
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/sanjarbek0828"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors p-1"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sanjarbek-otabekov-0600733bb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors p-1"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://t.me/sanjarbekdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 dark:text-neutral-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors p-1"
                  aria-label="Telegram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </a>
              </div>

              <div className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-800 hidden sm:block" />

              <div className="flex flex-wrap items-center gap-2">
                {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Python', 'Three.js'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-[11px] font-mono text-neutral-700 dark:text-neutral-300 hover:border-black/20 dark:hover:border-white/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Free-Standing Character Cutout (Pure, Crisp, No Extra Frames) */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
            }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center select-none gpu-layer"
          >
            {/* Subtle floating breathing motion */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex items-center justify-center w-full gpu-layer"
            >
              {/* Radial backlight aura for depth & crisp silhouette separation */}
              <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-sky-400/15 via-indigo-500/10 to-transparent dark:from-sky-500/25 dark:via-indigo-500/20 dark:to-transparent blur-3xl pointer-events-none -z-10" />

              {/* Character Cutout - Razor-Sharp Studio Portrait */}
              <Image
                src="/personaj.png"
                alt="Sanjarbek Otabekov — Full Stack Dasturchi (sanjarme.uz)"
                width={1561}
                height={1774}
                priority
                quality={100}
                className="object-contain max-h-[380px] sm:max-h-[520px] lg:max-h-[640px] w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] pointer-events-none crisp-render"
                sizes="(max-width: 768px) 340px, (max-width: 1200px) 500px, 600px"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* Quiet Scroll Indicator */}
        <div className="pt-16 flex justify-center">
          <a
            href="#about"
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-neutral-300 transition-colors group cursor-pointer"
            aria-label="Scroll to About section"
          >
            <span>Explore</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
