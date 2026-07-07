'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { TrendingDown } from 'lucide-react';

interface WidgetProps {
  isLoading?: boolean;
}

export function ExpenseWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card variant="default" className="h-full relative overflow-hidden group">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent-pink/3 rounded-full blur-[90px] group-hover:bg-accent-pink/5 transition-colors duration-700 pointer-events-none" />

      <div className="p-6 flex items-center gap-5 relative z-10 select-none">
        {/* Icon Frame */}
        <div className="w-12 h-12 rounded-xl bg-accent-pink/10 border border-accent-pink/15 flex items-center justify-center text-accent-pink shadow-[0_0_15px_rgba(236,72,153,0.15)] shrink-0">
          <TrendingDown className="w-5 h-5" />
        </div>

        {/* Text Details */}
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Monthly Expenses
          </span>
          {isLoading ? (
            <Skeleton variant="text" className="w-2/3 h-7 mt-1" />
          ) : (
            <span className="text-2xl font-extrabold text-white tracking-tight mt-0.5 block">
              $3,120
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
