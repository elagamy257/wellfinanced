'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function AuthFooter() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-between px-6 lg:px-12 border-t border-white/5 bg-[#060B1A]/40 z-50 text-[9px] tracking-widest font-bold text-muted uppercase select-none">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-success" />
        <span>
          © {new Date().getFullYear()} Cyber Freelance AI. Secured by Neural Encryption.
        </span>
      </div>
      <div className="flex items-center gap-8">
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
