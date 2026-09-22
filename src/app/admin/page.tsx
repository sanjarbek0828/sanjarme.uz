'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FolderGit2, 
  Award, 
  Mail, 
  ArrowUpRight, 
  Plus, 
  CheckCircle2, 
  Sparkles,
  Database,
  RefreshCw,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  subscribeProjects, 
  subscribeCertificates, 
  subscribeContactMessages, 
  populateFirestore,
  getFirestoreConnectionStatus
} from '@/lib/data-service';
import { Project, Certificate, ContactMessage } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';

export default function AdminDashboardPage() {
  const { isDemoMode } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [seeding, setSeeding] = useState<boolean>(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);
  const [cloudStatus, setCloudStatus] = useState<{
    connected: boolean;
    projectId: string;
    isConfigured: boolean;
  }>({
    connected: false,
    projectId: 'portfolio-9d780',
    isConfigured: true,
  });

  useEffect(() => {
    // 1. Check Cloud Firestore status
    getFirestoreConnectionStatus().then(status => {
      setCloudStatus({
        connected: status.connected,
        projectId: status.projectId,
        isConfigured: status.isConfigured,
      });
      setLoading(false);
    });

    // 2. Real-time Project subscription
    const unsubProjects = subscribeProjects((data) => {
      setProjects(data);
    });

    // 3. Real-time Certificate subscription
    const unsubCerts = subscribeCertificates((data) => {
      setCertificates(data);
    });

    // 4. Real-time Contact Messages subscription
    const unsubMessages = subscribeContactMessages((data) => {
      setMessages(data);
    });

    return () => {
      unsubProjects();
      unsubCerts();
      unsubMessages();
    };
  }, []);

  const handleSeedDatabase = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await populateFirestore(true);
      setSeedResult(res);
      const status = await getFirestoreConnectionStatus();
      setCloudStatus({
        connected: status.connected,
        projectId: status.projectId,
        isConfigured: status.isConfigured,
      });
    } catch (err) {
      setSeedResult({
        success: false,
        message: err instanceof Error ? err.message : 'Seeding failed',
      });
    } finally {
      setSeeding(false);
      setTimeout(() => setSeedResult(null), 5000);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
              Studio Overview
            </h1>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Active</span>
            </span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Real-time management studio synchronized with portfolio cloud services.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleSeedDatabase}
            disabled={seeding}
            className="btn-apple-secondary px-4 py-2 text-xs font-medium inline-flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            title="Populate Cloud Firestore with projects, certificates and content"
          >
            <Database className={`w-3.5 h-3.5 ${seeding ? 'animate-spin text-sky-500' : ''}`} />
            <span>{seeding ? 'Syncing...' : 'Seed Database'}</span>
          </button>
          
          <Link
            href="/admin/projects"
            className="btn-apple-primary px-4 py-2 text-xs font-medium inline-flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>

          <Link
            href="/admin/certificates"
            className="btn-apple-secondary px-4 py-2 text-xs font-medium inline-flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Certificate</span>
          </Link>
        </div>
      </div>

      {/* Database Seeding Status Toast */}
      {seedResult && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
          seedResult.success 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
        }`}>
          <div className="flex items-center space-x-2.5">
            {seedResult.success ? (
              <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
            )}
            <span className="text-xs font-mono">{seedResult.message}</span>
          </div>
          <button 
            onClick={() => setSeedResult(null)}
            className="text-xs font-mono opacity-60 hover:opacity-100 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Cloud Firestore Live Status Banner */}
      <div className="admin-glass-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Database Engine:</span>
              <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-white">
                {cloudStatus.projectId}
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
              Live updates via <code className="font-mono text-neutral-800 dark:text-neutral-200">onSnapshot</code>. Edits in this studio reflect on your public portfolio instantaneously.
            </p>
          </div>
        </div>

        <button
          onClick={handleSeedDatabase}
          disabled={seeding}
          className="px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.08] dark:border-white/[0.1] text-xs font-mono flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 flex-shrink-0 text-neutral-800 dark:text-neutral-200"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />
          <span>Force Re-Sync</span>
        </button>
      </div>

      {/* Demo Mode Notice (Only shown if Firebase config is missing) */}
      {isDemoMode && (
        <div className="admin-glass-card p-4 sm:p-5 flex items-start space-x-3 border-amber-500/20 bg-amber-500/5">
          <Sparkles className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-neutral-950 dark:text-white font-mono">Running in Local Zero-Config Mode</p>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              All edits to projects, certificates, messages, and site content are saved in real-time in your browser session. Add Firebase environment variables in <code className="font-mono">.env.local</code> to link your live cloud instance.
            </p>
          </div>
        </div>
      )}

      {/* Apple Bento Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Projects */}
        <div className="admin-glass-card p-6 flex flex-col justify-between space-y-4 group hover:border-black/20 dark:hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Total Projects</span>
            <div className="w-9 h-9 rounded-2xl bg-neutral-100 dark:bg-white/[0.08] flex items-center justify-center text-neutral-800 dark:text-neutral-200">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                {loading ? '...' : projects.length}
              </span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                {projects.filter(p => p.featured).length} Featured
              </span>
            </div>
          </div>
          <Link
            href="/admin/projects"
            className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white inline-flex items-center space-x-1 pt-1"
          >
            <span>Manage projects</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Certificates */}
        <div className="admin-glass-card p-6 flex flex-col justify-between space-y-4 group hover:border-black/20 dark:hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Certificates</span>
            <div className="w-9 h-9 rounded-2xl bg-neutral-100 dark:bg-white/[0.08] flex items-center justify-center text-neutral-800 dark:text-neutral-200">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                {loading ? '...' : certificates.length}
              </span>
              <span className="text-xs font-mono text-sky-600 dark:text-sky-400">Verified Credentials</span>
            </div>
          </div>
          <Link
            href="/admin/certificates"
            className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white inline-flex items-center space-x-1 pt-1"
          >
            <span>Manage certs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 3: Inquiries / Messages */}
        <div className="admin-glass-card p-6 flex flex-col justify-between space-y-4 group hover:border-black/20 dark:hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Client Inquiries</span>
            <div className="w-9 h-9 rounded-2xl bg-neutral-100 dark:bg-white/[0.08] flex items-center justify-center text-neutral-800 dark:text-neutral-200">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                {loading ? '...' : messages.length}
              </span>
              {unreadCount > 0 ? (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  {unreadCount} unread
                </span>
              ) : (
                <span className="text-xs font-mono text-neutral-500">Inbox clear</span>
              )}
            </div>
          </div>
          <Link
            href="/admin/messages"
            className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white inline-flex items-center space-x-1 pt-1"
          >
            <span>Open inbox</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 4: Site Content Status */}
        <div className="admin-glass-card p-6 flex flex-col justify-between space-y-4 group hover:border-black/20 dark:hover:border-white/20 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Site Status</span>
            <div className="w-9 h-9 rounded-2xl bg-neutral-100 dark:bg-white/[0.08] flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold font-['Space_Grotesk'] text-emerald-600 dark:text-emerald-400">
                Operational
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 block mt-1">
              All services online
            </span>
          </div>
          <Link
            href="/admin/settings"
            className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white inline-flex items-center space-x-1 pt-1"
          >
            <span>Edit live content</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Grid: Recent Inquiries & Projects Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Inquiries List */}
        <div className="lg:col-span-7 admin-glass-card p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <h2 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                Recent Inquiries
              </h2>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-600 dark:text-rose-400">
                  {unreadCount} New
                </span>
              )}
            </div>
            <Link
              href="/admin/messages"
              className="text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white flex items-center space-x-1"
            >
              <span>View all ({messages.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {messages.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 dark:text-neutral-500 font-mono text-xs">
              No inquiries received yet. Try sending a message from the contact section!
            </div>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 4).map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    !msg.read
                      ? 'bg-black/[0.02] dark:bg-white/[0.04] border-black/[0.1] dark:border-white/[0.12] shadow-xs'
                      : 'bg-transparent border-black/[0.04] dark:border-white/[0.05]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-neutral-950 dark:text-white font-['Space_Grotesk']">
                        {msg.name}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">
                        ({msg.email})
                      </span>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
                      {msg.subject ? <strong className="text-neutral-800 dark:text-neutral-200">{msg.subject}: </strong> : null}
                      {msg.message}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-mono text-neutral-400 flex-shrink-0">
                    <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    <Link
                      href="/admin/messages"
                      className="px-3 py-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-neutral-800 dark:text-neutral-200 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Featured Projects Quick Peek */}
        <div className="lg:col-span-5 admin-glass-card p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
              Live Projects
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white flex items-center space-x-1"
            >
              <span>Manage ({projects.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((proj) => (
              <div
                key={proj.id}
                className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-3 hover:border-black/15 dark:hover:border-white/15 transition-all"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="relative w-12 h-10 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex-shrink-0">
                    <Image
                      src={proj.coverImageUrl}
                      alt={proj.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="truncate">
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white truncate">
                      {proj.title}
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {proj.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  {proj.featured && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Featured" />
                  )}
                  <Link
                    href="/admin/projects"
                    className="p-1.5 rounded-xl text-neutral-400 hover:text-black dark:hover:text-white"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
