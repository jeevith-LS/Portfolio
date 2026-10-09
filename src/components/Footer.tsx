'use client';

import React from 'react';
import { SystemStats } from '@/types/portfolio';
import { Terminal, Activity, Coffee, FolderGit2, Cpu } from 'lucide-react';

interface FooterProps {
  stats: SystemStats | null;
  onOpenTerminal: () => void;
}

export default function Footer({ stats, onOpenTerminal }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Telemetry Stats Bar */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-12 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-slate-900">{stats.projectsCount}</p>
                <p className="text-[11px] font-mono text-slate-500 uppercase font-bold">Projects Shipped</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-slate-900">{stats.skillsCount}+</p>
                <p className="text-[11px] font-mono text-slate-500 uppercase font-bold">Tech Proficiencies</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-slate-900">{stats.uptimePercentage}</p>
                <p className="text-[11px] font-mono text-slate-500 uppercase font-bold">System Uptime</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold font-mono text-slate-900">{stats.coffeeConsumed}+</p>
                <p className="text-[11px] font-mono text-slate-500 uppercase font-bold">Espressos Brewed</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-300 flex items-center justify-center font-mono font-bold text-blue-700 text-sm">
              &lt;J/&gt;
            </div>
            <div>
              <p className="font-mono text-sm text-slate-900 font-bold">Jeevith • Full-Stack Engineer</p>
              <p className="text-[11px] font-mono text-slate-500">Built with Next.js 15, TypeScript & TailwindCSS</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              onClick={onOpenTerminal}
              className="text-blue-700 hover:text-blue-900 flex items-center gap-1.5 transition-colors font-bold"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Terminal CLI</span>
            </button>
            <span className="text-slate-300">•</span>
            <a href="#projects" className="text-slate-600 hover:text-blue-700 transition-colors font-medium">
              Projects
            </a>
            <span className="text-slate-300">•</span>
            <a href="#skills" className="text-slate-600 hover:text-blue-700 transition-colors font-medium">
              Skills
            </a>
            <span className="text-slate-300">•</span>
            <a href="#contact" className="text-slate-600 hover:text-blue-700 transition-colors font-medium">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
