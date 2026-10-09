'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import TerminalModal from '@/components/TerminalModal';
import AdminDrawer from '@/components/AdminDrawer';
import BackgroundDecorations from '@/components/BackgroundDecorations';
import { Project, SkillCategory, ExperienceItem, SystemStats } from '@/types/portfolio';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);

  const [terminalOpen, setTerminalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');

  // Fetch data from backend APIs
  const fetchAllData = useCallback(async () => {
    try {
      const [projRes, skillRes, expRes, statsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/experience'),
        fetch('/api/stats')
      ]);

      const [projData, skillData, expData, statsData] = await Promise.all([
        projRes.json(),
        skillRes.json(),
        expRes.json(),
        statsRes.json()
      ]);

      if (projData.success) setProjects(projData.data);
      if (skillData.success) setSkills(skillData.data);
      if (expData.success) setExperiences(expData.data);
      if (statsData.success) setStats(statsData.data);
    } catch {
      // Fallback
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K / Ctrl+~ to toggle Terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === '`' || e.key === '~')) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active scroll section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['projects', 'skills', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans text-slate-900">
      {/* Dynamic Background Design, Glow Meshes & Circuit Overlays */}
      <BackgroundDecorations />

      {/* Navigation Header */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        activeSection={activeSection}
      />

      {/* Content Container (Layered above background decorations) */}
      <div className="relative z-10 space-y-4">
        {/* Hero Header */}
        <HeroSection onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Section Divider 01 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-4 text-blue-900/30">
            <div className="w-2 h-2 rounded-full border-2 border-blue-600 bg-white shadow-xs" />
            <div className="flex-1 h-px bg-gradient-to-r from-blue-600/30 via-blue-400/15 to-transparent" />
          </div>
        </div>

        {/* Projects Showcase */}
        <ProjectsSection
          projects={projects}
          onAddProjectClick={() => setAdminOpen(true)}
        />

        {/* Section Divider 02 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-4 text-indigo-900/30">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-400/15 to-indigo-600/30" />
            <div className="w-2 h-2 rounded-full border-2 border-indigo-600 bg-white shadow-xs" />
          </div>
        </div>

        {/* Skills Matrix */}
        <SkillsSection skills={skills} />

        {/* Section Divider 03 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-4 text-teal-900/30">
            <div className="w-2 h-2 rounded-full border-2 border-teal-600 bg-white shadow-xs" />
            <div className="flex-1 h-px bg-gradient-to-r from-teal-600/30 via-teal-400/15 to-transparent" />
          </div>
        </div>

        {/* Experience Timeline */}
        <ExperienceSection experiences={experiences} />

        {/* Section Divider 04 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-4 text-blue-900/30">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/15 to-blue-600/30" />
            <div className="w-2 h-2 rounded-full border-2 border-blue-600 bg-white shadow-xs" />
          </div>
        </div>

        {/* Contact Transceiver Form */}
        <ContactSection onMessageSentSuccess={fetchAllData} />

        {/* Footer & Telemetry */}
        <Footer stats={stats} onOpenTerminal={() => setTerminalOpen(true)} />
      </div>

      {/* Interactive Cyber CLI Terminal Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        projects={projects}
        skills={skills}
        onNavigateToContact={() => {
          const contactEl = document.getElementById('contact');
          contactEl?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Live Admin & Database Persistence Drawer */}
      <AdminDrawer
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onProjectsUpdated={fetchAllData}
      />
    </main>
  );
}
