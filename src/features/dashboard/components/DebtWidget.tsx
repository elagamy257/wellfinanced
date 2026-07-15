import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { CreditCard, AlertCircle } from 'lucide-react';
import { useDebtSummary } from '../hooks/useDebtSummary';
import { formatCurrencyNoDecimals } from '@/utils';

interface WidgetProps {
  isLoading?: boolean;
}

export function DebtWidget({ isLoading = false }: WidgetProps) {
  const { data, isLoading: isQueryLoading, isError } = useDebtSummary();
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
              Total Debt
            </span>
            <span className="text-xs font-bold text-slate-400 mt-0.5 block">
              Failed to load summary
            </span>
          </div>
        </div>
      </Card>
    );
  }

  // Read total_debt or fallback to 0
  const totalDebt = data?.total_debt ?? 0;

  return (
    <Card variant="default" className="h-full relative overflow-hidden group">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent-cyan/3 rounded-full blur-[90px] group-hover:bg-accent-cyan/5 transition-colors duration-700 pointer-events-none" />

      <div className="p-6 flex items-center gap-5 relative z-10 select-none">
        {/* Icon Frame */}
        <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/15 flex items-center justify-center text-accent-cyan shadow-[0_0_15px_rgba(6,182,212,0.15)] shrink-0">
          <CreditCard className="w-5 h-5" />
        </div>

        {/* Text Details */}
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Total Debt
          </span>
          {loading ? (
            <Skeleton variant="text" className="w-2/3 h-7 mt-1" />
          ) : (
            <span className="text-2xl font-extrabold text-white tracking-tight mt-0.5 block">
              {formatCurrencyNoDecimals(totalDebt)}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
