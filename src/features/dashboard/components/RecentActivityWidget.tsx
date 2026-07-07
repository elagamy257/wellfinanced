'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Landmark, Cloud } from 'lucide-react';
import Link from 'next/link';

interface WidgetProps {
  isLoading?: boolean;
}

export function RecentActivityWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card variant="default" className="h-full relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/1 rounded-full blur-[90px] pointer-events-none" />

      {/* Card Header */}
      <div className="p-6 pb-3 flex items-center justify-between relative z-10 border-b border-border/40 select-none">
        <h3 className="text-base font-bold text-white tracking-tight">
          Recent Activity
        </h3>
        <Link 
          href="/dashboard/transactions"
          className="text-[10px] font-bold text-accent-cyan tracking-wider uppercase hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Card Body */}
      <div className="p-6 relative z-10">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton variant="rect" className="h-14" />
            <Skeleton variant="rect" className="h-14" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Item 1 - Stripe */}
            <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl hover:bg-white/3 transition-colors duration-200">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
                  <Landmark className="w-5 h-5 text-accent-mint" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">
                    Client Payment / Service Income
                  </h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    Oct 24, 2023 • Service Revenue
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 flex flex-col items-end gap-1">
                <span className="text-sm font-extrabold text-accent-mint">
                  +$2,400.00
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold tracking-widest uppercase">
                  Cleared
                </span>
              </div>
            </div>

            {/* Item 2 - AWS */}
            <div className="flex items-center justify-between gap-4 p-2.5 rounded-xl hover:bg-white/3 transition-colors duration-200">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
                  <Cloud className="w-5 h-5 text-accent-pink" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">
                    Business Expense / Infrastructure Cost
                  </h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    Oct 23, 2023 • Infrastructure Cost
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 flex flex-col items-end gap-1">
                <span className="text-sm font-extrabold text-white">
                  -$142.00
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[9px] font-bold tracking-widest uppercase">
                  Pending
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
