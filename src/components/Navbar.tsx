'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  ShieldCheck, 
  Search,
  User,
  Wrench,
  Layers,
  FolderGit2,
  Award,
  Mail,
  Send
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { CommandPalette } from './ui/CommandPalette';

const NAV_LINKS = [
  { name: 'Haqimda', href: '#about', icon: User },
  { name: 'Ko\'nikmalar', href: '#skills', icon: Wrench },
  { name: 'Xizmatlar', href: '#services', icon: Layers },
  { name: 'Loyihalar', href: '#projects', icon: FolderGit2 },
  { name: 'Sertifikatlar', href: '#certificates', icon: Award },
  { name: 'Aloqa', href: '#contact', icon: Mail },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Global shortcut: ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.08] py-3 shadow-xs'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* Apple-style Clean Brand */}
            <Link
              href="/"
              className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer focus:outline-none min-w-0"
            >
              <span className="font-semibold tracking-tight text-neutral-900 dark:text-white text-sm sm:text-base lg:text-lg font-['Space_Grotesk'] truncate">
                Sanjarbek Otabekov
              </span>
              <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline-block">
                / Full Stack
              </span>
            </Link>

            {/* Desktop Navigation - Apple Segmented Clean Links */}
            <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full apple-glass-pill shadow-2xs">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white rounded-full transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action buttons - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {/* Cmd+K Quick Search Pill */}
              <button
                onClick={() => setCmdPaletteOpen(true)}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full apple-glass-pill text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                title="Tezkor Qidiruv (⌘K)"
                aria-label="Quick Search"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden lg:inline text-[11px]">Qidiruv</span>
                <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-black/[0.05] dark:bg-white/[0.08] border border-black/[0.05] dark:border-white/[0.08]">
                  ⌘K
                </kbd>
              </button>

              <ThemeToggle />

              <Link
                href="/admin"
                className="p-2 text-neutral-500 hover:text-black dark:hover:text-neutral-300 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors"
                title="Admin Boshqaruv Paneli"
                aria-label="Admin Panel"
              >
                <ShieldCheck className="w-4 h-4" />
              </Link>


              <a
                href="#contact"
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 active:scale-[0.98] transition-all inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>Bog&apos;lanish</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Controls */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={() => setCmdPaletteOpen(true)}
                className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white active:scale-95 transition-all"
                title="Tezkor Qidiruv"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <ThemeToggle />
              <Link
                href="/admin"
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white active:scale-95 transition-all"
                title="Admin"
                aria-label="Admin"
              >
                <ShieldCheck className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] active:scale-95 transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Animated Dropdown Drawer - Apple Frosted Sheet */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.1] shadow-xl"
            >
              <div className="px-4 py-5 space-y-2 max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-2 pb-3">
                  {NAV_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 p-3 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-black/[0.04] dark:border-white/[0.06] text-xs font-medium text-neutral-800 dark:text-neutral-200 active:scale-[0.98] transition-all"
                      >
                        <Icon className="w-4 h-4 text-sky-500 shrink-0" />
                        <span className="truncate">{link.name}</span>
                      </a>
                    );
                  })}
                </div>



                {/* Mobile Direct Action Buttons */}
                <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center gap-2">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Bog&apos;lanish</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://t.me/sanjarbekdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 active:scale-95 transition-all"
                    title="Telegram"
                    aria-label="Telegram"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={cmdPaletteOpen} onClose={() => setCmdPaletteOpen(false)} />
    </>
  );
};
