'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, ArrowRight, ShieldCheck, Copy, Check, Sparkles, Code2, Database, Cpu } from 'lucide-react';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

export default function HeroSection({ onOpenTerminal }: HeroSectionProps) {
  const [copied, setCopied] = useState(false);
  const [activeCommandIndex, setActiveCommandIndex] = useState(0);
  const commands = [
    'npx jeevith-portfolio --status=available',
    'curl -s https://jeevith.dev/api/skills | jq',
    'ssh -p 22 engineer@jeevith-portfolio.live'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCommandIndex((prev) => (prev + 1) % commands.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [commands.length]);

  const copyCommand = () => {
    navigator.clipboard.writeText(commands[activeCommandIndex]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden cyber-grid-bg">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/25 rounded-full blur-3xl pointer-events-none -z-10 animate-cyber-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/25 rounded-full blur-3xl pointer-events-none -z-10 animate-cyber-pulse" />

      {/* Cyber Grid Lines & Gradient Accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto w-full text-center relative z-10 flex flex-col items-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200 text-blue-900 font-mono text-xs mb-8 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="font-semibold">Available for full-stack engineering roles</span>
        </div>

        {/* Main Title & Role */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 font-mono leading-tight">
          BUILDING <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 neon-glow-text">HIGH-SCALE</span> <br />
          FULL-STACK SYSTEMS
        </h1>

        <p className="max-w-2xl text-slate-600 text-base sm:text-lg mb-8 leading-relaxed font-sans font-normal">
          Hi, I am <span className="text-blue-800 font-bold font-mono">Jeevith</span> — Full-Stack Engineer crafting resilient microservices, high-throughput cloud architectures, responsive React / Next.js interfaces, and modern applications.
        </p>

        {/* Terminal Interactive Quick Command Bar */}
        <div className="w-full max-w-xl mx-auto mb-10">
          <div className="bg-slate-900 text-white rounded-2xl p-3.5 sm:p-4 text-left font-mono text-xs sm:text-sm border border-slate-800 shadow-xl relative group">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800 text-slate-400 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                <span className="ml-2 text-slate-400 text-[11px]">quick terminal</span>
              </div>
              <button
                onClick={copyCommand}
                className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 bg-slate-800 px-2 py-1 rounded border border-slate-700 transition-all hover:scale-105 font-medium"
                title="Copy Command to Clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-slate-100">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-blue-300 transition-all duration-300 font-medium">{commands[activeCommandIndex]}</span>
              <span className="w-2 h-4 bg-blue-400 animate-blink inline-block"></span>
            </div>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-bold font-mono text-sm flex items-center gap-2 shadow-md hover:shadow-[0_4px_20px_rgba(29,78,216,0.3)] transition-all hover:scale-105 active:scale-95"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenTerminal}
            className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-blue-600 text-slate-800 hover:text-blue-800 font-mono text-sm flex items-center gap-2.5 shadow-sm hover:shadow-[0_4px_15px_rgba(29,78,216,0.15)] transition-all hover:scale-105 font-semibold"
          >
            <Terminal className="w-4 h-4 text-blue-700" />
            <span>Open Terminal</span>
          </button>

          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-700 font-mono text-sm flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all font-medium"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-700" />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Core Tech Stack Badges */}
        <div className="pt-6 border-t border-slate-200 w-full max-w-4xl flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-slate-600 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-blue-800 font-medium">
            <Code2 className="w-4 h-4 text-blue-700" />
            <span>Next.js 15 / React</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
            <Cpu className="w-4 h-4 text-emerald-700" />
            <span>Node.js / Express / Python</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-indigo-800 font-medium">
            <Database className="w-4 h-4 text-indigo-700" />
            <span>PostgreSQL / MongoDB / SQLite</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 text-amber-800 font-medium">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Docker / Cloud CI/CD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
