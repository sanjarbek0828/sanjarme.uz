'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderGit2, 
  Award, 
  Mail, 
  Settings, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { ThemeToggle } from '@/components/ThemeToggle';

const ADMIN_LINKS = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Certificates', href: '/admin/certificates', icon: Award },
  { name: 'Messages', href: '/admin/messages', icon: Mail },
  { name: 'Site Content', href: '/admin/settings', icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isDemoMode } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  const navContent = (
    <div className="flex flex-col justify-between h-full">
      {/* Top Section */}
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 pt-1">
          <Link href="/admin" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-['Space_Grotesk'] text-base font-bold text-neutral-950 dark:text-white tracking-tight">
                Admin Studio
              </h1>
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block">
                Sanjarbek Portfolio
              </span>
            </div>
          </Link>

          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live / Demo Mode Pill */}
        <div className="px-3 py-2 rounded-2xl bg-neutral-100/90 dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">
              {isDemoMode ? 'Preview Mode' : 'Cloud Firestore'}
            </span>
          </div>
          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase">
            Live
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white dark:text-neutral-950' : 'text-neutral-500'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Profile, Theme, Live Site & Logout */}
      <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.08] space-y-3">
        {/* Controls Row: Theme Toggle + Public Link */}
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Appearance</span>
          <ThemeToggle />
        </div>

        {/* View Live Public Site */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.06] transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* User Badge */}
        <div className="px-3.5 py-2.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] text-xs">
          <span className="text-[10px] uppercase font-mono text-neutral-400 dark:text-neutral-500 block">
            Logged In
          </span>
          <span className="text-neutral-900 dark:text-white font-mono truncate block mt-0.5 font-medium">
            {user?.email || 'Administrator'}
          </span>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-2xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sticky Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 px-4 py-3 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-['Space_Grotesk'] text-sm font-bold text-neutral-950 dark:text-white">
            Admin Studio
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
        >
          <div 
            className="fixed inset-y-0 left-0 w-72 p-5 admin-sidebar z-50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 admin-sidebar flex-col justify-between p-5 min-h-screen sticky top-0 h-screen overflow-y-auto">
        {navContent}
      </aside>
    </>
  );
};
