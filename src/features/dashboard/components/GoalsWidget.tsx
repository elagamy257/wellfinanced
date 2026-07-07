'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Target } from 'lucide-react';

interface WidgetProps {
  isLoading?: boolean;
}

export function GoalsWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card variant="default" className="h-[185px] relative overflow-hidden group">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent-cyan/3 rounded-full blur-[90px] group-hover:bg-accent-cyan/5 transition-colors duration-700 pointer-events-none" />

      {/* Content wrapper */}
      <div className="p-6 h-full flex flex-col justify-between relative z-10 select-none">
        
        {/* Header: Title and Target */}
        {isLoading ? (
          <div className="flex justify-between items-start gap-4">
            <Skeleton variant="text" className="w-1/3 h-5" />
            <Skeleton variant="text" className="w-1/4 h-4" />
          </div>
        ) : (
          <div className="flex justify-between items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent-cyan/10 border border-accent-cyan/15 flex items-center justify-center text-accent-cyan">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Goal: Q4 Taxes
              </h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
              $15,000 Target
            </span>
          </div>
        )}

        {/* Middle: Progress Bar */}
        {isLoading ? (
          <Skeleton variant="text" className="w-full h-3 rounded-full" />
        ) : (
          <div className="space-y-1.5 py-1">
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="absolute left-0 top-0 h-full bg-accent-cyan rounded-full shadow-[0_0_12px_rgba(6,182,212,0.45)]"
                style={{ width: '65%' }}
              />
            </div>
          </div>
        )}

        {/* Footer: Amount Saved and Percentage Achieved */}
        {isLoading ? (
          <div className="flex justify-between items-end">
            <Skeleton variant="text" className="w-1/4 h-4" />
            <Skeleton variant="text" className="w-10 h-4" />
          </div>
        ) : (
          <div className="flex justify-between items-center text-xs">
            <span className="font-extrabold text-accent-cyan">
              $9,750.00 saved
            </span>
            <span className="font-bold text-slate-400">
              65% achieved
            </span>
          </div>
        )}

      </div>
    </Card>
  );
}
