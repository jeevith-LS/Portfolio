'use client';

import React from 'react';
import { ExperienceItem } from '@/types/portfolio';
import { Briefcase, Calendar, MapPin, Download, CheckCircle2 } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-mono text-xs mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>CAREER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tracking-tight">
            Work <span className="text-blue-700">Experience</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
            Track record of shipping production-grade systems, leading technical initiatives, and building performant web applications.
          </p>
        </div>

        {/* Download CV CTA */}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-blue-200 hover:border-blue-500 text-blue-800 font-mono text-xs shadow-xs hover:shadow-[0_4px_15px_rgba(29,78,216,0.15)] transition-all font-bold"
        >
          <Download className="w-4 h-4 text-blue-700" />
          <span>Resume (PDF)</span>
        </a>
      </div>

      {/* Timeline Circuit */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-blue-300 space-y-12 ml-2 sm:ml-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-blue-700 shadow-[0_0_8px_rgba(29,78,216,0.4)] group-hover:scale-125 transition-transform" />

            {/* Experience Card */}
            <div className="rounded-2xl bg-white border border-slate-200 hover:border-blue-400 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(29,78,216,0.12)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-xl font-bold font-mono text-slate-900 group-hover:text-blue-700 transition-colors">
                    {exp.role}
                  </h3>
                  {exp.featuredBadge && (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                      {exp.featuredBadge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-700" />
                    {exp.period}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-blue-800 mb-4 pb-3 border-b border-slate-100 font-semibold">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-blue-700" />
                  {exp.company}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  {exp.location}
                </span>
              </div>

              {/* Achievements */}
              <ul className="space-y-2 mb-6 font-sans text-xs sm:text-sm text-slate-600">
                {exp.description.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
