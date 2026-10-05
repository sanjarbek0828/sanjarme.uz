'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export const DevTerminal: React.FC = () => {
  const { language, t } = useLanguage();
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  // Initialize terminal output according to current language
  useEffect(() => {
    setHistory([
      {
        command: 'whoami',
        output: (
          <div className="space-y-1 text-xs">
            <p className="text-emerald-400 font-semibold">{t.terminal.commands.whoamiTitle}</p>
            <p className="text-neutral-400">{t.terminal.commands.whoamiDesc}</p>
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
    ]);
  }, [language, t]);

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
            <p className="text-sky-400 font-semibold">{t.terminal.commands.helpTitle}</p>
            <p>• <span className="text-emerald-400">about</span> — {t.terminal.commands.helpAbout}</p>
            <p>• <span className="text-emerald-400">skills</span> — {t.terminal.commands.helpSkills}</p>
            <p>• <span className="text-emerald-400">projects</span> — {t.terminal.commands.helpProjects}</p>
            <p>• <span className="text-emerald-400">contact</span> — {t.terminal.commands.helpContact}</p>
            <p>• <span className="text-emerald-400">whoami</span> — {t.terminal.commands.helpWhoami}</p>
            <p>• <span className="text-emerald-400">clear</span> — {t.terminal.commands.helpClear}</p>
          </div>
        );
        break;
      case 'about':
        result = (
          <p className="text-xs text-neutral-300 leading-relaxed">
            {t.terminal.commands.aboutText}
          </p>
        );
        break;
      case 'skills':
        result = (
          <div className="text-xs space-y-1 text-neutral-300">
            <p><span className="text-sky-400 font-semibold">Frontend:</span> Next.js 15, React 19, TypeScript, Tailwind CSS, Three.js, WebGL</p>
            <p><span className="text-indigo-400 font-semibold">Backend:</span> Node.js, Python, Django, REST API, WebSockets</p>
            <p><span className="text-emerald-400 font-semibold">Database & Cloud:</span> Firebase, PostgreSQL, MySQL, Docker, Vercel</p>
            <p><span className="text-amber-400 font-semibold">Bots:</span> Aiogram, Python Telegram Bot, API & Webhooks</p>
          </div>
        );
        break;
      case 'projects':
        result = (
          <div className="text-xs space-y-1.5 text-neutral-300">
            <p>1. <span className="text-rose-400 font-semibold">FilmX</span> — Kinolar va Seriallar Portali (1,700+ media, 1080p FHD Tas-ix)</p>
            <p>2. <span className="text-sky-400 font-semibold">mebelmashhura.uz</span> — Mebel do&apos;koni elektron tijorat platformasi (&lt;1s load)</p>
            <p>3. <span className="text-sky-400 font-semibold">FINALYTIX</span> — Google Gemini API AI Moliya va Xarajatlar Tahlilchisi</p>
            <p>4. <span className="text-sky-400 font-semibold">3D Earth</span> — Three.js va WebGL 3D Yer sayyorasi interaktiv modeli (60 FPS)</p>
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
        result = (
          <p className="text-xs text-rose-400">
            {language === 'uz'
              ? 'Ruxsat yo\'q: root huquqlari xavfsizlik maqsadida cheklangan :)'
              : language === 'ru'
              ? 'Доступ запрещён: права root ограничены в целях безопасности :)'
              : 'Permission denied: root privileges are restricted for security :)'}
          </p>
        );
        break;
      default:
        result = (
          <p className="text-xs text-neutral-400">
            {language === 'uz'
              ? `Buyruq topilmadi: "${trimmed}". Mavjud buyruqlarni ko'rish uchun help deb yozing.`
              : language === 'ru'
              ? `Команда не найдена: "${trimmed}". Введите help для списка доступных команд.`
              : `Command not found: "${trimmed}". Type help to see available commands.`}
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
    <div className="w-full rounded-3xl bg-[#0c0d12]/95 border border-white/12 shadow-2xl overflow-hidden font-mono text-left specular-rim backdrop-blur-2xl">
      {/* Terminal Window Top Bar */}
      <div className="px-4 py-3 bg-[#161720]/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between select-none">
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
            className="p-1.5 rounded-md hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title={language === 'uz' ? 'Tarixni nusxalash' : language === 'ru' ? 'Скопировать историю' : 'Copy history'}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {t.terminal.online}
          </span>
        </div>
      </div>

      {/* Quick Action Pill Bar */}
      <div className="px-4 py-2 bg-[#12131b] border-b border-white/5 flex flex-wrap items-center gap-1.5 text-xs text-neutral-400">
        <span className="text-[11px] text-neutral-500 mr-1 hidden sm:inline">{t.terminal.quickCommands}:</span>
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
              <span className="text-emerald-400">
                <span className="hidden sm:inline">sanjarbek@dev:~$</span>
                <span className="sm:hidden">dev:~$</span>
              </span>
              <span className="text-white font-semibold">{item.command}</span>
            </div>
            <div className="pl-3 sm:pl-4 border-l border-white/10 py-0.5">
              {item.output}
            </div>
          </div>
        ))}

        {/* Active Command Input Line */}
        <div className="flex items-center gap-2 text-xs pt-1">
          <span className="text-emerald-400 shrink-0">
            <span className="hidden sm:inline">sanjarbek@dev:~$</span>
            <span className="sm:hidden">dev:~$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.terminal.placeholder}
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-neutral-600 font-mono text-xs"
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="p-1 text-neutral-500 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

