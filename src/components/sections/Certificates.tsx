'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Maximize2, 
  X, 
  Calendar 
} from 'lucide-react';
import { Certificate } from '@/lib/types';

interface CertificatesProps {
  certificates: Certificate[];
}

export const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  const [activeLightboxCert, setActiveLightboxCert] = useState<Certificate | null>(null);

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
    <section id="certificates" className="relative py-24 sm:py-32 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Apple Clean */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3 block">
            Akkreditatsiyalar & Malaka
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
            Xalqaro <span className="text-apple-headline">Sertifikatlar</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-3 max-w-xl text-base font-normal leading-relaxed">
            Coursera, Meta, Google, Packt va Pearson tomonidan berilgan professional dasturiy ta&apos;minot muhandisligi sertifikatlari.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {certificates.map((cert, index) => {
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
                className="rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] flex flex-col justify-between overflow-hidden group gpu-layer cursor-pointer"
              >
                {/* Preview Image with zoom trigger */}
                <div 
                  onClick={() => setActiveLightboxCert(cert)}
                  className="relative w-full h-40 sm:h-44 overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-950"
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
                    <span className="px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-black/70 border border-black/10 dark:border-white/10 text-[10px] font-mono text-neutral-800 dark:text-neutral-300 backdrop-blur-md shadow-xs">
                      {cert.issuer}
                    </span>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 
                      onClick={() => setActiveLightboxCert(cert)}
                      className="text-xs sm:text-sm md:text-base font-semibold font-['Space_Grotesk'] text-neutral-950 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors cursor-pointer line-clamp-2"
                    >
                      {cert.title}
                    </h3>

                    {certDate && (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{certDate}</span>
                      </div>
                    )}

                    {cert.credentialId && (
                      <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 block truncate">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => setActiveLightboxCert(cert)}
                      className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Sertifikatni ochish</span>
                      <Maximize2 className="w-3 h-3" />
                    </button>

                    {certLink && (
                      <a
                        href={certLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                        title="Haqiqiyligini tekshirish"
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

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeLightboxCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
                className="relative w-full max-w-3xl rounded-3xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-neutral-950 p-4 sm:p-6 z-10 shadow-2xl space-y-4 text-left transition-colors duration-300 max-h-[92vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-950 dark:text-white font-['Space_Grotesk']">
                      {activeLightboxCert.title}
                    </h3>
                    <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      Beruvchi: {activeLightboxCert.issuer} {activeLightboxCert.dateIssued || activeLightboxCert.year ? `· ${activeLightboxCert.dateIssued || activeLightboxCert.year}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {(activeLightboxCert.credentialUrl || activeLightboxCert.link) && (
                      <a
                        href={activeLightboxCert.credentialUrl || activeLightboxCert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Rasmiy havola</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => setActiveLightboxCert(null)}
                      className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-black/[0.08] dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
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
