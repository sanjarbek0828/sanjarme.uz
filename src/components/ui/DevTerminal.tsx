'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Copy, Check } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const INITIAL_COMMANDS: CommandOutput[] = [
  {
    command: 'whoami',
    output: (
      <div className="space-y-1 text-xs">
        <p className="text-emerald-400 font-semibold">Sanjarbek Otabekov — Full Stack Dasturchi & Muhandis</p>
        <p className="text-neutral-400">Next.js 15, TypeScript, Three.js va Telegram botlar arxitektori.</p>
      </div>
    ),
  },
  {
    command: 'skills --core',
    output: (
      <div className="flex flex-wrap gap-2 text-xs py-1">
        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">Next.js 15 (95%)</span>
        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">TypeScript (90%)</span>
        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">React 19 (90%)</span>
        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Telegram Bot (95%)</span>
        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Three.js / WebGL (85%)</span>
      </div>
    ),
  },
];

export const DevTerminal: React.FC = () => {
  const [history, setHistory] = useState<CommandOutput[]>(INITIAL_COMMANDS);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let result: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        result = (
          <div className="space-y-1 text-xs text-neutral-300">
            <p className="text-sky-400 font-semibold">Mavjud buyruqlar ro&apos;yxati:</p>
            <p>• <span className="text-emerald-400">about</span> — Sanjarbek haqida qisqacha ma&apos;lumot</p>
            <p>• <span className="text-emerald-400">skills</span> — Asosiy texnologik stek</p>
            <p>• <span className="text-emerald-400">projects</span> — Saralangan loyihalar ro&apos;yxati</p>
            <p>• <span className="text-emerald-400">contact</span> — Rasmiy aloqa vositalari</p>
            <p>• <span className="text-emerald-400">whoami</span> — Tizim egasi profili</p>
            <p>• <span className="text-emerald-400">clear</span> — Terminal ekranini tozalash</p>
          </div>
        );
        break;
      case 'about':
        result = (
          <p className="text-xs text-neutral-300 leading-relaxed">
            Zamonaviy veb-arxitektura va yuqori tezlikdagi raqamli mahsulotlar yaratuvchi Full Stack muhandis. Meta va Pearson xalqaro sertifikatlari sohibi.
          </p>
        );
        break;
      case 'skills':
        result = (
          <div className="text-xs space-y-1 text-neutral-300">
            <p><span className="text-sky-400 font-semibold">Frontend:</span> Next.js 15, React 19, TypeScript, Tailwind CSS, Three.js, WebGL</p>
            <p><span className="text-indigo-400 font-semibold">Backend:</span> Node.js, Python, Django, REST API, WebSockets</p>
            <p><span className="text-emerald-400 font-semibold">Baza & Cloud:</span> Firebase, PostgreSQL, MySQL, Docker, Vercel</p>
            <p><span className="text-amber-400 font-semibold">Botlar:</span> Aiogram, Python Telegram Bot, Click/Payme integratsiyasi</p>
          </div>
        );
        break;
      case 'projects':
        result = (
          <div className="text-xs space-y-1.5 text-neutral-300">
            <p>1. <span className="text-rose-400 font-semibold">FilmX</span> — Kinolar va Seriallar Portali (1,700+ kino, 1080p FHD Tas-ix)</p>
            <p>2. <span className="text-sky-400 font-semibold">mebelmashhura.uz</span> — Mebel do&apos;koni elektron tijorat veb sayti (&lt;1s yuklanish)</p>
            <p>3. <span className="text-sky-400 font-semibold">FINALYTIX</span> — Google Gemini API AI Moliya va Xarajatlar Tahlilchisi</p>
            <p>4. <span className="text-sky-400 font-semibold">3D Earth</span> — Three.js va WebGL 3D Yer sayyorasi modeli (60 FPS)</p>
          </div>
        );
        break;
      case 'contact':
        result = (
          <div className="text-xs space-y-1 text-neutral-300">
            <p>📧 Email: <span className="text-sky-400">sanjarbekotabekov010@gmail.com</span></p>
            <p>💬 Telegram: <a href="https://t.me/sanjarbekdev" target="_blank" rel="noreferrer" className="text-sky-400 underline">@sanjarbekdev</a></p>
            <p>📸 Instagram: <a href="https://instagram.com/sanjarbek_dev" target="_blank" rel="noreferrer" className="text-pink-400 underline">@sanjarbek_dev</a></p>
            <p>🐙 GitHub: <a href="https://github.com/sanjarbek0828" target="_blank" rel="noreferrer" className="text-sky-400 underline">github.com/sanjarbek0828</a></p>
          </div>
        );
        break;
      case 'sudo':
        result = <p className="text-xs text-rose-400">Ruxsat yo&apos;q: root huquqlari xavfsizlik maqsadida cheklangan :)</p>;
        break;
      default:
        result = (
          <p className="text-xs text-neutral-400">
            Buyruq topilmadi: &quot;{trimmed}&quot;. Mavjud buyruqlarni ko&apos;rish uchun <span className="text-sky-400 font-mono">help</span> deb yozing.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: result }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  const handleCopyHistory = () => {
    const text = history.map((h) => `$ ${h.command}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-3xl bg-[#0c0d12] border border-white/10 shadow-2xl overflow-hidden font-mono text-left">
      {/* Terminal Window Top Bar */}
      <div className="px-4 py-3 bg-[#161720] border-b border-white/10 flex items-center justify-between select-none">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-inner" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-inner" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-inner" />
          <span className="ml-2 text-xs text-neutral-400 font-mono hidden sm:inline">
            sanjarbek@workstation: ~ (zsh)
          </span>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyHistory}
            className="p-1.5 rounded-md hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            title="Tarixni nusxalash"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ONLINE
          </span>
        </div>
      </div>

      {/* Quick Action Pill Bar */}
      <div className="px-4 py-2 bg-[#12131b] border-b border-white/5 flex flex-wrap items-center gap-1.5 text-xs text-neutral-400">
        <span className="text-[11px] text-neutral-500 mr-1 hidden sm:inline">Tezkor buyruqlar:</span>
        {['about', 'skills', 'projects', 'contact', 'help', 'clear'].map((c) => (
          <button
            key={c}
            onClick={() => executeCommand(c)}
            className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors text-[11px] cursor-pointer"
          >
            {c}
          </button>
        ))}
      </div>

      {/* Terminal Screen Body */}
      <div 
        ref={terminalBodyRef}
        onClick={() => inputRef.current?.focus()}
        className="p-4 sm:p-5 space-y-4 max-h-72 overflow-y-auto min-h-[180px] cursor-text no-scrollbar"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-emerald-400">sanjarbek@dev:~$</span>
              <span className="text-white font-semibold">{item.command}</span>
            </div>
            <div className="pl-4 border-l border-white/10 py-0.5">
              {item.output}
            </div>
          </div>
        ))}

        {/* Active Command Input Line */}
        <div className="flex items-center gap-2 text-xs pt-1">
          <span className="text-emerald-400 shrink-0">sanjarbek@dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="buyruq kiriting (masalan: help)"
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-neutral-600 font-mono text-xs"
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="p-1 text-neutral-500 hover:text-emerald-400 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
