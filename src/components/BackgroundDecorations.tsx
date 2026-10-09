'use client';

import React, { useEffect, useState } from 'react';

export default function BackgroundDecorations() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [targetPos, setTargetPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth lerp / requestAnimationFrame easing for cursor follower
  useEffect(() => {
    let animationFrameId: number;

    const followCursor = () => {
      setMousePos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      animationFrameId = requestAnimationFrame(followCursor);
    };

    animationFrameId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPos]);

  // Calculate parallax offsets based on mouse position relative to window center
  const parallaxX = typeof window !== 'undefined' ? (mousePos.x - window.innerWidth / 2) * 0.04 : 0;
  const parallaxY = typeof window !== 'undefined' ? (mousePos.y - window.innerHeight / 2) * 0.04 : 0;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Global Subtle Grid Pattern */}
      <div className="absolute inset-0 cyber-grid-complex opacity-60" />

      {/* 2. Interactive Cursor Follower Glow Orbs */}
      {/* Direct Mouse Follower Glow (Vibrant Royal Blue & Indigo) */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-500"
        style={{
          transform: `translate3d(${mousePos.x - 300}px, ${mousePos.y - 300}px, 0)`,
          background: 'radial-gradient(circle, rgba(29, 78, 216, 0.22) 0%, rgba(99, 102, 241, 0.15) 45%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* Secondary Counter-Parallax Cursor Glow (Teal & Violet) */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none transition-transform duration-300 ease-out opacity-75"
        style={{
          transform: `translate3d(${typeof window !== 'undefined' ? window.innerWidth - mousePos.x - 225 : 0}px, ${mousePos.y * 0.7}px, 0)`,
          background: 'radial-gradient(circle, rgba(15, 118, 110, 0.18) 0%, rgba(139, 92, 246, 0.12) 50%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* 3. Dynamic Ambient Background Meshes with Parallax Cursor Response */}
      {/* Top Ambient Orb */}
      <div
        className="absolute -top-24 -left-20 w-[550px] h-[550px] bg-blue-500/18 rounded-full blur-[130px] animate-float-slow"
        style={{
          transform: `translate3d(${parallaxX * 0.8}px, ${parallaxY * 0.8}px, 0)`,
        }}
      />

      {/* Top-Right Indigo Orb */}
      <div
        className="absolute top-48 right-[-10%] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] animate-pulse-slow"
        style={{
          transform: `translate3d(${-parallaxX}px, ${-parallaxY}px, 0)`,
        }}
      />

      {/* Mid Left Teal Orb */}
      <div
        className="absolute top-[40%] -left-28 w-[550px] h-[550px] bg-teal-500/15 rounded-full blur-[130px] animate-float-reverse"
        style={{
          transform: `translate3d(${parallaxX * 1.2}px, ${parallaxY * 1.2}px, 0)`,
        }}
      />

      {/* Mid Right Blue Orb */}
      <div
        className="absolute top-[60%] -right-24 w-[650px] h-[650px] bg-blue-700/15 rounded-full blur-[150px] animate-pulse-slow"
        style={{
          transform: `translate3d(${-parallaxX * 0.7}px, ${-parallaxY * 0.7}px, 0)`,
        }}
      />

      {/* Bottom Indigo Orb */}
      <div
        className="absolute bottom-[-5%] left-[25%] w-[600px] h-[600px] bg-indigo-600/16 rounded-full blur-[140px] animate-float-slow"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        }}
      />

      {/* 4. Subtle Circuit Vectors & Geometric Patterns */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tech-dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#1d4ed8" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#tech-dots)" />

        <g stroke="#1d4ed8" strokeWidth="1" fill="none" opacity="0.45">
          <path d="M 0 160 H 120 L 160 200 H 280 V 380 L 320 420" />
          <circle cx="120" cy="160" r="2.5" fill="#1d4ed8" />
          <circle cx="280" cy="380" r="2.5" fill="#1d4ed8" />
          <circle cx="320" cy="420" r="3.5" fill="#3b82f6" />

          <path d="M 1200 120 L 1080 240 H 940 L 900 280 V 460" />
          <circle cx="1080" cy="240" r="2.5" fill="#1d4ed8" />
          <circle cx="940" cy="240" r="2.5" fill="#1d4ed8" />
          <circle cx="900" cy="460" r="3.5" fill="#6366f1" />

          <path d="M 60 900 H 220 L 260 940 V 1100" />
          <circle cx="60" cy="900" r="2.5" fill="#0f766e" />
          <circle cx="260" cy="1100" r="3.5" fill="#1d4ed8" />

          <path d="M 1150 1600 L 1020 1730 H 880 L 840 1770" />
          <circle cx="1020" cy="1730" r="2.5" fill="#1d4ed8" />
          <circle cx="840" cy="1770" r="3.5" fill="#1d4ed8" />
        </g>
      </svg>

      {/* Floating Geometric Parallax Shapes */}
      <div
        className="absolute top-[28%] right-[8%] w-36 h-36 border border-blue-600/15 rounded-3xl rotate-12 pointer-events-none hidden md:block"
        style={{ transform: `translate3d(${parallaxX * 0.5}px, ${parallaxY * 0.5}px, 0) rotate(12deg)` }}
      />
      <div
        className="absolute top-[58%] left-[6%] w-48 h-48 border border-indigo-600/15 rounded-full border-dashed pointer-events-none hidden md:block"
        style={{ transform: `translate3d(${-parallaxX * 0.6}px, ${-parallaxY * 0.6}px, 0)` }}
      />
      <div
        className="absolute top-[78%] right-[6%] w-28 h-28 border border-teal-600/18 rounded-2xl rotate-45 pointer-events-none hidden md:block"
        style={{ transform: `translate3d(${parallaxX * 0.4}px, ${parallaxY * 0.4}px, 0) rotate(45deg)` }}
      />
    </div>
  );
}
