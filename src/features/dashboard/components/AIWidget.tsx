'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Sparkles } from 'lucide-react';

interface WidgetProps {
  isLoading?: boolean;
}

export function AIWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card variant="default" className="h-full relative overflow-hidden group">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary-purple/5 rounded-full blur-[90px] group-hover:bg-primary-purple/8 transition-colors duration-700 pointer-events-none" />

      {/* Card Header Content */}
      <div className="p-6 pb-2 relative z-10 flex items-center gap-3 select-none">
        <div className="w-10 h-10 rounded-full bg-primary-purple/10 border border-primary-purple/20 flex items-center justify-center text-primary-purple shadow-[0_0_15px_rgba(124,58,237,0.2)]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            AI Forecast
          </h3>
          <span className="text-[9px] font-bold text-primary-purple uppercase tracking-widest block mt-0.5">
            30-Day Predicted Range
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-6 pt-3 relative z-10 flex flex-col justify-between h-[256px]">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton variant="text" className="w-1/2" />
            <Skeleton variant="input" />
            <Skeleton variant="text" className="w-3/4" />
          </div>
        ) : (
          <>
            {/* Center Predicted Value */}
            <div className="text-center py-2 select-none">
              <span className="text-4xl font-extrabold text-primary-purple tracking-tight drop-shadow-[0_0_15px_rgba(124,58,237,0.35)]">
                $8,525
              </span>
              <span className="text-[9px] font-bold text-slate-500 tracking-wider text-center block mt-1.5 uppercase">
                Medium Confidence Index (74%)
              </span>
            </div>

            {/* Custom Progress Slider Track */}
            <div className="relative py-2 select-none">
              <div className="h-1.5 w-full bg-white/5 rounded-full relative">
                {/* Active predicted range shade */}
                <div className="absolute left-[15%] right-[15%] top-0 h-full bg-primary-purple/15 rounded-full" />
                {/* Glowing line filled to 50% */}
                <div className="absolute left-[15%] w-[35%] top-0 h-full bg-primary-purple rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                {/* Slider dot marker at 50% */}
                <div className="absolute left-[50%] -translate-x-1/2 -top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-primary-purple shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
              </div>

              {/* Range Bounds */}
              <div className="flex justify-between items-center mt-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>$7,200 Min</span>
                <span>$9,850 Max</span>
              </div>
            </div>

            {/* Insight Alert Box */}
            <div className="bg-primary-purple/5 border border-primary-purple/10 rounded-xl p-3.5 mt-2 shadow-sm">
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                &quot;Wafaa, your AWS costs are projected to spike next week. Consider auditing your S3 storage.&quot;
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
