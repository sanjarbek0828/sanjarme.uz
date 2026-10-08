'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Printer,
  Download,
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
  FileText,
  Share2,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon } from '@/components/ui/Icons';
import { useLanguage } from '@/lib/language-context';
import { resumeDataByLang } from '@/lib/resume-data';

export default function ResumePage() {
  const { language, setLanguage } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [paperTheme, setPaperTheme] = useState<'clean' | 'modern'>('clean');

  const currentLang = (language === 'ru' || language === 'en' ? language : 'uz') as 'uz' | 'en' | 'ru';
  const data = resumeDataByLang[currentLang];

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-[#070709] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      
      {/* =========================================================================
          TOP ACTION BAR (Screen only, hidden on print)
          ========================================================================= */}
      <header className="no-print sticky top-0 z-40 w-full bg-white/85 dark:bg-black/85 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08] py-3 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{data.ui.backToPortfolio}</span>
          </Link>

          {/* Right Toolbar Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            
            {/* Language Switcher */}
            <div className="inline-flex items-center p-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800/80 border border-black/5 dark:border-white/10 text-xs font-semibold">
              {(
                [
                  { code: 'uz', label: 'O‘ZB' },
                  { code: 'en', label: 'ENG' },
                  { code: 'ru', label: 'РУС' },
                ] as const
              ).map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`relative px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-neutral-950 text-black dark:text-white shadow-xs font-bold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              title={data.ui.copyLink}
              className="px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-black/10 dark:border-white/15 text-xs font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">{data.ui.linkCopied}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="hidden sm:inline">{data.ui.copyLink}</span>
                </>
              )}
            </button>

            {/* Direct .pdf file link */}
            <a
              href="/resume.pdf"
              download="Sanjarbek_Otabekov_Resume.pdf"
              className="px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-black/10 dark:border-white/15 text-xs font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs text-neutral-700 dark:text-neutral-300"
              title="Download static PDF file"
            >
              <Download className="w-3.5 h-3.5 text-sky-500" />
              <span className="hidden md:inline">{data.ui.directPdfDownload}</span>
              <span className="md:hidden">.PDF</span>
            </a>

            {/* Print / Save as PDF Primary Button */}
            <button
              onClick={handlePrint}
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{data.ui.printResume}</span>
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          RESUME SHEET CONTAINER
          ========================================================================= */}
      <main className="py-6 sm:py-10 px-3 sm:px-6 flex justify-center">
        <article className="resume-print-container w-full max-w-4xl bg-white dark:bg-[#0c0d12] border border-black/10 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-10 md:p-14 transition-colors">
          
          {/* HEADER SECTION */}
          <header className="resume-section pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
              
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                    {data.personal.fullName}
                  </h1>
                  <span className="no-print inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {data.personal.availability}
                  </span>
                </div>

                <p className="text-base sm:text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                  {data.personal.title}
                </p>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl">
                  {data.personal.tagline}
                </p>
              </div>

              {/* Verified badge */}
              <div className="no-print hidden lg:flex flex-col items-end text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-medium">
                  {data.ui.atsNote}
                </span>
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                  sanjarme.uz/resume
                </span>
              </div>
            </div>

            {/* Contact details pills grid */}
            <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-neutral-600 dark:text-neutral-300">
              
              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{data.personal.location}</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a
                  href={`mailto:${data.personal.email}`}
                  className="hover:text-black dark:hover:text-white transition-colors underline decoration-dotted underline-offset-2"
                >
                  {data.personal.email}
                </a>
              </div>

              {/* Website */}
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <a
                  href={data.personal.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-500 font-semibold transition-colors"
                >
                  {data.personal.website}
                </a>
              </div>

              {/* Telegram */}
              <div className="flex items-center gap-2">
                <TelegramIcon className="w-3.5 h-3.5 text-[#229ED9] shrink-0" />
                <a
                  href={data.personal.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#229ED9] transition-colors"
                >
                  {data.personal.telegramHandle}
                </a>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-2">
                <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2] shrink-0" />
                <a
                  href={data.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0A66C2] transition-colors"
                >
                  {data.personal.linkedinHandle}
                </a>
              </div>

              {/* GitHub */}
              <div className="flex items-center gap-2">
                <GithubIcon className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 shrink-0" />
                <a
                  href={data.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  {data.personal.githubHandle}
                </a>
              </div>

            </div>
          </header>

          {/* SECTION: SUMMARY */}
          <section className="resume-section py-5 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 font-bold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{data.ui.summaryTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal text-justify sm:text-left">
              {data.summary}
            </p>
          </section>

          {/* SECTION: TECHNICAL SKILLS */}
          <section className="resume-section py-5 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 font-bold mb-3 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>{data.ui.skillsTitle}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {data.skills.map((skillGroup, idx) => (
                <div
                  key={idx}
                  className="resume-item p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800/80"
                >
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white mb-1.5">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="resume-badge px-2 py-0.5 rounded-md text-[11px] font-mono bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: EXPERIENCE */}
          <section className="resume-section py-5 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 font-bold mb-4 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{data.ui.experienceTitle}</span>
            </h2>

            <div className="space-y-5">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="resume-item resume-avoid-break">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white">
                        {exp.role}
                      </h3>
                      <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                        {exp.company} • <span className="font-normal">{exp.location}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-medium text-neutral-500 dark:text-neutral-400 shrink-0">
                        {exp.period}
                      </span>
                      <span className="no-print px-2 py-0.5 text-[10px] rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono hidden sm:inline">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1.5 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="mt-2 space-y-1 text-xs text-neutral-700 dark:text-neutral-300">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="text-sky-500 font-bold mt-0.5">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack pills */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {exp.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: FEATURED PROJECTS */}
          <section className="resume-section py-5 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 font-bold mb-4 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>{data.ui.projectsTitle}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {data.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="resume-item resume-avoid-break p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white">
                        {proj.title}
                      </h3>
                      <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase font-semibold">
                        {proj.category}
                      </span>
                    </div>

                    <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
                      {proj.description}
                    </p>

                    <ul className="space-y-0.5 text-[11px] text-neutral-700 dark:text-neutral-300 mb-2">
                      {proj.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-wrap items-center justify-between gap-1.5 text-[10px]">
                      <div className="flex flex-wrap gap-1 font-mono text-neutral-500">
                        {proj.techStack.slice(0, 4).map((tech, tIdx) => (
                          <span key={tIdx} className="bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                          >
                            <span>{data.ui.liveDemo}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:underline"
                          >
                            <span>{data.ui.sourceCode}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: CERTIFICATIONS */}
          <section className="resume-section py-5 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 font-bold mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>{data.ui.certificationsTitle}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {data.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="resume-item resume-avoid-break p-2.5 rounded-lg bg-neutral-50/70 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60 flex items-start justify-between gap-2 text-xs"
                >
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-neutral-900 dark:text-white leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                      {cert.issuer} • <span className="font-mono">{cert.year}</span>
                    </p>
                    <p className="text-[10px] font-mono text-neutral-500">
                      {cert.skills.join(' • ')}
                    </p>
                  </div>

                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-print shrink-0 text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-0.5 pt-0.5"
                    >
                      <span>{data.ui.verifiedCredential}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: EDUCATION & LANGUAGES (2-column layout) */}
          <section className="resume-section pt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Education */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 font-bold mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{data.ui.educationTitle}</span>
              </h2>

              {data.education.map((edu, idx) => (
                <div key={idx} className="resume-avoid-break text-xs space-y-0.5">
                  <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                    {edu.degree}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                    {edu.institution} • <span className="font-mono">{edu.period}</span>
                  </p>
                  <p className="text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed pt-1">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 font-bold mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>{data.ui.languagesTitle}</span>
              </h2>

              <ul className="space-y-1.5 text-xs">
                {data.languages.map((lang, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-neutral-800/50"
                  >
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {lang.name}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </section>

          {/* ATS Footer Watermark (print only) */}
          <footer className="mt-8 pt-4 border-t border-neutral-200 text-center text-[10px] text-neutral-400 hidden print:block">
            Sanjarbek Otabekov — Full Stack Software Engineer • https://sanjarme.uz/resume • sanjarbekotabekov010@gmail.com
          </footer>

        </article>
      </main>

    </div>
  );
}
