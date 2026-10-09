'use client';

import React from 'react';
import { SkillCategory } from '@/types/portfolio';
import { Layout, Server, Database, Cpu, Sparkles } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillCategory[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'layout':
        return <Layout className="w-5 h-5 text-blue-700" />;
      case 'server':
        return <Server className="w-5 h-5 text-emerald-700" />;
      case 'database':
        return <Database className="w-5 h-5 text-indigo-700" />;
      case 'cpu':
      default:
        return <Cpu className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative cyber-dots-bg">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-emerald-800 font-mono text-xs mb-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>EXPERTISE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tracking-tight">
          Skills & <span className="text-blue-700">Technologies</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Experience across modern web standards, distributed backend services, databases, and cloud infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl bg-white border border-slate-200 hover:border-blue-400 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(29,78,216,0.12)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="font-mono text-lg font-bold text-slate-900 tracking-wide">{category.title}</h3>
              </div>
            </div>

            {/* Skills List with Level Bars */}
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-800 font-semibold group-hover:text-blue-700 transition-colors">
                        {skill.name}
                      </span>
                      {skill.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-800 border border-blue-200 font-bold">
                          {skill.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-500 text-[11px] font-medium">{skill.experience}</span>
                      <span className="text-blue-800 font-bold">{skill.level}%</span>
                    </div>
                  </div>

                  {/* Meter Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden p-[1px]">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        skill.highlight
                          ? 'bg-gradient-to-r from-blue-700 via-teal-700 to-emerald-700'
                          : 'bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Philosophy Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-slate-700">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3 hover:border-blue-300 transition-colors">
          <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900 mb-0.5">Clean Architecture</p>
            <p className="text-slate-500 text-[11px]">Domain-driven design, modular decoupled code, strict type safety, and automated linting.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3 hover:border-emerald-300 transition-colors">
          <Cpu className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900 mb-0.5">High Performance</p>
            <p className="text-slate-500 text-[11px]">Optimized Core Web Vitals, sub-second API latencies, edge caching, and memory efficiency.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-start gap-3 hover:border-indigo-300 transition-colors">
          <Database className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-900 mb-0.5">Resilient Data</p>
            <p className="text-slate-500 text-[11px]">ACID transactions, structured indexing, zero-data-loss replication, and audit tracking.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
