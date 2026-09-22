'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Trash2, 
  Clock, 
  Reply, 
  Loader2, 
  CheckCheck,
  Search,
  Copy,
  Check
} from 'lucide-react';
import { 
  subscribeContactMessages, 
  markMessageRead, 
  deleteMessage 
} from '@/lib/data-service';
import { ContactMessage } from '@/lib/types';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeContactMessages((data) => {
      setMessages(data);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    try {
      await markMessageRead(id, !currentStatus);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: !currentStatus } : m));
    } catch (err) {
      console.error('Error toggling read status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this inquiry?')) return;
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMessages = messages
    .filter(m => {
      if (activeFilter === 'unread') return !m.read;
      if (activeFilter === 'read') return m.read;
      return true;
    })
    .filter(m => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.subject && m.subject.toLowerCase().includes(q)) ||
        m.message.toLowerCase().includes(q)
      );
    });

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white tracking-tight">
              Client Inquiries
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Communication received directly from the portfolio contact form.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex p-1 rounded-full apple-glass-pill self-start sm:self-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setActiveFilter('unread')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeFilter === 'unread'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setActiveFilter('read')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeFilter === 'read'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Read
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter messages by sender, email, subject, or message text..."
          className="admin-input pl-11 pr-4 py-3"
        />
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="py-24 flex flex-col justify-center items-center space-y-3">
          <Loader2 className="w-8 h-8 text-neutral-500 animate-spin" />
          <span className="text-xs font-mono text-neutral-400">Loading inbox...</span>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="admin-glass-card p-16 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-100 dark:bg-white/[0.05] flex items-center justify-center text-neutral-400">
            <Mail className="w-6 h-6" />
          </div>
          <p className="text-neutral-500 font-mono text-sm">
            No inquiries match your current filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`admin-glass-card p-6 space-y-4 group hover:border-black/20 dark:hover:border-white/20 transition-all ${
                !msg.read
                  ? 'border-l-4 border-l-rose-500 bg-rose-500/[0.02] dark:bg-rose-500/[0.03]'
                  : 'opacity-90'
              }`}
            >
              {/* Message Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${!msg.read ? 'bg-rose-500' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold font-['Space_Grotesk'] text-neutral-950 dark:text-white">
                        {msg.name}
                      </h3>
                      {!msg.read && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-medium">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        {msg.email}
                      </a>
                      <button
                        onClick={() => handleCopyEmail(msg.email, msg.id)}
                        className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                        title="Copy Email"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400 dark:text-neutral-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Subject */}
              {msg.subject && (
                <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                  <span className="text-neutral-400 font-normal">Subject: </span>
                  {msg.subject}
                </div>
              )}

              {/* Message Body */}
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed bg-black/[0.02] dark:bg-white/[0.03] p-4 rounded-2xl border border-black/[0.04] dark:border-white/[0.05] whitespace-pre-wrap">
                {msg.message}
              </p>

              {/* Actions */}
              <div className="pt-2 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                  className="btn-apple-primary px-4 py-2 text-xs font-medium inline-flex items-center space-x-1.5 cursor-pointer"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleRead(msg.id, msg.read)}
                    className="btn-apple-secondary px-3.5 py-1.5 text-xs font-mono inline-flex items-center space-x-1.5 cursor-pointer"
                  >
                    {msg.read ? (
                      <>
                        <Mail className="w-3.5 h-3.5 text-rose-500" />
                        <span>Mark Unread</span>
                      </>
                    ) : (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Mark Read</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
