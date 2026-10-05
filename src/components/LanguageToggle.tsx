'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';
import { Language } from '@/lib/translations';
import { Globe } from 'lucide-react';

const LANGUAGES: { code: Language; label: string; full: string }[] = [
  { code: 'uz', label: 'UZ', full: "O'zbekcha" },
  { code: 'ru', label: 'RU', full: 'Русский' },
  { code: 'en', label: 'EN', full: 'English' },
];

interface LanguageToggleProps {
  variant?: 'pill' | 'compact' | 'full';
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  variant = 'pill',
  className = '' 
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-0.5 p-0.5 sm:gap-1 sm:p-1 rounded-full apple-glass-pill shadow-2xs ${className}`}>
        {LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`relative px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'text-neutral-950 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title={lang.full}
              aria-label={`Switch to ${lang.full}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeLangCompact"
                  className="absolute inset-0 bg-white dark:bg-white/20 rounded-full shadow-2xs"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{lang.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 border border-black/[0.06] dark:border-white/[0.08] ${className}`}>
        {LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`relative py-2 px-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-white/15 text-neutral-950 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span className="font-mono text-[11px]">{lang.label}</span>
              <span className="text-[11px] truncate">{lang.full}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Default 'pill' variant
  return (
    <div
      className={`inline-flex items-center gap-0.5 p-0.5 rounded-full apple-glass-pill shadow-2xs border border-black/[0.06] dark:border-white/[0.08] ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <div className="pl-1.5 pr-0.5 text-neutral-400 dark:text-neutral-500">
        <Globe className="w-3 h-3" />
      </div>
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`relative px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-medium transition-colors duration-200 cursor-pointer ${
              isActive
                ? 'text-neutral-950 dark:text-white font-bold'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
            title={lang.full}
            aria-label={`Switch to ${lang.full}`}
          >
            {isActive && (
              <motion.div
                layoutId="activeLangIndicator"
                className="absolute inset-0 bg-white dark:bg-white/20 rounded-full shadow-2xs"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
};
