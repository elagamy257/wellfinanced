'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function AuthFooter() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-between px-6 lg:px-12 border-t border-slate-100 dark:border-white/5 bg-white/40 dark:bg-bg-1/40 z-50 text-[9px] tracking-widest font-bold text-slate-400 dark:text-muted uppercase select-none">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" />
        <span className="text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Dananir & Blanco. Secured by Neural Encryption.
        </span>
      </div>
      <div className="hidden sm:flex items-center gap-8 text-slate-500 dark:text-slate-400">
        <Link 
          href="/privacy" 
          className="hover:text-success transition-colors duration-200"
        >
          Privacy Policy
        </Link>
        <Link 
          href="/terms" 
          className="hover:text-success transition-colors duration-200"
        >
          Terms of Service
        </Link>
        <Link 
          href="/security" 
          className="hover:text-success transition-colors duration-200"
        >
          Security Status
        </Link>
      </div>
    </footer>
  );
}
