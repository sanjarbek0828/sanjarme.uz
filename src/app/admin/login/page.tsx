'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  Loader2, 
  Eye, 
  EyeOff, 
  Sparkles 
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setErrorMessage('Iltimos, login va parolni to‘liq kiriting!');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await login(identifier, password);
      if (res.success) {
        router.push('/admin');
      } else {
        setErrorMessage(res.error || 'Login yoki parol noto‘g‘ri kiritildi!');
      }
    } catch {
      setErrorMessage('Kutilmagan xatolik yuz berdi. Qayta urinib ko‘ring.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setIdentifier('admin@sanjarme.uz');
    setPassword('admin123456');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#fafafc] dark:bg-black text-neutral-900 dark:text-neutral-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden transition-colors duration-300 selection:bg-neutral-200 dark:selection:bg-neutral-800">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-sky-500/10 dark:bg-sky-500/8 blur-3xl pointer-events-none animate-ambient-float" />
      <div 
        className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-500/8 blur-3xl pointer-events-none animate-ambient-float" 
        style={{ animationDelay: '-7s' }} 
      />

      {/* Top Navigation Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full apple-glass-pill text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Portfolioga qaytish</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="relative w-full max-w-md z-10 pt-12 sm:pt-0">
        {/* Card Container */}
        <div className="admin-glass-card p-7 sm:p-9 shadow-2xl border border-black/[0.08] dark:border-white/[0.1] rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-neutral-900/70">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center shadow-lg mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
              Admin Studio
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 font-mono">
              Boshqaruv paneliga kirish uchun ma&apos;lumotlarni kiriting
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-start space-x-2.5 text-rose-800 dark:text-rose-300 text-xs animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email / Username Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                Login yoki Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="admin@sanjarme.uz yoki sanjarbek"
                  autoComplete="username"
                  required
                  className="admin-input pl-10 pr-4 w-full h-11 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-sky-500 dark:focus:border-sky-400 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                Parol
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="admin-input pl-10 pr-11 w-full h-11 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-sky-500 dark:focus:border-sky-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Parolni ko'rsatish yoki yashirish"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-bold font-['Space_Grotesk'] flex items-center justify-center space-x-2 text-sm cursor-pointer disabled:opacity-50 mt-4 transition-all shadow-md active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Tekshirilmoqda...</span>
                </>
              ) : (
                <>
                  <span>Tizimga kirish</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="mt-6 pt-5 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col items-center space-y-2 text-center">
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              Admin hisob ma&apos;lumotlari:
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-xs font-mono inline-flex items-center space-x-1.5 transition-colors cursor-pointer text-neutral-700 dark:text-neutral-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>1-bosishda to‘ldirish</span>
            </button>
            <div className="flex flex-col text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
              <span>Login: <code className="text-neutral-600 dark:text-neutral-300">admin@sanjarme.uz</code> yoki <code className="text-neutral-600 dark:text-neutral-300">sanjarbek</code></span>
              <span>Parol: <code className="text-neutral-600 dark:text-neutral-300">admin123456</code></span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
