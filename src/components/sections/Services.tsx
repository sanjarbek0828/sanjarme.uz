'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Layout, 
  Code2, 
  ShoppingCart, 
  ArrowUpRight, 
  CheckCircle2, 
  MessageSquare, 
  Zap, 
  Calculator,
  Sparkles
} from 'lucide-react';
import { ServiceItem } from '@/lib/types';
import { ServiceEstimatorModal } from './ServiceEstimatorModal';
import { useLanguage } from '@/lib/language-context';

interface ServicesProps {
  services?: ServiceItem[];
}

export const Services: React.FC<ServicesProps> = ({ services = [] }) => {
  const { language, t, getTranslatedService } = useLanguage();
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const [activeEstimatorService, setActiveEstimatorService] = useState<string>('telegram_bot');

  const defaultServicesList: ServiceItem[] = [
    {
      id: 'srv-1',
      title: 'Telegram Bot & Avtomatlashtirish',
      desc: 'Biznes jarayonlarini to\'liq avtomatlashtiruvchi, mijozlar bilan muloqot va buyurtmalarni boshqaruvchi aqlli botlar.',
      priceRange: '150$ – 1500$',
      icon: 'Bot',
    },
    {
      id: 'srv-2',
      title: 'Landing Page & Promo Saytlar',
      desc: 'Mahsulot yoki xizmatlaringiz uchun yuqori konversiyali, chaqqon va brendingizni mukammal namoyon etuvchi sahifalar.',
      priceRange: '50$ – 300$',
      icon: 'Layout',
    },
    {
      id: 'srv-3',
      title: 'Full Stack Veb Ilovalar & SaaS',
      desc: 'Next.js 15, React va mustahkam ma\'lumotlar bazasi bilan qurilgan to\'liq avtonom boshqaruv tizimlari.',
      priceRange: '350$ – 2000$',
      icon: 'Code2',
    },
    {
      id: 'srv-4',
      title: 'E-Commerce & Onlayn Do\'konlar',
      desc: 'Mebel, kiyim-kechak yoki xizmatlar uchun interaktiv katalog, savat va buyurtma tizimiga ega elektron do\'konlar (masalan: mebelmashhura.uz).',
      priceRange: '250$ – 1200$',
      icon: 'ShoppingCart',
    },
  ];

  const rawServices = services && services.length >= 2 ? services : defaultServicesList;

  const displayServices = useMemo(() => {
    return rawServices.map(getTranslatedService);
  }, [rawServices, getTranslatedService]);

  const getServiceFeatures = (title: string, lang: 'uz' | 'ru' | 'en') => {
    const s = title.toLowerCase();
    if (s.includes('bot') || s.includes('бот')) {
      if (lang === 'ru') {
        return [
          'Интеграция с внешними API, CRM и базами данных',
          'База пользователей и CRM панель управления',
          'Рассылки сообщений и автоматические ответы',
          'Гарантия бесперебойной работы 24/7 на сервере'
        ];
      }
      if (lang === 'en') {
        return [
          'External API, CRM, and database integrations',
          'User database and CRM management dashboard',
          'Automated broadcast messaging and auto-replies',
          '24/7 uninterrupted uptime and high stability'
        ];
      }
      return [
        'Tashqi API, CRM va ma\'lumotlar bazasi integratsiyasi',
        'Foydalanuvchilar bazasi va CRM boshqaruv paneli',
        'Xabarnomalar (mailing) va avtomatlashtirilgan javoblar',
        '24/7 serverda barqaror uzluksiz ishlash kafolati'
      ];
    }
    if (s.includes('landing') || s.includes('лендинг') || s.includes('promo')) {
      if (lang === 'ru') {
        return [
          'Идеальная адаптивность для мобильных устройств и планшетов',
          'Молниеносная скорость загрузки с оценкой Lighthouse 95+',
          'Премиальный Apple-стиль интерфейса и микро-анимации',
          'SEO оптимизация и индексация поисковыми системами'
        ];
      }
      if (lang === 'en') {
        return [
          'Flawless responsive layouts for mobile and tablets',
          'Blazing fast performance with 95+ Lighthouse score',
          'Modern Apple-inspired aesthetics and micro-animations',
          'SEO optimization and search engine indexability'
        ];
      }
      return [
        'Mukammal mobil va planshet moslashuvchanligi (Responsive)',
        'Lighthouse 95+ balldan yuqori tezkor yuklanish',
        'Zamonaviy Apple-style interfeys va mikro-animatsiyalar',
        'SEO optimizatsiya va qidiruv tizimlariga indekslash'
      ];
    }
    if (s.includes('full stack') || s.includes('saas') || s.includes('веб') || s.includes('ilova') || s.includes('application')) {
      if (lang === 'ru') {
        return [
          'Архитектура Next.js 15 App Router и Server Components',
          'Безопасная аутентификация и распределение прав пользователей',
          'Базы данных PostgreSQL, MySQL или Firebase',
          'RESTful и GraphQL API интеграции'
        ];
      }
      if (lang === 'en') {
        return [
          'Next.js 15 App Router & Server Components architecture',
          'Secure authentication with granular role-based access',
          'PostgreSQL, MySQL, or Firebase scalable databases',
          'High-performance RESTful & GraphQL API integrations'
        ];
      }
      return [
        'Next.js 15 App Router & Server Components arxitekturasi',
        'Xavfsiz autentifikatsiya va foydalanuvchilar rollari',
        'PostgreSQL, MySQL yoki Firebase ma\'lumotlar bazasi',
        'RESTful va GraphQL API integratsiyalari'
      ];
    }
    if (lang === 'ru') {
      return [
        'Каталог товаров, умный поиск и многоуровневые фильтры',
        'Корзина покупок и оформление онлайн-заказов',
        'Удобная панель администратора для управления товарами',
        'Быстрая загрузка и интерфейс мобильного приложения (PWA)'
      ];
    }
    if (lang === 'en') {
      return [
        'Product catalogue, instant search, and multi-tier filters',
        'Interactive shopping cart and streamlined order checkout',
        'Intuitive admin dashboard for catalogue management',
        'Fast loading speeds with app-like experience (PWA)'
      ];
    }
    return [
      'Mahsulotlar katalogi, qidiruv va ko\'p bosqichli filtrlar',
      'Xarid savati va buyurtmalarni boshqarish tizimi',
      'Katalog boshqaruvi uchun qulay admin panel',
      'Tezkor yuklanish va mobil ilovadek qulay interfeys (PWA)'
    ];
  };

  const getServiceIcon = (title: string) => {
    const tLower = title.toLowerCase();
    if (tLower.includes('bot') || tLower.includes('бот')) return <Bot className="w-6 h-6 sm:w-7 sm:h-7 text-sky-500" />;
    if (tLower.includes('landing') || tLower.includes('лендинг') || tLower.includes('promo')) return <Layout className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-500" />;
    if (tLower.includes('full stack') || tLower.includes('saas') || tLower.includes('веб') || tLower.includes('ilova') || tLower.includes('application')) return <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />;
    return <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500" />;
  };

  const handleOpenEstimator = (title: string) => {
    setActiveEstimatorService(title);
    setEstimatorOpen(true);
  };

  return (
    <>
      <section id="services" className="relative py-14 sm:py-28 lg:py-36 bg-[#fafafa] dark:bg-[#070709] transition-colors duration-300 overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-sky-500/5 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full apple-glass-pill text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-4 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span className="tracking-wide uppercase font-semibold">{t.services.badge}</span>
            </div>

            <h2 className="text-[1.5rem] sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
              {t.services.headingPart1} <span className="text-apple-headline">{t.services.headingPart2}</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mt-3 sm:mt-4 max-w-2xl text-[13px] sm:text-base lg:text-lg font-normal leading-relaxed">
              {t.services.sub}
            </p>

            {/* Interactive Estimator Callout Button */}
            <div className="mt-6">
              <button
                onClick={() => handleOpenEstimator('telegram_bot')}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-[12px] sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-sky-400 dark:text-sky-600" />
                <span className="hidden sm:inline">{t.services.estimatorBtn}</span>
                <span className="sm:hidden">{language === 'uz' ? 'Narxni hisoblash' : language === 'ru' ? 'Расчёт стоимости' : 'Estimate Cost'}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Services Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
            {displayServices.map((service, idx) => {
              const features = getServiceFeatures(service.title, language);

              return (
                <motion.div
                  key={service.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="rounded-2xl sm:rounded-3xl vision-glass-card specular-rim p-4 sm:p-8 md:p-9 border border-black/[0.08] dark:border-white/[0.1] flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow-2xl transition-all"
                >
                  <div className="space-y-4 sm:space-y-6 relative z-10">
                    {/* Top Bar: Icon + Price Range */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-black/[0.04] dark:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.1] flex items-center justify-center p-2 sm:p-3 text-neutral-900 dark:text-white shadow-inner">
                        {getServiceIcon(service.title)}
                      </div>

                      <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-black/10 dark:border-white/10 shadow-xs">
                        {service.priceRange}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-2xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
                        {service.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    {/* Feature Checklist */}
                    <div className="space-y-1.5 sm:space-y-2.5 pt-1 sm:pt-2">
                      {features.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-neutral-700 dark:text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-4 sm:pt-6 border-t border-black/[0.06] dark:border-white/[0.08] mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 relative z-10">
                    <button
                      onClick={() => handleOpenEstimator(service.title)}
                      className="px-4 py-2.5 rounded-full text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.1] inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Calculator className="w-3.5 h-3.5 text-sky-500" />
                      <span>{language === 'uz' ? 'Narxini hisoblash' : language === 'ru' ? 'Расчёт стоимости' : 'Estimate Cost'}</span>
                    </button>

                    <a
                      href={`https://t.me/sanjarbekdev?text=${encodeURIComponent(
                        language === 'ru'
                          ? `Здравствуйте, Санжарбек! Хотел бы проконсультироваться по услуге "${service.title}".`
                          : language === 'en'
                          ? `Hello Sanjarbek! I would like to consult regarding the "${service.title}" service.`
                          : `Assalomu alaykum Sanjarbek! ${service.title} xizmati bo'yicha maslahat olmoqchi edim.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full text-xs font-semibold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 inline-flex items-center justify-center gap-2 shadow-xs group/btn cursor-pointer transition-all active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{t.services.orderBtn}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Interactive Project Cost Estimator Modal */}
      <ServiceEstimatorModal
        isOpen={estimatorOpen}
        onClose={() => setEstimatorOpen(false)}
        defaultService={activeEstimatorService}
      />
    </>
  );
};

