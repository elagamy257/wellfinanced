import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { TrendingDown, AlertCircle } from 'lucide-react';
import { useExpenseStats } from '../hooks/useExpenseStats';
import { formatCurrencyNoDecimals } from '@/utils';

interface WidgetProps {
  isLoading?: boolean;
}

export function ExpenseWidget({ isLoading = false }: WidgetProps) {
  const { data, isLoading: isQueryLoading, isError } = useExpenseStats();
  const loading = isLoading || isQueryLoading;

  if (isError) {
    return (
      <Card variant="default" className="h-full relative overflow-hidden border-danger/20 bg-danger/5 select-none">
        <div className="p-6 flex items-center gap-4 relative z-10 text-danger">
          <div className="w-10 h-10 rounded-xl bg-danger/10 border border-danger/15 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-danger/80 uppercase tracking-widest block">
              Monthly Expenses
            </span>
            <span className="text-xs font-bold text-slate-400 mt-0.5 block">
              Failed to load stats
            </span>
          </div>
        </div>
      </Card>
    );
  }

  // Read monthly_average or fallback to mock
  const monthlyAverage = data?.monthly_average !== undefined ? data.monthly_average : 3120;

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
          {loading ? (
            <Skeleton variant="text" className="w-2/3 h-7 mt-1" />
          ) : (
            <span className="text-2xl font-extrabold text-white tracking-tight mt-0.5 block">
              {formatCurrencyNoDecimals(monthlyAverage)}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
