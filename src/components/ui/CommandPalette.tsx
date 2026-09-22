'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ArrowRight, 
  Sun, 
  Moon, 
  Mail, 
  Check, 
  FolderGit2, 
  FileText, 
  Sparkles, 
  Award, 
  User, 
  ShieldCheck, 
  X 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { useTheme } from '@/lib/theme-context';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Social' | 'System';
  icon: React.ReactNode;
  perform: () => void;
  shortcut?: string;
  subtext?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('sanjarbekotabekov010@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  }, [onClose]);

  const navigateTo = useCallback((hash: string) => {
    onClose();
    const elem = document.querySelector(hash);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = hash;
    }
  }, [onClose]);

  const items: CommandItem[] = useMemo(() => {
    return [
      // Navigation
      {
        id: 'nav-home',
        title: 'Asosiy Sahifa (Home)',
        category: 'Navigation',
        icon: <Sparkles className="w-4 h-4 text-sky-500" />,
        perform: () => navigateTo('#'),
        shortcut: 'G H',
        subtext: 'Yuqori qismga qaytish',
      },
      {
        id: 'nav-about',
        title: 'Men haqimda (About)',
        category: 'Navigation',
        icon: <User className="w-4 h-4 text-neutral-500" />,
        perform: () => navigateTo('#about'),
        shortcut: 'G A',
        subtext: 'Falsafa, tajriba va Spotify coding vibe',
      },
      {
        id: 'nav-skills',
        title: 'Texnik Ko\'nikmalar (Skills)',
        category: 'Navigation',
        icon: <Sparkles className="w-4 h-4 text-amber-500" />,
        perform: () => navigateTo('#skills'),
        shortcut: 'G S',
        subtext: '12+ dasturlash texnologiyalari va tajriba foizlari',
      },
      {
        id: 'nav-services',
        title: 'Xizmatlar & Narxlar (Services)',
        category: 'Navigation',
        icon: <Sparkles className="w-4 h-4 text-violet-500" />,
        perform: () => navigateTo('#services'),
        shortcut: 'G X',
        subtext: 'Telegram botlar, Landing sahifalar va narxlar',
      },
      {
        id: 'nav-projects',
        title: 'Tanlangan Loyihalar (Projects)',
        category: 'Navigation',
        icon: <FolderGit2 className="w-4 h-4 text-indigo-500" />,
        perform: () => navigateTo('#projects'),
        shortcut: 'G P',
        subtext: 'Mebel Mashhura, 3D Earth, Aura Tracker',
      },
      {
        id: 'nav-certificates',
        title: 'Xalqaro Sertifikatlar (Certificates)',
        category: 'Navigation',
        icon: <Award className="w-4 h-4 text-emerald-500" />,
        perform: () => navigateTo('#certificates'),
        shortcut: 'G C',
        subtext: 'Coursera, Meta, Google, Packt va Pearson sertifikatlari',
      },
      {
        id: 'nav-contact',
        title: 'Bog\'lanish (Contact)',
        category: 'Navigation',
        icon: <Mail className="w-4 h-4 text-sky-500" />,
        perform: () => navigateTo('#contact'),
        shortcut: 'G M',
        subtext: 'Xabar yoki loyiha taklifini yuborish',
      },

      // Actions
      {
        id: 'act-theme',
        title: theme === 'dark' ? 'Yorug\' rejimga o\'tish (Light)' : 'Tungi rejimga o\'tish (Dark)',
        category: 'Actions',
        icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800" />,
        perform: () => {
          toggleTheme();
          onClose();
        },
        shortcut: 'T',
        subtext: 'Sayt interfeysi ko\'rinishini almashtirish',
      },
      {
        id: 'act-copy-email',
        title: copiedEmail ? 'Nusxa olindi!' : 'Email manzilidan nusxa olish',
        category: 'Actions',
        icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Mail className="w-4 h-4 text-neutral-500" />,
        perform: copyEmail,
        shortcut: 'C E',
        subtext: 'sanjarbekotabekov010@gmail.com',
      },
      {
        id: 'act-resume',
        title: 'GitHub Repozitoriyalarni ko\'rish',
        category: 'Actions',
        icon: <FileText className="w-4 h-4 text-blue-500" />,
        perform: () => {
          window.open('https://github.com/sanjarbek404', '_blank');
          onClose();
        },
        shortcut: 'R',
        subtext: 'github.com/sanjarbek404',
      },

      // Social
      {
        id: 'soc-telegram',
        title: 'Telegram orqali bog\'lanish',
        category: 'Social',
        icon: <Sparkles className="w-4 h-4 text-sky-500" />,
        perform: () => {
          window.open('https://t.me/sanjarbek_404', '_blank');
          onClose();
        },
        subtext: '@sanjarbek_404',
      },
      {
        id: 'soc-github',
        title: 'GitHub profilini ochish',
        category: 'Social',
        icon: <GithubIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />,
        perform: () => {
          window.open('https://github.com/sanjarbek404', '_blank');
          onClose();
        },
        subtext: 'github.com/sanjarbek404',
      },
      {
        id: 'soc-linkedin',
        title: 'LinkedIn profilini ochish',
        category: 'Social',
        icon: <LinkedinIcon className="w-4 h-4 text-blue-500" />,
        perform: () => {
          window.open('https://linkedin.com/in/sanjarbek-otabekov', '_blank');
          onClose();
        },
        subtext: 'linkedin.com/in/sanjarbek-otabekov',
      },

      // System
      {
        id: 'sys-admin',
        title: 'Admin Boshqaruv Paneliga kirish',
        category: 'System',
        icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
        perform: () => {
          router.push('/admin');
          onClose();
        },
        subtext: 'Loyihalar, sertifikatlar, xizmatlar va xabarlarni boshqarish',
      },
    ];
  }, [theme, toggleTheme, copiedEmail, navigateTo, copyEmail, router, onClose]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.subtext && item.subtext.toLowerCase().includes(q))
    );
  }, [items, query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].perform();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-28 px-3 sm:px-4 overflow-y-auto">
        {/* Apple Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl rounded-3xl apple-glass-card border border-black/10 dark:border-white/15 bg-white/95 dark:bg-neutral-950/95 shadow-2xl overflow-hidden z-10 text-left"
        >
          {/* Header Search Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-black/[0.08] dark:border-white/[0.08] gap-3">
            <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Qidirish yoki buyruq kiritish..."
              className="flex-1 bg-transparent text-base sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none"
            />
            <button
              onClick={handleClose}
              className="p-1 rounded-md text-neutral-400 hover:text-black dark:hover:text-white text-xs font-mono"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List of Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-transparent">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-xs text-neutral-500 font-mono">
                No commands matching &quot;{query}&quot;
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => item.perform()}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-black/[0.06] dark:bg-white/[0.1] text-neutral-950 dark:text-white'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.03] dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-medium block truncate">
                          {item.title}
                        </span>
                        {item.subtext && (
                          <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 block truncate">
                            {item.subtext}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      {item.shortcut && (
                        <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-400 dark:text-neutral-500 bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08]">
                          {item.shortcut}
                        </kbd>
                      )}
                      <ArrowRight className={`w-3 h-3 text-neutral-400 transition-transform ${isSelected ? 'translate-x-0.5' : 'opacity-0'}`} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 border-t border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
            <span>Sanjarbek Portfolio</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
