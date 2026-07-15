'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { Sparkles } from 'lucide-react';

export function InsightBanner() {
  return (
    <Card 
      variant="glass" 
      className="relative overflow-hidden p-6 border border-primary/20 bg-primary/5 select-none"
    >
      {/* Glow overlays */}
      <div className="absolute top-0 right-0 w-80 h-full bg-linear-to-l from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-glow">
            <Sparkles className="w-5 h-5 opacity-50" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-white tracking-wide uppercase">
              AI Insights Unavailable
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-2xl">
              Connect the AI optimization endpoint to receive personalized savings recommendations based on your spending habits.
            </p>
          </div>
        </div>

        <button
          disabled
          className="shrink-0 flex items-center justify-center gap-2 px-5 h-11 text-xs font-black uppercase tracking-wider text-slate-500 bg-white/5 rounded-xl cursor-not-allowed select-none border border-white/5"
        >
          <span>Offline</span>
        </button>
      </div>
    </Card>
  );
}
