'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calculator, 
  Check, 
  Send, 
  Clock, 
  ArrowRight
} from 'lucide-react';

interface ServiceEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

interface FeatureOption {
  id: string;
  name: string;
  price: number;
  days: number;
}

const SERVICE_TYPES = [
  { id: 'telegram_bot', name: 'Telegram Bot', basePrice: 150, baseDays: 4, desc: 'Avtomatlashtirish, CRM & Savdo boti' },
  { id: 'landing_page', name: 'Landing Page', basePrice: 50, baseDays: 3, desc: 'Zamonaviy promo & sotuv sahifasi' },
  { id: 'fullstack_web', name: 'Full Stack Veb Ilova', basePrice: 350, baseDays: 10, desc: 'Next.js, Ma\'lumotlar bazasi va Auth' },
  { id: 'ecommerce', name: 'E-Commerce Do\'kon', basePrice: 280, baseDays: 8, desc: 'Onlayn katalog, savat va buyurtma' },
];

const AVAILABLE_FEATURES: FeatureOption[] = [
  { id: 'payments', name: "Click / Payme to'lov tizimlari", price: 70, days: 2 },
  { id: 'admin_panel', name: 'Qulay Admin boshqaruv paneli', price: 90, days: 3 },
  { id: 'multilang', name: "Ko'p tillilik (UZ / RU / EN)", price: 40, days: 1 },
  { id: 'pwa', name: 'PWA (Telefonga ilova kabi o\'rnatish)', price: 50, days: 2 },
  { id: 'seo_opt', name: 'Professional SEO & Tezlik (Lighthouse 95+)', price: 45, days: 2 },
  { id: 'cloud_db', name: 'Firebase / PostgreSQL bulutli baza', price: 60, days: 2 },
];

export const ServiceEstimatorModal: React.FC<ServiceEstimatorModalProps> = ({
  isOpen,
  onClose,
  defaultService,
}) => {
  const [selectedType, setSelectedType] = useState<string>(() => {
    if (defaultService && defaultService.toLowerCase().includes('bot')) return 'telegram_bot';
    if (defaultService && defaultService.toLowerCase().includes('landing')) return 'landing_page';
    return 'telegram_bot';
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'admin_panel',
    'seo_opt',
  ]);

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const base = SERVICE_TYPES.find((s) => s.id === selectedType) || SERVICE_TYPES[0];
    let totalPrice = base.basePrice;
    let totalDays = base.baseDays;

    selectedFeatures.forEach((featId) => {
      const feat = AVAILABLE_FEATURES.find((f) => f.id === featId);
      if (feat) {
        totalPrice += feat.price;
        totalDays += feat.days;
      }
    });

    return {
      minPrice: Math.round(totalPrice * 0.9),
      maxPrice: Math.round(totalPrice * 1.25),
      estDays: Math.max(3, totalDays),
      typeName: base.name,
    };
  }, [selectedType, selectedFeatures]);

  const generateTelegramMessage = () => {
    const selectedFeatureNames = selectedFeatures
      .map((id) => AVAILABLE_FEATURES.find((f) => f.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Assalomu alaykum Sanjarbek!
Men sanjarme.uz portfoliosi orqali yangi loyiha hisoblab chiqdim:

📌 Loyiha turi: ${calculation.typeName}
⚡️ Qo'shimcha imkoniyatlar: ${selectedFeatureNames || 'Standart'}
💵 Taxminiy byudjet: $${calculation.minPrice} - $${calculation.maxPrice}
⏱ Kutilayotgan muddat: ~${calculation.estDays} kun
${clientName ? `👤 Ismim: ${clientName}` : ''}
${clientPhone ? `📞 Telefon/Telegram: ${clientPhone}` : ''}

Ushbu loyiha tafsilotlari bo'yicha maslahatlashsak bo'ladimi?`;

    return `https://t.me/sanjarbekdev?text=${encodeURIComponent(text)}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl p-5 sm:p-8 overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                  Loyiha Narxini Hisoblash & Buyurtma
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Kerakli opsiyalarni tanlang va taxminiy narx hamda muddatni ko&apos;ring
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/[0.05] dark:hover:bg-white/[0.08] text-neutral-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="flex-1 overflow-y-auto py-5 space-y-6 pr-1 no-scrollbar">
            
            {/* Step 1: Select Project Type */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2.5 font-semibold">
                1. Loyiha turini tanlang:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICE_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-sky-500 bg-sky-500/5 dark:bg-sky-500/10 shadow-xs'
                          : 'border-black/[0.07] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 bg-black/[0.01] dark:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-neutral-950 dark:text-white">
                          {type.name}
                        </span>
                        <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-bold">
                          ${type.basePrice}+
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                        {type.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Desired Features */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2.5 font-semibold">
                2. Kerakli qo&apos;shimcha imkoniyatlar:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {AVAILABLE_FEATURES.map((feature) => {
                  const isChecked = selectedFeatures.includes(feature.id);
                  return (
                    <div
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between gap-2 transition-all ${
                        isChecked
                          ? 'border-emerald-500/50 bg-emerald-500/5 dark:bg-emerald-500/10'
                          : 'border-black/[0.06] dark:border-white/[0.06] hover:border-black/15 dark:hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-neutral-400 dark:border-neutral-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate">
                          {feature.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
                        +${feature.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Calculation Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent border border-sky-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                  Taxminiy hisob-kitob natijasi:
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                    ${calculation.minPrice} – ${calculation.maxPrice}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    (oraliq narx)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                <span>Muddat: ~{calculation.estDays} kun</span>
              </div>
            </div>

            {/* Optional Contact Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-mono text-neutral-500 block mb-1">
                  Ismingiz (ixtiyoriy):
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Masalan: Sardor"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-mono text-neutral-500 block mb-1">
                  Telegram yoki Telefon (ixtiyoriy):
                </label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="@foydalanuvchi yoki +998..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
              * Aniq narx texnik topshiriqqa (TZ) qarab kelishiladi
            </span>

            <a
              href={generateTelegramMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold bg-[#229ED9] hover:bg-[#1e8ec3] text-white inline-flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram orqali jo&apos;natish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
