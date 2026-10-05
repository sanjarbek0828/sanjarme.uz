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
  X,
  Briefcase
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, XIcon } from '@/components/ui/Icons';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';

interface CommandItem {
  id: string;
  title: string;
  category: string;
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
  const { language, t } = useLanguage();
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
        title: language === 'uz' ? 'Asosiy Sahifa (Home)' : language === 'ru' ? 'Главная страница (Home)' : 'Home Page',
        category: t.commandPalette.navCategory,
        icon: <Sparkles className="w-4 h-4 text-sky-500" />,
        perform: () => navigateTo('#'),
        shortcut: 'G H',
        subtext: language === 'uz' ? 'Yuqori qismga qaytish' : language === 'ru' ? 'Вернуться наверх' : 'Back to top',
      },
      {
        id: 'nav-about',
        title: t.nav.about,
        category: t.commandPalette.navCategory,
        icon: <User className="w-4 h-4 text-neutral-500" />,
        perform: () => navigateTo('#about'),
        shortcut: 'G A',
        subtext: language === 'uz' ? 'Falsafa, tajriba va Spotify coding vibe' : language === 'ru' ? 'Философия, опыт и атмосфера работы' : 'Philosophy, background, and workflow',
      },
      {
        id: 'nav-skills',
        title: t.nav.skills,
        category: t.commandPalette.navCategory,
        icon: <Sparkles className="w-4 h-4 text-amber-500" />,
        perform: () => navigateTo('#skills'),
        shortcut: 'G S',
        subtext: language === 'uz' ? '12+ dasturlash texnologiyalari va tajriba foizlari' : language === 'ru' ? '12+ технологий и уровень владения' : '12+ technologies and skill percentages',
      },
      {
        id: 'nav-experience',
        title: t.nav.experience,
        category: t.commandPalette.navCategory,
        icon: <Briefcase className="w-4 h-4 text-sky-500" />,
        perform: () => navigateTo('#experience'),
        shortcut: 'G E',
        subtext: language === 'uz' ? 'Amaliy loyihalar, Meta akkreditatsiyasi va kiberxavfsizlik' : language === 'ru' ? 'Практические проекты, аккредитации и развитие' : 'Hands-on projects, credentials, and achievements',
      },
      {
        id: 'nav-services',
        title: t.nav.services,
        category: t.commandPalette.navCategory,
        icon: <Sparkles className="w-4 h-4 text-violet-500" />,
        perform: () => navigateTo('#services'),
        shortcut: 'G X',
        subtext: language === 'uz' ? 'Telegram botlar, Landing sahifalar va narx kalkulyatori' : language === 'ru' ? 'Telegram боты, лендинги и онлайн-калькулятор' : 'Telegram bots, landing pages, and price estimator',
      },
      {
        id: 'nav-projects',
        title: t.nav.projects,
        category: t.commandPalette.navCategory,
        icon: <FolderGit2 className="w-4 h-4 text-indigo-500" />,
        perform: () => navigateTo('#projects'),
        shortcut: 'G P',
        subtext: 'Mebel Mashhura, FilmX, 3D Earth, Finalytix',
      },
      {
        id: 'nav-certificates',
        title: t.nav.certificates,
        category: t.commandPalette.navCategory,
        icon: <Award className="w-4 h-4 text-emerald-500" />,
        perform: () => navigateTo('#certificates'),
        shortcut: 'G C',
        subtext: language === 'uz' ? 'Coursera, Meta, Google, Packt va Pearson sertifikatlari' : language === 'ru' ? 'Сертификаты Coursera, Meta, Google, Packt и Pearson' : 'Coursera, Meta, Google, Packt, and Pearson certificates',
      },
      {
        id: 'nav-contact',
        title: t.nav.contact,
        category: t.commandPalette.navCategory,
        icon: <Mail className="w-4 h-4 text-sky-500" />,
        perform: () => navigateTo('#contact'),
        shortcut: 'G M',
        subtext: language === 'uz' ? 'Xabar yoki loyiha taklifini yuborish' : language === 'ru' ? 'Отправить сообщение или предложение о проекте' : 'Send an inquiry or project proposal',
      },

      // Actions
      {
        id: 'act-theme',
        title: t.commandPalette.switchTheme,
        category: t.commandPalette.actionsCategory,
        icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800" />,
        perform: () => {
          toggleTheme();
          onClose();
        },
        shortcut: 'T',
        subtext: language === 'uz' ? 'Sayt interfeysi ko\'rinishini almashtirish' : language === 'ru' ? 'Переключить тему оформления' : 'Toggle dark and light color theme',
      },
      {
        id: 'act-copy-email',
        title: copiedEmail ? t.commandPalette.emailCopied : t.commandPalette.copyEmail,
        category: t.commandPalette.actionsCategory,
        icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Mail className="w-4 h-4 text-neutral-500" />,
        perform: copyEmail,
        shortcut: 'C E',
        subtext: 'sanjarbekotabekov010@gmail.com',
      },
      {
        id: 'act-resume',
        title: language === 'uz' ? 'GitHub Repozitoriyalarni ko\'rish' : language === 'ru' ? 'Открыть репозитории GitHub' : 'View GitHub Repositories',
        category: t.commandPalette.actionsCategory,
        icon: <FileText className="w-4 h-4 text-blue-500" />,
        perform: () => {
          window.open('https://github.com/sanjarbek0828', '_blank');
          onClose();
        },
        shortcut: 'R',
        subtext: 'github.com/sanjarbek0828',
      },

      // Social
      {
        id: 'soc-telegram',
        title: language === 'uz' ? 'Telegram orqali bog\'lanish' : language === 'ru' ? 'Связаться через Telegram' : 'Connect via Telegram',
        category: t.commandPalette.socialCategory,
        icon: <Sparkles className="w-4 h-4 text-sky-500" />,
        perform: () => {
          window.open('https://t.me/sanjarbekdev', '_blank');
          onClose();
        },
        subtext: '@sanjarbekdev',
      },
      {
        id: 'soc-instagram',
        title: language === 'uz' ? 'Instagram profilini ochish' : language === 'ru' ? 'Открыть профиль Instagram' : 'Open Instagram Profile',
        category: t.commandPalette.socialCategory,
        icon: <InstagramIcon className="w-4 h-4 text-pink-500" />,
        perform: () => {
          window.open('https://instagram.com/sanjarbek_dev', '_blank');
          onClose();
        },
        subtext: '@sanjarbek_dev',
      },
      {
        id: 'soc-github',
        title: language === 'uz' ? 'GitHub profilini ochish' : language === 'ru' ? 'Открыть профиль GitHub' : 'Open GitHub Profile',
        category: t.commandPalette.socialCategory,
        icon: <GithubIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />,
        perform: () => {
          window.open('https://github.com/sanjarbek0828', '_blank');
          onClose();
        },
        subtext: 'github.com/sanjarbek0828',
      },
      {
        id: 'soc-linkedin',
        title: language === 'uz' ? 'LinkedIn profilini ochish' : language === 'ru' ? 'Открыть профиль LinkedIn' : 'Open LinkedIn Profile',
        category: t.commandPalette.socialCategory,
        icon: <LinkedinIcon className="w-4 h-4 text-blue-500" />,
        perform: () => {
          window.open('https://linkedin.com/in/sanjarbek-otabekov-0600733bb/', '_blank');
          onClose();
        },
        subtext: 'linkedin.com/in/sanjarbek-otabekov',
      },
      {
        id: 'soc-twitter',
        title: language === 'uz' ? 'X (Twitter) profilini ochish' : language === 'ru' ? 'Открыть профиль X (Twitter)' : 'Open X (Twitter) Profile',
        category: t.commandPalette.socialCategory,
        icon: <XIcon className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />,
        perform: () => {
          window.open('https://x.com/sanjarme08', '_blank');
          onClose();
        },
        subtext: 'x.com/sanjarme08',
      },

      // System
      {
        id: 'sys-admin',
        title: t.commandPalette.openAdmin,
        category: t.commandPalette.systemCategory,
        icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />,
        perform: () => {
          router.push('/admin');
          onClose();
        },
        subtext: t.commandPalette.adminDesc,
      },
    ];
  }, [theme, toggleTheme, copiedEmail, navigateTo, copyEmail, router, onClose, language, t]);

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
              placeholder={t.commandPalette.placeholder}
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
                {language === 'uz'
                  ? `"${query}" bo'yicha buyruqlar topilmadi`
                  : language === 'ru'
                  ? `Команды по запросу "${query}" не найдены`
                  : `No commands matching "${query}"`}
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
              <span>↑↓ {language === 'uz' ? 'Harakat' : language === 'ru' ? 'Навигация' : 'Navigate'}</span>
              <span>↵ {language === 'uz' ? 'Tanlash' : language === 'ru' ? 'Выбрать' : 'Select'}</span>
              <span>ESC {language === 'uz' ? 'Yopish' : language === 'ru' ? 'Закрыть' : 'Close'}</span>
            </div>
            <span>Sanjarbek Portfolio</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

