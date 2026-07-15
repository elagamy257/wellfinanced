import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Landmark, Cloud, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useDashboardRecentTransactions } from '../hooks/useDashboardRecentTransactions';
import { formatCurrency, formatDate } from '@/utils';

interface WidgetProps {
  isLoading?: boolean;
}



export function RecentActivityWidget({ isLoading = false }: WidgetProps) {
  const { data, isLoading: isQueryLoading, isError } = useDashboardRecentTransactions();
  const loading = isLoading || isQueryLoading;

  if (isError) {
    return (
      <Card variant="default" className="h-full relative overflow-hidden border-danger/20 bg-danger/5 select-none">
        <div className="p-6 pb-3 flex items-center justify-between relative z-10 border-b border-border/40 text-danger">
          <h3 className="text-base font-bold text-white tracking-tight">
            Recent Activity
          </h3>
          <span className="text-[9px] font-bold text-danger/80 uppercase tracking-widest block mt-0.5">
            Failed to load
          </span>
        </div>
        <div className="p-6 h-56 flex items-center justify-center">
          <span className="text-xs font-bold text-slate-400 text-center">
            Failed to load recent ledger activities.
          </span>
        </div>
      </Card>
    );
  }

  // Handle empty state
  const hasTransactions = data && data.length > 0;
  const activities = hasTransactions ? data.slice(0, 2) : [];

  const getIcon = (type: string, category: string) => {
    if (type === 'income') {
      return <Landmark className="w-5 h-5 text-accent-mint" />;
    }
    if (category.toLowerCase().includes('infrastructure') || category.toLowerCase().includes('cloud') || category.toLowerCase().includes('hosting')) {
      return <Cloud className="w-5 h-5 text-accent-pink" />;
    }
    return <CreditCard className="w-5 h-5 text-accent-cyan" />;
  };

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
        {loading ? (
          <div className="space-y-4">
            <Skeleton variant="rect" className="h-14" />
            <Skeleton variant="rect" className="h-14" />
          </div>
        ) : !hasTransactions && data ? (
          <div className="h-44 flex flex-col items-center justify-center gap-3">
            <span className="text-xs text-slate-400 font-medium">No ledger transactions posted yet.</span>
            <Link href="/dashboard/transactions" className="text-xs font-black text-accent-cyan hover:underline uppercase tracking-widest">
              Add Transaction &rarr;
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((act) => {
              const formattedVal = act.amount > 0 
                ? `+${formatCurrency(act.amount)}`
                : `-${formatCurrency(Math.abs(act.amount))}`;
              
              const isIncome = act.amount > 0;

              return (
                <div key={act.id} className="flex items-center justify-between gap-4 p-2.5 rounded-xl hover:bg-white/3 transition-colors duration-200">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
                      {getIcon(act.type, act.category)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">
                        {act.source}
                      </h4>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {formatDate(act.date)} • {act.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-1">
                    <span className={`text-sm font-extrabold ${isIncome ? 'text-accent-mint' : 'text-white'}`}>
                      {formattedVal}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase ${
                      isIncome 
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                        : 'bg-white/5 border border-white/10 text-slate-400'
                    }`}>
                      {act.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
