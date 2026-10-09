'use client';

import React, { useState, useEffect } from 'react';
import { X, Database, Plus, Mail, CheckCircle, RefreshCw, Sparkles, Layers } from 'lucide-react';
import { ContactMessage } from '@/types/portfolio';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectsUpdated: () => void;
}

export default function AdminDrawer({ isOpen, onClose, onProjectsUpdated }: AdminDrawerProps) {
  const [activeTab, setActiveTab] = useState<'messages' | 'addProject' | 'schema'>('messages');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Add Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    tagline: '',
    description: '',
    category: 'Full-Stack',
    tags: '',
    metrics: '',
    githubUrl: '',
    liveUrl: '',
    featured: true,
    architectureDetails: ''
  });
  const [submittingProject, setSubmittingProject] = useState(false);
  const [projectNotice, setProjectNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch {
      // ignore
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingProject(true);
    setProjectNotice(null);

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...projectForm,
          tags: projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProjectNotice({ type: 'success', text: 'Project successfully created and saved in database!' });
        setProjectForm({
          title: '',
          tagline: '',
          description: '',
          category: 'Full-Stack',
          tags: '',
          metrics: '',
          githubUrl: '',
          liveUrl: '',
          featured: true,
          architectureDetails: ''
        });
        onProjectsUpdated();
      } else {
        setProjectNotice({ type: 'error', text: data.error || 'Failed to create project.' });
      }
    } catch {
      setProjectNotice({ type: 'error', text: 'Network error creating project.' });
    } finally {
      setSubmittingProject(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-2xl bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <Database className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-slate-900 flex items-center gap-2">
                Admin Dashboard
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">Database Management & Inbox</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 border-b border-slate-200 bg-white font-mono text-xs">
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3 px-4 border-b-2 font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'messages'
                ? 'border-emerald-700 text-emerald-800 bg-emerald-50/70'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Messages ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addProject')}
            className={`py-3 px-4 border-b-2 font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'addProject'
                ? 'border-blue-700 text-blue-800 bg-blue-50/70'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-4 border-b-2 font-bold flex items-center gap-2 transition-colors ${
              activeTab === 'schema'
                ? 'border-indigo-700 text-indigo-800 bg-indigo-50/70'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>API Docs</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* TAB 1: Inbound Messages */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono text-slate-500">
                  Inbox ({messages.length})
                </p>
                <button
                  onClick={fetchMessages}
                  disabled={loadingMessages}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono text-blue-800 hover:border-blue-500 flex items-center gap-1 shadow-2xs font-bold"
                >
                  <RefreshCw className={`w-3 h-3 ${loadingMessages ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 font-mono text-slate-500 text-xs font-medium">
                  No messages yet. Send a message from the contact form to test.
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 font-mono shadow-xs"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-800">{msg.name}</span>
                      <span className="text-slate-400 text-[11px] font-medium">{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="text-[11px] text-emerald-800 font-bold">
                      Email: <a href={`mailto:${msg.email}`} className="underline">{msg.email}</a>
                    </div>
                    <div className="text-xs font-bold text-slate-800">
                      Subject: {msg.subject}
                    </div>
                    <p className="text-xs text-slate-700 font-sans bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Add Project Form */}
          {activeTab === 'addProject' && (
            <form onSubmit={handleAddProject} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-bold">PROJECT TITLE *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. Distributed Stream Engine"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">TAGLINE / SUBTITLE</label>
                <input
                  type="text"
                  value={projectForm.tagline}
                  onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                  placeholder="e.g. Sub-millisecond event pipeline"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">CATEGORY *</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Tools & Systems">Tools & Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">METRICS BADGE</label>
                  <input
                    type="text"
                    value={projectForm.metrics}
                    onChange={(e) => setProjectForm({ ...projectForm, metrics: e.target.value })}
                    placeholder="e.g. 99.99% uptime • 2M+ events"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">TAGS (COMMA-SEPARATED)</label>
                <input
                  type="text"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  placeholder="Next.js, TypeScript, PostgreSQL, Redis"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">DESCRIPTION *</label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Overview of the product and what problem it solves..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 resize-none font-sans shadow-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold">ARCHITECTURE DETAILS</label>
                <textarea
                  rows={2}
                  value={projectForm.architectureDetails}
                  onChange={(e) => setProjectForm({ ...projectForm, architectureDetails: e.target.value })}
                  placeholder="Microservice event bus, Dockerized workers, caching topology..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 resize-none font-sans shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">GITHUB URL</label>
                  <input
                    type="url"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-bold">LIVE APP URL</label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    placeholder="https://myapp.live"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
                  />
                </div>
              </div>

              {projectNotice && (
                <div
                  className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
                    projectNotice.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold'
                      : 'bg-rose-50 border border-rose-200 text-rose-900 font-bold'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>{projectNotice.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submittingProject}
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{submittingProject ? 'Saving...' : 'Save Project'}</span>
              </button>
            </form>
          )}

          {/* TAB 3: Schema & API Endpoints Docs */}
          {activeTab === 'schema' && (
            <div className="space-y-4 font-mono text-xs text-slate-700">
              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3 shadow-xs">
                <p className="font-bold text-indigo-950">REST API ROUTES AVAILABLE</p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-emerald-800 font-bold">GET</span> <code className="text-blue-800 font-bold">/api/projects</code> - List projects with query params (?category=&search=&featured=)
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-blue-800 font-bold">POST</span> <code className="text-blue-800 font-bold">/api/projects</code> - Insert project record into database
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-rose-800 font-bold">DELETE</span> <code className="text-blue-800 font-bold">/api/projects/[id]</code> - Remove project from database
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-emerald-800 font-bold">GET</span> <code className="text-blue-800 font-bold">/api/skills</code> - Retrieve technical skills matrix
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-emerald-800 font-bold">GET</span> <code className="text-blue-800 font-bold">/api/experience</code> - Retrieve career history
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-blue-800 font-bold">POST</span> <code className="text-blue-800 font-bold">/api/contact</code> - Store contact inquiry
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-emerald-800 font-bold">GET</span> <code className="text-blue-800 font-bold">/api/stats</code> - Real-time system telemetry
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
