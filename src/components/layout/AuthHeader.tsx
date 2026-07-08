'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';

interface AuthHeaderProps {
  showNav?: boolean;
  showActions?: boolean;
}

export function AuthHeader({ showNav = false, showActions = false }: AuthHeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-6 lg:px-12 z-50 select-none">
      {/* Left: Logo */}
      <Logo />

      {/* Center: Navigation Links (only for Landing page if showNav is true) */}
      {showNav && (
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-300">
          <Link href="#" className="hover:text-[#8BFF7D] transition-colors">Home</Link>
          <Link href="#" className="hover:text-[#8BFF7D] transition-colors">Features</Link>
          <Link href="#" className="hover:text-[#8BFF7D] transition-colors">Enterprise</Link>
          <Link href="#" className="hover:text-[#8BFF7D] transition-colors">Resources</Link>
        </div>
      )}

      {/* Right: Actions or System Status */}
      <div className="flex items-center gap-4.5">
        {showActions ? (
          <>
            <Link href="/login" className="text-xs font-black uppercase tracking-wider text-slate-300 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/register">
              <Button 
                variant="primary" 
                size="sm"
                className="h-9.5 px-5 font-black uppercase tracking-wider text-black bg-gradient-button rounded-xl hover:brightness-110 shadow-[0_0_15px_rgba(139,255,125,0.3)] border-0 text-[10px]"
              >
                Get Started
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-success/5 border border-success/30 text-[9px] font-bold uppercase tracking-widest text-[#7CFFB2] shadow-[0_0_10px_rgba(124,255,178,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7CFFB2] animate-pulse" />
            <span>System Active</span>
          </div>
        )}
      </div>
    </header>
  );
}
