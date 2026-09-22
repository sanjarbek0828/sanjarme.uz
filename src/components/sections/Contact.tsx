'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Clock 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { contactFormSchema, ContactFormData } from '@/lib/validations';
import { submitContactMessage } from '@/lib/data-service';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await submitContactMessage({
        name: data.name,
        email: data.email,
        subject: data.subject || 'Portfolio Inquiry',
        message: data.message,
      });

      setSubmitted(true);
      reset();

      // Trigger modern celebration confetti
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.65 },
          colors: ['#0071e3', '#38bdf8', '#10b981', '#6366f1'],
        });
      } catch {}
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMessage('Something went wrong. Please try again or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('sanjarbekotabekov010@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Apple Clean */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3 block">
            Aloqa & Hamkorlik
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
            Birgalikda loyiha <span className="text-apple-headline">boshlaymizmi?</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-3 max-w-xl text-base font-normal leading-relaxed">
            Yangi loyihalar, veb-sayt, Telegram bot yaratish yoki maslahat olish uchun istalgan vaqtda bog&apos;lanishingiz mumkin.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-5">
            <motion.div 
              whileHover={{ y: -3, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              className="p-6 sm:p-8 rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] space-y-6 gpu-layer"
            >
              <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                To&apos;g&apos;ridan-to&apos;g&apos;ri aloqa
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-normal">
                Shoshilinch loyihalar yoki ish takliflari bo&apos;yicha quyidagi rasmiy kanallar orqali tezkor javob olishingiz mumkin.
              </p>

              {/* Direct Email Card with One-Click Copy */}
              <div className="p-4 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/80 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-xl bg-neutral-200/70 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">Rasmiy Email</span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white font-mono truncate block">
                      sanjarbekotabekov010@gmail.com
                    </span>
                  </div>
                </div>

                <button
                  onClick={copyEmailToClipboard}
                  className="p-2 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                  title="Email manzilidan nusxa olish"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Response Time Badge */}
              <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-600 dark:text-neutral-400 p-3 rounded-xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-black/[0.04] dark:border-white/[0.06]">
                <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>O&apos;rtacha javob berish vaqti: 2 soat ichida</span>
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block">
                  Ijtimoiy Tarmoqlar
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  <a
                    href="https://github.com/sanjarbek404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80 border border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 transition-all flex flex-col items-center justify-center gap-1 group"
                  >
                    <GithubIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                    <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white">GitHub</span>
                  </a>

                  <a
                    href="https://t.me/sanjarbek_404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-sky-500/10 dark:bg-sky-500/10 border border-sky-500/20 hover:border-sky-500/40 transition-all flex flex-col items-center justify-center gap-1 group"
                  >
                    <Send className="w-4 h-4 text-sky-500 transition-colors" />
                    <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-semibold">Telegram</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/sanjarbek-otabekov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80 border border-black/[0.06] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 transition-all flex flex-col items-center justify-center gap-1 group"
                  >
                    <LinkedinIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                    <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white">LinkedIn</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl apple-glass-card border border-black/[0.07] dark:border-white/[0.09] relative gpu-layer">
              
              {/* Submission Success Banner */}
              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-neutral-950 dark:text-white">Xabaringiz muvaffaqiyatli yuborildi!</p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                      Rahmat, xabaringiz to&apos;g&apos;ridan-to&apos;g&apos;ri qabul qilindi. Tez orada siz bilan bog&apos;lanaman.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-neutral-900 border border-red-500/30 flex items-start gap-3 text-red-700 dark:text-red-300">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Name field */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="name" className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                    Ism-familiyangiz
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Ali Valiyev"
                    {...register('name')}
                    className={`w-full bg-white dark:bg-neutral-950/80 border border-black/[0.1] dark:border-white/[0.1] focus:border-black/40 dark:focus:border-white/30 rounded-xl px-4 py-3 text-base sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-colors shadow-xs ${
                      errors.name ? 'border-red-500/60' : ''
                    }`}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 dark:text-red-400 font-mono block">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email field */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="email" className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                    Email manzilingiz
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="ali@misol.uz"
                    {...register('email')}
                    className={`w-full bg-white dark:bg-neutral-950/80 border border-black/[0.1] dark:border-white/[0.1] focus:border-black/40 dark:focus:border-white/30 rounded-xl px-4 py-3 text-base sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-colors shadow-xs ${
                      errors.email ? 'border-red-500/60' : ''
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 dark:text-red-400 font-mono block">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Subject field (Optional) */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="subject" className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                    Mavzu (Ixtiyoriy)
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Loyiha taklifi / Telegram bot / Hamkorlik"
                    {...register('subject')}
                    className="w-full bg-white dark:bg-neutral-950/80 border border-black/[0.1] dark:border-white/[0.1] focus:border-black/40 dark:focus:border-white/30 rounded-xl px-4 py-3 text-base sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-colors shadow-xs"
                  />
                </div>

                {/* Message field */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="message" className="text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                    Xabar matni
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Loyihangiz maqsadi, talablari yoki savollaringiz haqida yozing..."
                    {...register('message')}
                    className={`w-full bg-white dark:bg-neutral-950/80 border border-black/[0.1] dark:border-white/[0.1] focus:border-black/40 dark:focus:border-white/30 rounded-xl p-4 text-base sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-colors resize-none shadow-xs ${
                      errors.message ? 'border-red-500/60' : ''
                    }`}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500 dark:text-red-400 font-mono block">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit button - Apple Signature Pill */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full font-semibold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 text-sm shadow-xs cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? (
                    <span>Yuborilmoqda...</span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <span>Xabarni Yuborish</span>
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </motion.button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
