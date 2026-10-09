'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Sparkles, FolderGit2, Cpu, Mail, Menu, X, Database } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
}

export default function Navbar({ onOpenTerminal, onOpenAdmin, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects', icon: FolderGit2 },
    { label: 'Skills', href: '#skills', icon: Cpu },
    { label: 'Experience', href: '#experience', icon: Sparkles },
    { label: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-300 flex items-center justify-center group-hover:border-blue-600 transition-all group-hover:shadow-[0_0_15px_rgba(29,78,216,0.3)]">
              <span className="font-mono font-bold text-blue-700 text-lg">&lt;J/&gt;</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-wider text-slate-900 font-mono text-sm group-hover:text-blue-700 transition-colors">
                JEEVITH
              </span>
              <span className="text-[10px] text-emerald-700 font-mono flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Available for hire
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/95 p-1.5 rounded-full border border-slate-200/90 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200 shadow-sm'
                      : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Terminal Launch Button */}
            <button
              onClick={onOpenTerminal}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-700 font-mono text-xs flex items-center gap-2 shadow-sm hover:shadow-[0_4px_12px_rgba(29,78,216,0.15)] transition-all group"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-700 group-hover:animate-bounce" />
              <span className="font-semibold">Terminal</span>
              <span className="bg-blue-50 text-[10px] px-1.5 py-0.5 rounded text-blue-800 border border-blue-200 font-semibold">
                ⌘K
              </span>
            </button>

            {/* Admin Hub */}
            <button
              onClick={onOpenAdmin}
              className="px-3 py-1.5 rounded-xl bg-white border border-emerald-200 hover:border-emerald-500 text-emerald-800 font-mono text-xs flex items-center gap-1.5 shadow-sm hover:shadow-[0_4px_12px_rgba(4,120,87,0.15)] transition-all font-bold"
              title="Open Database & Admin Panel"
            >
              <Database className="w-3.5 h-3.5 text-emerald-700" />
              <span>Admin</span>
            </button>

            {/* Contact / Hire Button */}
            <a
              href="#contact"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold font-mono text-xs flex items-center gap-1.5 shadow-sm hover:shadow-[0_4px_15px_rgba(29,78,216,0.3)] transition-all hover:scale-105 active:scale-95"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-xl bg-white border border-slate-200 text-blue-700 shadow-sm"
              aria-label="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-sm"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl flex flex-col gap-2 shadow-xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-mono text-sm text-slate-700 hover:text-blue-700 hover:bg-blue-50 flex items-center gap-2.5 transition-colors font-semibold"
                >
                  <Icon className="w-4 h-4 text-blue-700" />
                  {link.label}
                </a>
              );
            })}
            <div className="pt-2 mt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs flex items-center justify-center gap-2 font-bold"
              >
                <Database className="w-4 h-4" />
                <span>Admin Panel</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 font-mono text-xs flex items-center justify-center gap-2 font-bold"
              >
                <Terminal className="w-4 h-4" />
                <span>Open Terminal</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
