'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Maximize2, 
  X, 
  Calendar,
  Search,
  Award 
} from 'lucide-react';
import { Certificate } from '@/lib/types';
import { useLanguage } from '@/lib/language-context';

interface CertificatesProps {
  certificates: Certificate[];
}

export const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  const { language, t } = useLanguage();
  const [activeLightboxCert, setActiveLightboxCert] = useState<Certificate | null>(null);
  const [activeIssuer, setActiveIssuer] = useState<string>('all');
  const [certSearch, setCertSearch] = useState<string>('');

  const rawIssuers = useMemo(() => {
    const set = new Set<string>();
    certificates.forEach(c => {
      if (c.issuer) set.add(c.issuer);
    });
    return ['all', ...Array.from(set)];
  }, [certificates]);

  const filteredCerts = useMemo(() => {
    const q = certSearch.trim().toLowerCase();
    return certificates.filter(c => {
      const matchesIssuer = activeIssuer === 'all' || c.issuer.toLowerCase() === activeIssuer.toLowerCase();
      const matchesQuery = !q ||
        c.title.toLowerCase().includes(q) ||
        (c.issuer && c.issuer.toLowerCase().includes(q)) ||
        (c.skills && c.skills.some(s => s.toLowerCase().includes(q)));
      return matchesIssuer && matchesQuery;
    });
  }, [certificates, activeIssuer, certSearch]);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLightboxCert(null);
    };
    if (activeLightboxCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightboxCert]);

  return (
    <section id="certificates" className="relative py-14 sm:py-28 lg:py-32 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Apple Clean */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass-pill text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-2.5 sm:mb-3 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-emerald-500" />
            <span className="uppercase tracking-widest font-semibold">{t.certificates.badge}</span>
          </div>

          <h2 className="text-[1.5rem] sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
            {t.certificates.headingPart1} <span className="text-apple-headline">{t.certificates.headingPart2}</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2 sm:mt-3 max-w-xl text-xs sm:text-base font-normal leading-relaxed">
            {language === 'uz'
              ? `Coursera, Meta, Google, Packt va Pearson tomonidan berilgan professional dasturiy ta'minot muhandisligi sertifikatlari (${certificates.length} ta).`
              : language === 'ru'
              ? `Профессиональные сертификаты по разработке ПО от Coursera, Meta, Google, Packt и Pearson (${certificates.length} шт.).`
              : `Professional software engineering certifications issued by Coursera, Meta, Google, Packt, and Pearson (${certificates.length} credentials).`}
          </p>

          {/* Filter Bar: Issuers + Search Input */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl">
            {/* Issuer Filter Pills */}
            <div className="inline-flex p-1 rounded-full bg-neutral-100/80 dark:bg-neutral-900/70 border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-xl max-w-full overflow-x-auto no-scrollbar shadow-xs">
              {rawIssuers.map((issuer) => {
                const isActive = activeIssuer === issuer;
                return (
                  <button
                    key={issuer}
                    onClick={() => setActiveIssuer(issuer)}
                    className="relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white whitespace-nowrap"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCertIssuerTab"
                        className="absolute inset-0 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 shadow-xs"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-black dark:text-white font-semibold' : ''}`}>
                      {issuer === 'all' ? (language === 'uz' ? 'Barchasi' : language === 'ru' ? 'Все' : 'All') : issuer}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={certSearch}
                onChange={(e) => setCertSearch(e.target.value)}
                placeholder={language === 'uz' ? 'Sertifikatlardan qidirish...' : language === 'ru' ? 'Поиск сертификатов...' : 'Search certificates...'}
                className="w-full pl-8 pr-4 py-1.5 rounded-full apple-glass-pill text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all shadow-xs"
              />
              {certSearch && (
                <button
                  onClick={() => setCertSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-black dark:hover:text-white font-mono px-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredCerts.map((cert, index) => {
            const certImg = cert.imageUrl || cert.image || '/placeholder-cert.jpg';
            const certLink = cert.credentialUrl || cert.link;
            const certDate = cert.dateIssued || cert.year;

            return (
              <motion.div
                key={cert.id || index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="rounded-2xl sm:rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] flex flex-col justify-between overflow-hidden group gpu-layer cursor-pointer"
              >
                {/* Preview Image with zoom trigger */}
                <div 
                  onClick={() => setActiveLightboxCert(cert)}
                  className="relative w-full h-32 sm:h-44 overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-950"
                >
                  <Image
                    src={certImg}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fbfbfd] dark:from-neutral-950 via-transparent to-transparent opacity-60" />
                  
                  {/* Issuer Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded-full bg-white/80 dark:bg-black/70 border border-black/10 dark:border-white/10 text-[9px] sm:text-[10px] font-mono text-neutral-800 dark:text-neutral-300 backdrop-blur-md shadow-xs">
                      {cert.issuer}
                    </span>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                  <div className="space-y-1.5">
                    <h3 
                      onClick={() => setActiveLightboxCert(cert)}
                      className="text-[11px] sm:text-sm md:text-base font-semibold font-['Space_Grotesk'] text-neutral-950 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors cursor-pointer line-clamp-2"
                    >
                      {cert.title}
                    </h3>

                    {certDate && (
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{certDate}</span>
                      </div>
                    )}

                    {cert.credentialId && (
                      <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 dark:text-neutral-400 block truncate">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => setActiveLightboxCert(cert)}
                      className="text-[10px] sm:text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span className="hidden sm:inline">{t.certificates.clickToEnlarge}</span>
                      <span className="sm:hidden">{language === 'uz' ? 'Ochish' : language === 'ru' ? 'Открыть' : 'View'}</span>
                      <Maximize2 className="w-3 h-3" />
                    </button>

                    {certLink && (
                      <a
                        href={certLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                        title={t.certificates.verify}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state when search yields no certificates */}
        {filteredCerts.length === 0 && (
          <div className="text-center py-16 apple-glass-card rounded-3xl max-w-md mx-auto p-8 border border-black/[0.08] dark:border-white/[0.08]">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {language === 'uz'
                ? `"${certSearch}" bo'yicha hech qanday sertifikat topilmadi.`
                : language === 'ru'
                ? `Сертификаты по запросу "${certSearch}" не найдены.`
                : `No certificates found matching "${certSearch}".`}
            </p>
            <button
              onClick={() => { setCertSearch(''); setActiveIssuer('all'); }}
              className="mt-3 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              {language === 'uz' ? 'Filtrlarni tozalash' : language === 'ru' ? 'Очистить фильтры' : 'Clear filters'}
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeLightboxCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveLightboxCert(null)}
                className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-neutral-950 p-3 sm:p-6 z-10 shadow-2xl space-y-3 sm:space-y-4 text-left transition-colors duration-300 max-h-[92vh] overflow-y-auto"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div className="space-y-0.5">
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white font-['Space_Grotesk']">
                      {activeLightboxCert.title}
                    </h3>
                    <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      {t.certificates.issuedBy}: {activeLightboxCert.issuer} {activeLightboxCert.dateIssued || activeLightboxCert.year ? `· ${activeLightboxCert.dateIssued || activeLightboxCert.year}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    {(activeLightboxCert.credentialUrl || activeLightboxCert.link) && (
                      <a
                        href={activeLightboxCert.credentialUrl || activeLightboxCert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{language === 'uz' ? 'Rasmiy havola' : language === 'ru' ? 'Официальная ссылка' : 'Official Link'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => setActiveLightboxCert(null)}
                      className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-black/[0.08] dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer ml-auto sm:ml-0"
                      aria-label={t.certificates.close}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative w-full aspect-[4/3] max-h-[60vh] rounded-xl overflow-hidden bg-neutral-100 dark:bg-black">
                  <Image
                    src={activeLightboxCert.imageUrl || activeLightboxCert.image || '/placeholder-cert.jpg'}
                    alt={activeLightboxCert.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

