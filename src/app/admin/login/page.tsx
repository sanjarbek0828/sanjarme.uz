'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertTriangle, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { adminLoginSchema, AdminLoginFormData } from '@/lib/validations';
import { useAuth } from '@/lib/auth-context';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    // Rate limiting lockout check
    if (failedAttempts >= 5) {
      setErrorMessage('Too many failed attempts. Security lockout active. Please wait 1 minute.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await login(data.email, data.password);
      if (res.success) {
        router.push('/admin');
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        setErrorMessage(
          res.error || `Authentication failed. Attempt ${nextAttempts} of 5 before lockout.`
        );
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('An unexpected error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setValue('email', 'admin@sanjarme.uz');
    setValue('password', 'admin123456');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden transition-colors duration-300 selection:bg-neutral-200 dark:selection:bg-neutral-800">
      {/* Ambient background glows matching Portfolio Hero */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-sky-500/10 dark:bg-sky-500/8 blur-3xl pointer-events-none animate-ambient-float gpu-layer" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-500/8 blur-3xl pointer-events-none animate-ambient-float gpu-layer" style={{ animationDelay: '-7s' }} />

      {/* Top Controls: Return to Portfolio & Theme Toggle */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full apple-glass-pill text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Portfolio</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="relative w-full max-w-md z-10 pt-12 sm:pt-0">
        {/* Card Container */}
        <div className="admin-glass-card p-8 sm:p-10 shadow-2xl border border-black/[0.08] dark:border-white/[0.1]">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center shadow-md mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
              Studio Portal
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 font-mono">
              Sign in to manage projects, accreditations, and content
            </p>
          </div>

          {/* Rate limiting warning */}
          {failedAttempts >= 3 && failedAttempts < 5 && (
            <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start space-x-2.5 text-amber-800 dark:text-amber-300 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Caution: {5 - failedAttempts} attempt(s) remaining before automatic security lockout.
              </span>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-start space-x-2.5 text-rose-800 dark:text-rose-300 text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                Studio Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="admin@sanjarme.uz"
                  {...register('email')}
                  className={`admin-input pl-10 pr-4 ${errors.email ? 'border-rose-500' : ''}`}
                />
              </div>
              {errors.email && (
                <span className="text-xs text-rose-500 font-mono block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className={`admin-input pl-10 pr-11 ${errors.password ? 'border-rose-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <span className="text-xs text-rose-500 font-mono block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || failedAttempts >= 5}
              className="w-full btn-apple-primary py-3 rounded-2xl font-bold font-['Space_Grotesk'] flex items-center justify-center space-x-2 text-sm cursor-pointer disabled:opacity-50 mt-2 shadow-xs"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Studio'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="mt-6 pt-5 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col items-center space-y-2 text-center">
            <span className="text-xs font-mono text-neutral-500">
              Evaluating or testing the portfolio?
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="btn-apple-secondary px-3.5 py-1.5 text-xs font-mono inline-flex items-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>Fill Demo Credentials (1-Click)</span>
            </button>
            <span className="text-[10px] font-mono text-neutral-400">
              admin@sanjarme.uz / admin123456
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
