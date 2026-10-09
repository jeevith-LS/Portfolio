'use client';

import React, { useState } from 'react';
import { Project } from '@/types/portfolio';
import { ExternalLink, Sparkles, Search, Layers, Zap, Info, X } from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';

interface ProjectsSectionProps {
  projects: Project[];
  onAddProjectClick: () => void;
}

export default function ProjectsSection({ projects, onAddProjectClick }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', 'AI & ML', 'Cloud & DevOps', 'Mobile', 'Tools & Systems'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      project.title.toLowerCase().includes(query) ||
      project.tagline.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some(t => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-700 font-mono text-xs mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tracking-tight flex items-center gap-3">
            Featured <span className="text-blue-700">Projects</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
            Scalable full-stack systems, distributed cloud platforms, and modern web applications built for performance and reliability.
          </p>
        </div>

        {/* Action Button to trigger Add Project modal */}
        <div className="flex items-center gap-3">
          <button
            onClick={onAddProjectClick}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-500 text-blue-800 font-mono text-xs flex items-center gap-2 shadow-xs hover:shadow-[0_4px_15px_rgba(29,78,216,0.15)] transition-all font-bold"
          >
            <Sparkles className="w-4 h-4 text-blue-700" />
            <span>+ Add Project</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all font-medium ${
                selectedCategory === cat
                  ? 'bg-blue-50 text-blue-900 border border-blue-300 shadow-sm font-bold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tech, stack, or keywords..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm">
          <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="font-mono text-slate-700 font-semibold">No matching projects found</p>
          <p className="text-slate-500 text-xs mt-1">Try refining your search keyword or switching category tabs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-white border border-slate-200 hover:border-blue-400 p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-[0_10px_30px_rgba(29,78,216,0.12)] hover:-translate-y-1"
            >
              {/* Card Top / Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg font-bold">
                      <Zap className="w-3 h-3 text-amber-600" />
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold font-mono text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Metrics Highlight if any */}
                {project.metrics && (
                  <div className="mb-4 p-2 rounded-xl bg-emerald-50/80 border border-emerald-200 text-[11px] font-mono text-emerald-800 flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span>{project.metrics}</span>
                  </div>
                )}
              </div>

              {/* Card Bottom / Tags & Action Links */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-mono text-slate-600 hover:text-blue-700 flex items-center gap-1 transition-colors font-semibold"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Deep Dive</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 hover:border-blue-300 transition-all shadow-xs"
                        title="View Source Code"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-mono text-xs font-bold px-3 flex items-center gap-1 shadow-sm transition-all"
                        title="Open Live Preview"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Deep Dive Architecture Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-blue-50 text-blue-800 border border-blue-200 font-bold">
                {activeModalProject.category}
              </span>
            </div>

            <h3 className="text-2xl font-bold font-mono text-slate-900 mb-1">{activeModalProject.title}</h3>
            <p className="text-blue-800 font-mono text-xs mb-5 font-bold">{activeModalProject.tagline}</p>

            <div className="space-y-4 font-sans text-sm text-slate-700 mb-6">
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">Overview</h4>
                <p className="leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">{activeModalProject.description}</p>
              </div>

              {activeModalProject.architectureDetails && (
                <div>
                  <h4 className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider mb-1">Architecture & Implementation</h4>
                  <p className="leading-relaxed bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200 text-emerald-950 text-xs font-mono">
                    {activeModalProject.architectureDetails}
                  </p>
                </div>
              )}

              {activeModalProject.metrics && (
                <div>
                  <h4 className="text-xs font-mono font-bold text-blue-800 uppercase tracking-wider mb-1">Key Highlights</h4>
                  <p className="text-xs font-mono text-blue-950 bg-blue-50 p-3 rounded-xl border border-blue-200 font-bold">
                    ⚡ {activeModalProject.metrics}
                  </p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-mono flex items-center gap-2 shadow-xs font-medium"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-700 text-white font-bold text-xs font-mono flex items-center gap-1.5 hover:bg-blue-800 shadow-sm"
                >
                  <span>Launch Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
