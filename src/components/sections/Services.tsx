'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Layout, ArrowUpRight, CheckCircle2, MessageSquare, Zap, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '@/lib/types';

interface ServicesProps {
  services?: ServiceItem[];
}

export const Services: React.FC<ServicesProps> = ({ services = [] }) => {
  const displayServices = services && services.length > 0 ? services : [
    {
      id: 'srv-1',
      title: 'Telegram Bot',
      desc: 'Marketingni va biznes jarayonlarini avtomatlashtiruvchi, to\'lov tizimlari (Click, Payme) ulangan professional Telegram botlar.',
      priceRange: '150$ – 1500$',
      icon: 'Bot',
    },
    {
      id: 'srv-2',
      title: 'Landing Pagelar',
      desc: 'Sotuv do\'koni, xizmatlar yoki marketplace uchun yuqori konversiyali, tezkor va zamonaviy veb sahifalar.',
      priceRange: '20$ – 300$',
      icon: 'Code',
    },
  ];

  const getServiceFeatures = (title: string) => {
    if (title.toLowerCase().includes('bot')) {
      return [
        'To\'liq avtomatlashtirilgan mijozlar boshqaruvi',
        'Click, Payme yoki xalqaro to\'lov integratsiyasi',
        'Admin panel va buyurtmalar statistikasi',
        '24/7 serverda barqaror uzluksiz ishlash kafolati'
      ];
    }
    return [
      'Mukammal mobil va planshet moslashuvchanligi (Responsive)',
      'Yuqori tezlik (Lighthouse 95+ ball)',
      'Zamonaviy Apple-style dizayn va mikro-animatsiyalar',
      'SEO optimizatsiya va qidiruv tizimlariga moslashtirish'
    ];
  };

  return (
    <section id="services" className="relative py-28 sm:py-36 bg-[#fafafa] dark:bg-[#070709] transition-colors duration-300 overflow-hidden">
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-sky-500/5 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass-pill text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-4 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className="tracking-wide uppercase font-semibold">Xizmatlar & Yechimlar</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
            Biznesingiz Uchun <span className="text-apple-headline">Sifatli Xizmatlar</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base lg:text-lg font-normal leading-relaxed">
            Zamonaviy veb-saytlar va avtomatlashtirilgan tizimlar orqali savdolarni oshirish va ishlarni yengillashtirish.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {displayServices.map((service, idx) => {
            const isBot = service.title.toLowerCase().includes('bot');
            const features = getServiceFeatures(service.title);

            return (
              <motion.div
                key={service.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="rounded-3xl apple-glass-card p-6 sm:p-8 md:p-10 border border-black/[0.08] dark:border-white/[0.1] flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow-xl transition-all"
              >
                {/* Glow Accent */}
                <div 
                  className={`absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none ${
                    isBot ? 'bg-sky-500' : 'bg-indigo-500'
                  }`} 
                />

                <div className="space-y-5 sm:space-y-6 relative z-10">
                  {/* Top Bar: Icon + Price Range */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.1] flex items-center justify-center p-2.5 sm:p-3 text-neutral-900 dark:text-white shadow-inner">
                      {isBot ? (
                        <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-sky-500" />
                      ) : (
                        <Layout className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500" />
                      )}
                    </div>

                    <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-black/10 dark:border-white/10 shadow-xs">
                      {service.priceRange || (isBot ? '150$ – 1500$' : '20$ – 300$')}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2 sm:space-y-2.5 pt-1 sm:pt-2">
                    {features.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6 sm:pt-8 border-t border-black/[0.06] dark:border-white/[0.08] mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Kafolatlangan sifat</span>
                  </div>

                  <a
                    href={`https://t.me/sanjarbek_404?text=${encodeURIComponent(`Assalomu alaykum Sanjarbek! ${service.title} xizmati bo'yicha ma'lumot olmoqchi edim.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 inline-flex items-center gap-2 shadow-xs group/btn cursor-pointer transition-all active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Buyurtma berish</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
