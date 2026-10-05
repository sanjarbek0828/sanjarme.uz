'use client';

import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';
import { 
  Language, 
  TranslationDictionary, 
  translations, 
  projectTranslations, 
  milestoneTranslations, 
  serviceTranslations 
} from './translations';
import { Project, MilestoneItem, ServiceItem } from './types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  getTranslatedProject: (project: Project) => Project;
  getTranslatedMilestone: (milestone: MilestoneItem) => MilestoneItem;
  getTranslatedService: (service: ServiceItem) => ServiceItem;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [, startTransition] = useTransition();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('preferred_language') as Language | null;
      if (saved && (saved === 'uz' || saved === 'ru' || saved === 'en')) {
        startTransition(() => {
          setLanguageState(saved);
        });
        if (typeof document !== 'undefined') {
          document.documentElement.lang = saved;
        }
      } else {
        // Default language is English ('en')
        startTransition(() => {
          setLanguageState('en');
        });
        if (typeof document !== 'undefined') {
          document.documentElement.lang = 'en';
        }
      }
    } catch {}
  }, []);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('preferred_language', newLang);
    } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
  };

  const t = translations[language] || translations.en;

  const getTranslatedProject = (project: Project): Project => {
    const override = projectTranslations[project.id]?.[language] || projectTranslations[project.slug || '']?.[language];
    if (!override) return project;

    return {
      ...project,
      title: override.title || project.title,
      description: override.description || project.description,
      desc: override.description || project.desc,
      longDescription: override.longDescription || project.longDescription || override.description,
      role: override.role || project.role,
      category: override.category || project.category,
      challenges: override.challenges || project.challenges,
      outcomes: override.outcomes || project.outcomes,
    };
  };

  const getTranslatedMilestone = (milestone: MilestoneItem): MilestoneItem => {
    const override = milestoneTranslations[milestone.id]?.[language];
    if (!override) return milestone;

    return {
      ...milestone,
      title: override.title || milestone.title,
      organization: override.organization || milestone.organization,
      description: override.description || milestone.description,
      highlights: override.highlights || milestone.highlights,
      badge: override.badge || milestone.badge,
    };
  };

  const getTranslatedService = (service: ServiceItem): ServiceItem => {
    const override = serviceTranslations[service.id]?.[language];
    if (!override) return service;

    return {
      ...service,
      title: override.title || service.title,
      desc: override.desc || service.desc,
      priceRange: override.priceRange || service.priceRange,
    };
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getTranslatedProject,
        getTranslatedMilestone,
        getTranslatedService,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
