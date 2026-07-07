'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { Sparkles, ArrowRight } from 'lucide-react';
import { mockSavingsMetrics } from '../mocks';

interface SavingsInsightBannerProps {
  onOptimize?: () => void;
}

export function SavingsInsightBanner({ onOptimize }: SavingsInsightBannerProps) {
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
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-white tracking-wide uppercase">
              {mockSavingsMetrics.insightTitle}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium max-w-2xl">
              {mockSavingsMetrics.insightText}
            </p>
          </div>
        </div>

        <button
          onClick={onOptimize}
          className="shrink-0 flex items-center justify-center gap-2 px-5 h-11 text-xs font-black uppercase tracking-wider text-black bg-linear-to-tr from-[#8BFF7D] to-[#8FFFD2] rounded-xl hover:brightness-110 shadow-[0_4px_20px_rgba(139,255,125,0.25)] transition-all cursor-pointer select-none"
        >
          <span>Optimize Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
}
