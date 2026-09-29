'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin');
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col items-center justify-center p-4">
      <div className="w-12 h-12 rounded-2xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] flex items-center justify-center mb-3">
        <Loader2 className="w-6 h-6 text-neutral-800 dark:text-neutral-200 animate-spin" />
      </div>
      <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
        Admin panelga yo'naltirilmoqda...
      </p>
    </div>
  );
}
