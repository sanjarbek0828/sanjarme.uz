'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { TestimonialItem } from '@/lib/types';
import { initialTestimonials } from '@/lib/initial-data';
import { useLanguage } from '@/lib/language-context';

interface TestimonialsProps {
  testimonials?: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = initialTestimonials,
}) => {
  const { language } = useLanguage();

  return (
    <section id="testimonials" className="relative py-14 sm:py-28 lg:py-36 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-sky-500/5 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass-pill text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-3 sm:mb-4 shadow-2xs">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
            <span className="tracking-wide uppercase font-semibold">
              {language === 'uz' ? 'Ishonch & Natijalar' : language === 'ru' ? 'Доверие и Результаты' : 'Trust & Results'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
            {language === 'uz' ? 'Mijozlar & ' : language === 'ru' ? 'Отзывы ' : 'Client & '}
            <span className="text-apple-headline">
              {language === 'uz' ? 'Hamkorlar Fikrlari' : language === 'ru' ? 'Партнёров' : 'Partner Reviews'}
            </span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2 sm:mt-4 max-w-2xl text-xs sm:text-base lg:text-lg font-normal leading-relaxed">
            {language === 'uz'
              ? 'Haqiqiy loyihalarda birga ishlagan hamkorlar va mijozlarning amaliy tajriba hamda hamkorlik haqidagi xulosalari.'
              : language === 'ru'
              ? 'Отзывы клиентов и партнёров о результатах совместной работы над реальными проектами.'
              : 'Feedback from clients and partners on practical collaboration and high-impact digital delivery.'}
          </p>

          {/* Quick Trust Badges */}
          <div className="mt-4 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>
                {language === 'uz' ? "5.0 / 5.0 O'rtacha reyting" : language === 'ru' ? '5.0 / 5.0 Средний рейтинг' : '5.0 / 5.0 Average Rating'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                {language === 'uz' ? "100% Mas'uliyatli topshirish" : language === 'ru' ? '100% Ответственная сдача' : '100% On-Time Delivery'}
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-7">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl vision-glass-card border border-black/[0.07] dark:border-white/[0.09] flex flex-col justify-between space-y-4 sm:space-y-6 relative overflow-hidden group shadow-sm hover:shadow-2xl transition-all"
            >
              {/* Quote Mark Watermark */}
              <Quote className="absolute top-4 right-4 w-12 h-12 text-black/[0.03] dark:text-white/[0.04] pointer-events-none -rotate-12" />

              <div className="space-y-4 relative z-10">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Author & Project Info */}
              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] relative z-10">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                        {item.name}
                      </h4>
                      {item.verified && (
                        <span title={language === 'uz' ? 'Tasdiqlangan mijoz' : language === 'ru' ? 'Подтверждённый клиент' : 'Verified Client'} className="inline-flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {item.role} · <span className="font-medium text-neutral-700 dark:text-neutral-300">{item.company}</span>
                    </p>
                  </div>

                  {item.projectTitle && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shrink-0 hidden sm:inline-block">
                      {item.projectTitle}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

