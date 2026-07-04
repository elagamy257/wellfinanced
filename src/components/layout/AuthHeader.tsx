'use client';

import React from 'react';
import { Cpu } from 'lucide-react';

export function AuthHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-6 lg:px-12 z-50 select-none">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center shadow-[0_0_16px_rgba(79,70,229,0.45)]">
          <Cpu className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm font-bold tracking-wider text-white uppercase">
          Cyber Freelance AI
        </span>
      </div>
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-success/5 border border-success/30 text-[10px] font-bold uppercase tracking-widest text-success">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        Neural Core Active
      </div>
    </header>
  );
}
