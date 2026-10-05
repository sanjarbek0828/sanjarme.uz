'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowDown, 
  Copy, 
  Check, 
  Zap, 
  Bot, 
  Clock,
  Sparkles,
  Send 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, TelegramIcon, XIcon } from '@/components/ui/Icons';
import { SiteContent } from '@/lib/types';
import { useLanguage } from '@/lib/language-context';

interface HeroProps {
  content: SiteContent['hero'];
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const { t, language } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const locale = language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'uz-UZ';
        const formatter = new Intl.DateTimeFormat(locale, {
          timeZone: 'Asia/Tashkent',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setTimeStr(formatter.format(now));
      } catch {
        setTimeStr('17:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [language]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sanjarbekotabekov010@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const cityLabel = language === 'ru' ? 'Ташкент' : language === 'en' ? 'Tashkent' : 'Toshkent';

  return (
    <section className="relative min-h-[85vh] sm:min-h-[85vh] pt-24 sm:pt-28 pb-10 sm:pb-14 flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Smooth Atmospheric Ambient Glows (Zero-Jank GPU Layers) */}
      <div className="absolute top-1/4 left-1/12 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-sky-500/10 dark:bg-sky-500/8 blur-3xl pointer-events-none animate-ambient-float gpu-layer" />
      <div className="absolute bottom-1/4 right-1/12 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-500/8 blur-3xl pointer-events-none animate-ambient-float gpu-layer" style={{ animationDelay: '-7s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean, High-Impact Professional Presentation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-5 gpu-layer"
          >
            {/* Live Availability Status */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-wrap items-center gap-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/[0.08] dark:bg-emerald-500/[0.14] border border-emerald-500/25 text-[11px] sm:text-xs font-mono text-emerald-800 dark:text-emerald-300 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-semibold">{t.hero.statusBadge}</span>
              </div>

              {timeStr && (
                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-[11px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <Clock className="w-3 h-3 text-sky-500" />
                  <span>{cityLabel} · {timeStr}</span>
                </div>
              )}
            </motion.div>

            {/* Clear, Confident Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1 w-full"
            >
              <h1 className="text-[1.75rem] xs:text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight font-['Space_Grotesk'] text-neutral-950 dark:text-white leading-[1.1]">
                {t.hero.name}
              </h1>
              <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-apple-headline tracking-tight">
                {t.hero.titlePart1} <span className="text-apple-headline">{t.hero.titlePart2}</span> {t.hero.titlePart3}
              </p>
            </motion.div>

            {/* Concise, Professional Summary */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl font-normal leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            {/* Primary Action Group */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 w-full"
            >
              {/* Primary: Projects */}
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-sm font-semibold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all inline-flex items-center gap-2 shadow-md hover:shadow-xl group cursor-pointer"
              >
                <span>{t.hero.viewProjects}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              {/* Professional Services & Pricing button */}
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#services"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-sm font-semibold text-sky-600 dark:text-sky-400 bg-sky-500/[0.08] hover:bg-sky-500/[0.14] border border-sky-500/25 transition-all cursor-pointer inline-flex items-center gap-2 group shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-500 group-hover:scale-110 transition-transform" />
                <span>{t.hero.calcPrice}</span>
              </motion.a>

              {/* Secondary: Contact */}
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-sm font-semibold text-neutral-900 dark:text-white bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.1] dark:border-white/[0.14] transition-all cursor-pointer inline-flex items-center gap-2 group shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 group-hover:translate-x-0.5 transition-transform" />
                <span>{t.nav.connect}</span>
              </motion.a>

              {/* Instant Copy Email Pill */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopyEmail}
                className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.07] border border-black/[0.06] dark:border-white/[0.08] transition-colors inline-flex items-center gap-2 cursor-pointer"
                title="Email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">{t.contact.copiedEmail}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs font-mono hidden sm:inline">sanjarbekotabekov010@gmail.com</span>
                    <span className="text-xs font-mono sm:hidden">Email</span>
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Social Profiles & Core Stack */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="pt-4 flex flex-wrap items-center gap-3 sm:gap-6 border-t border-black/[0.08] dark:border-white/[0.08] w-full text-xs font-mono text-neutral-500 dark:text-neutral-400"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* GitHub */}
                <a
                  href="https://github.com/sanjarbek0828"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-xs"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/sanjarbek-otabekov-0600733bb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#0A66C2] text-white hover:bg-[#004182] transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-xs shadow-[#0A66C2]/20"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/sanjarbekdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#229ED9] text-white hover:bg-[#1d82b3] transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-xs shadow-[#229ED9]/20"
                  aria-label="Telegram"
                  title="Telegram"
                >
                  <TelegramIcon className="w-4 h-4" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/sanjarbek_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-xs shadow-[#dc2743]/20"
                  aria-label="Instagram Profile"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com/sanjarme08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 border border-white/10 dark:border-black/10 transition-all duration-300 hover:scale-110 flex items-center justify-center shadow-xs"
                  aria-label="X (Twitter) Profile"
                  title="X (Twitter)"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-800 hidden sm:block" />

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Python'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-[10px] sm:text-[11px] font-mono text-neutral-700 dark:text-neutral-300 hover:border-black/20 dark:hover:border-white/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Portrait Photo with Dynamic Interactive Floating Badges */}
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
              {/* Radial backlight aura for depth & ambient glow */}
              <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-sky-400/20 via-indigo-500/15 to-transparent dark:from-sky-500/25 dark:via-indigo-500/20 dark:to-transparent blur-3xl pointer-events-none -z-10" />

              <div className="relative w-full max-w-[220px] xs:max-w-[260px] sm:max-w-[320px] lg:max-w-[370px] mx-auto">
                {/* Apple-grade Ultra Glass Portrait Showcase with Ambient Glow Rim */}
                <div className="relative p-1.5 sm:p-2.5 rounded-[22px] sm:rounded-[34px] ultra-glass shadow-2xl transition-all duration-500 hover:shadow-sky-500/20 group">
                  <div className="absolute -inset-0.5 rounded-[24px] sm:rounded-[36px] bg-gradient-to-tr from-sky-500/30 via-indigo-500/20 to-purple-500/30 opacity-40 group-hover:opacity-80 blur-xs transition-opacity -z-10" />
                  <div className="relative overflow-hidden rounded-[18px] sm:rounded-[28px] aspect-[1792/2400] bg-neutral-900">
                    <Image
                      src="/boy.jpg"
                      alt="Sanjarbek Otabekov — Full Stack Dasturchi (sanjarme.uz)"
                      width={1792}
                      height={2400}
                      priority
                      quality={95}
                      className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      sizes="(max-width: 480px) 220px, (max-width: 640px) 260px, (max-width: 1024px) 320px, 370px"
                    />
                    {/* Subtle ambient light gradient for premium depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Floating Badge 1: Next.js 15 & React 19 (Top Right of Photo) */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="!absolute -top-3 sm:-top-4 -right-2 sm:-right-5 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl floating-badge-glass border border-black/[0.08] dark:border-white/[0.14] shadow-xl backdrop-blur-xl pointer-events-none"
                >
                  <div className="p-1 rounded-lg bg-sky-500/10 text-sky-500">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 block leading-none">Framework</span>
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white">Next.js 15 & React 19</span>
                  </div>
                </motion.div>

                {/* Floating Badge 2: Telegram Bot & APIs (Bottom Left of Photo) */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="!absolute -bottom-3 sm:-bottom-4 -left-2 sm:-left-5 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl floating-badge-glass border border-black/[0.08] dark:border-white/[0.14] shadow-xl backdrop-blur-xl pointer-events-none"
                >
                  <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-500">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 block leading-none">Automations</span>
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white">Telegram Bots & APIs</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Quiet Scroll Indicator */}
        <div className="pt-6 sm:pt-10 flex justify-center">
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
