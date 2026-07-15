'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { BarChart3 } from 'lucide-react';

export function GrowthChart() {
  return (
    <Card variant="default" className="h-full relative overflow-hidden group select-none">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/3 rounded-full blur-[90px] pointer-events-none" />

      <div className="p-6 pb-2 flex flex-col justify-between gap-4 relative z-10">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Projected Growth
          </span>
          <span className="text-[9px] text-slate-400 font-medium block">
            Aggregate across all goals
          </span>
        </div>
      </div>

      {/* Empty state container */}
      <div className="px-6 pb-6 pt-2 h-[220px] relative z-10 flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-4">
             <BarChart3 className="w-6 h-6 text-slate-500" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1">Growth Projections Unavailable</h3>
          <p className="text-xs text-slate-400 max-w-[200px]">
             The projection endpoint is currently not connected or returning timeseries data.
          </p>
        </div>
      </div>
    </Card>
  );
}
