'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface AuthGroupLayoutProps {
  children: React.ReactNode;
}

export default function AuthGroupLayout({ children }: AuthGroupLayoutProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg-1 flex flex-col font-sans text-text select-none">
      {/* Background gradients */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-300 ease-out" 
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          background: `
            radial-gradient(circle at 20% 20%, rgba(124,58,237,0.18) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(6,182,212,0.15) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(79,70,229,0.12) 0%, transparent 35%)
          `
        }}
      />

      {/* Navbar */}
      <nav className="relative h-16 flex items-center justify-between px-6 md:px-10 border-b border-white/5 backdrop-blur-md bg-bg-1/65 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center text-lg shadow-glow">
            💎
          </div>
          <span className="text-base font-extrabold tracking-tight">WellFinanced</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-[10px] font-bold uppercase tracking-widest text-accent-cyan shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
          AI Core Active
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-10 z-10 relative">
        <div className="w-full max-w-[460px] animate-scale-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative h-14 flex flex-col sm:flex-row items-center justify-between px-6 md:px-10 border-t border-white/5 bg-bg-1/40 z-20 text-[10px] text-muted gap-2 py-4 sm:py-0">
        <span>© 2026 WellFinanced · Secured by Neural Encryption</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="font-semibold uppercase tracking-wider hover:text-accent-cyan transition-colors">Privacy</Link>
          <Link href="/terms" className="font-semibold uppercase tracking-wider hover:text-accent-cyan transition-colors">Terms</Link>
          <Link href="/security" className="font-semibold uppercase tracking-wider hover:text-accent-cyan transition-colors">Security</Link>
        </div>
      </footer>
    </div>
  );
}
