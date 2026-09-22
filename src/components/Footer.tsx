'use client';

import React from 'react';
import Link from 'next/link';
import { Send, Mail, ArrowUp, Shield, Star, GitFork } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-black/[0.06] dark:border-white/[0.08] bg-[#f5f5f7] dark:bg-black pt-16 pb-12 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-black/[0.06] dark:border-white/[0.06]">
          
          {/* Col 1: Bio / Brand */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-['Space_Grotesk'] text-xl font-bold text-neutral-950 dark:text-white tracking-tight block">
              Sanjarbek Otabekov
            </span>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-md leading-relaxed font-normal">
              Full Stack muhandis — Next.js, React, Node.js, Telegram botlar va bulutli infratuzilmalar bo&apos;yicha ixtisoslashgan. Har bir loyihada tezlik, toza arxitektura va yuqori ishonchlilik ustuvor hisoblanadi.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://github.com/sanjarbek0828"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors shadow-xs"
                aria-label="GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/in/sanjarbek-otabekov"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors shadow-xs"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://t.me/sanjarbek_404"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center text-sky-500 hover:text-sky-600 dark:hover:text-white transition-colors shadow-xs"
                aria-label="Telegram"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:sanjarbekotabekov010@gmail.com"
                className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors shadow-xs"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Navigatsiya
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <a href="#about" className="hover:text-black dark:hover:text-white transition-colors">Haqimda</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-black dark:hover:text-white transition-colors">Ko&apos;nikmalar</a>
              </li>
              <li>
                <a href="#services" className="hover:text-black dark:hover:text-white transition-colors">Xizmatlar</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-black dark:hover:text-white transition-colors">Loyihalar</a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-black dark:hover:text-white transition-colors">Sertifikatlar</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">Aloqa</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal & GitHub Activity */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Tizim & Repozitoriya
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <a
                  href="https://github.com/sanjarbek0828/sanjarme.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition-colors"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>GitHub: sanjarme.uz</span>
                  <GitFork className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Shield className="w-3 h-3 text-neutral-500" />
                  <span>Admin Boshqaruv</span>
                </Link>
              </li>
              <li>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono block">
                  ● Yangi loyihalar uchun ochiq
                </span>
              </li>
              <li>
                <span className="text-neutral-500 block">
                  Toshkent, O&apos;zbekiston · UTC+5
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} Sanjarbek Otabekov • <span className="text-neutral-700 dark:text-neutral-300 font-medium">sanjarme.uz</span>. Barcha huquqlar himoyalangan.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.08] transition-colors cursor-pointer text-xs shadow-xs"
            aria-label="Back to top"
          >
            <span>Yuqoriga</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
