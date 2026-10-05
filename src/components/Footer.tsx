'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, TelegramIcon, XIcon } from '@/components/ui/Icons';
import { useLanguage } from '@/lib/language-context';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-black/[0.06] dark:border-white/[0.08] bg-[#f5f5f7] dark:bg-black pt-12 sm:pt-16 pb-8 sm:pb-12 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-black/[0.06] dark:border-white/[0.06]">
          
          {/* Col 1: Bio / Brand */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-neutral-950 dark:text-white tracking-tight block">
              Sanjarbek Otabekov
            </span>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm max-w-md leading-relaxed font-normal">
              {t.footer.bio}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://github.com/sanjarbek0828"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                aria-label="GitHub"
                title="GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sanjarbek-otabekov-0600733bb/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs shadow-[#0A66C2]/20"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://t.me/sanjarbekdev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#229ED9] text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs shadow-[#229ED9]/20"
                aria-label="Telegram"
                title="Telegram"
              >
                <TelegramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com/sanjarbek_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs shadow-[#dc2743]/20"
                aria-label="Instagram"
                title="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://x.com/sanjarme08"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-black text-white dark:bg-white dark:text-black border border-white/10 dark:border-black/10 flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                aria-label="X (Twitter)"
                title="X (Twitter)"
              >
                <XIcon className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <a href="#about" className="hover:text-black dark:hover:text-white transition-colors">{t.nav.about}</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-black dark:hover:text-white transition-colors">{t.nav.skills}</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-black dark:hover:text-white transition-colors">{t.nav.experience}</a>
              </li>
              <li>
                <a href="#services" className="hover:text-black dark:hover:text-white transition-colors">{t.nav.services}</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-black dark:hover:text-white transition-colors">{t.nav.projects}</a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-black dark:hover:text-white transition-colors">{t.nav.certificates}</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">{t.nav.contact}</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal & Controls */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {t.footer.systemStatus}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Shield className="w-3 h-3 text-neutral-500" />
                  <span>{t.footer.adminPanel}</span>
                </Link>
              </li>
              <li>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono block">
                  {t.footer.available}
                </span>
              </li>
              <li>
                <span className="text-neutral-500 block">
                  {t.footer.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 text-center sm:text-left">
          <p suppressHydrationWarning className="leading-relaxed">
            © {new Date().getFullYear()} Sanjarbek Otabekov • <span className="text-neutral-700 dark:text-neutral-300 font-medium">sanjarme.uz</span>. {t.footer.rights}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] transition-colors cursor-pointer text-xs shadow-xs"
            aria-label="Back to top"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};

