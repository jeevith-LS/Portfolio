'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Sparkles, MessageSquare, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterXIcon } from '@/components/BrandIcons';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onMessageSentSuccess?: () => void;
}

export default function ContactSection({ onMessageSentSuccess }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setFeedbackMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFeedbackMessage('Transmission dispatched and stored into database successfully! I will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });

        if (onMessageSentSuccess) {
          onMessageSentSuccess();
        }
      } else {
        setStatus('error');
        setFeedbackMessage(data.error || 'Failed to dispatch message. Please try again.');
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('Network error occurred while connecting to database.');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative cyber-grid-bg">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-blue-700 font-mono text-xs mb-2 font-bold">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span>CONTACT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tracking-tight">
          Get In <span className="text-blue-700">Touch</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Have an exciting project, role, or architecture to discuss? Send a message and let's connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Socials (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Terminal className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h3 className="font-mono text-lg font-bold text-slate-900">Jeevith</h3>
              <p className="text-xs font-mono text-emerald-700 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                Available for opportunities
              </p>
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
            Whether you need high-performance full-stack web applications, backend architectures, or API integration, I am always ready to collaborate.
          </p>

          {/* Quick Details List */}
          <div className="space-y-3 font-mono text-xs text-slate-700">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-700 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Email</span>
                <span className="text-slate-800 font-semibold">jeevith.dev@portfolio.local</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-indigo-700 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Response Time</span>
                <span className="text-slate-800 font-semibold">&lt; 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Social Network Badges */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-wider font-bold">Connect</p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-100 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 transition-all hover:scale-105 shadow-xs"
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-100 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 transition-all hover:scale-105 shadow-xs"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-100 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 transition-all hover:scale-105 shadow-xs"
                title="Twitter / X"
              >
                <TwitterXIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Transmission Form (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm transition-all">
          <form onSubmit={handleSubmit} className="space-y-4 font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  YOUR NAME <span className="text-blue-700">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  EMAIL ADDRESS <span className="text-blue-700">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  required
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                SUBJECT
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Project inquiry / Collaboration / Role"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                MESSAGE <span className="text-blue-700">*</span>
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Details regarding your project, timeline, or inquiry..."
                required
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all resize-none shadow-xs"
              />
            </div>

            {/* Status alerts */}
            {status === 'success' && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2 font-bold">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{feedbackMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-bold font-mono text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-[0_4px_20px_rgba(29,78,216,0.3)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {status === 'submitting' ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
