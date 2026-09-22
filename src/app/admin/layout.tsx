'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [user, loading, isLoginPage, router]);

  // If on login page, render full screen without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Apple-style Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-neutral-800 dark:text-neutral-200 animate-spin" />
        </div>
        <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
          Authenticating Studio...
        </p>
      </div>
    );
  }

  // If not authenticated and not on login page, prevent flicker while redirecting
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#fafafc] dark:bg-black flex flex-col md:flex-row text-neutral-900 dark:text-neutral-100 selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors duration-300">
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen pt-16 md:pt-8 p-4 sm:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
