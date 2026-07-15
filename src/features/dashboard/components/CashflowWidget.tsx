import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { AlertCircle, BarChart3 } from 'lucide-react';
import { useDashboardSnapshot } from '../hooks/useDashboardSnapshot';
import { formatCurrency } from '@/utils';

interface WidgetProps {
  isLoading?: boolean;
}

export function CashflowWidget({ isLoading = false }: WidgetProps) {
  const { data, isLoading: isQueryLoading, isError } = useDashboardSnapshot();
  const loading = isLoading || isQueryLoading;

  if (isError) {
    return (
      <Card variant="default" className="h-full relative overflow-hidden border-danger/20 bg-danger/5 select-none">
        <div className="p-6 pb-2 flex items-center justify-between gap-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center text-danger">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-danger/80 uppercase tracking-widest block">
                Net Cashflow Balance
              </span>
              <span className="text-xs font-bold text-slate-400 mt-0.5 block">
                Failed to load snapshot
              </span>
            </div>
          </div>
        </div>
        <div className="p-6 h-[240px] flex items-center justify-center">
          <span className="text-xs font-bold text-slate-400 text-center">
            Failed to load balance snapshot.
          </span>
        </div>
      </Card>
    );
  }

  // Use actual data if available, do not fallback to mock.
  const netWorthFormatted = formatCurrency(data?.net_worth ?? 0);

  return (
    <Card variant="default" className="h-full relative overflow-hidden group">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent-mint/5 rounded-full blur-[90px] group-hover:bg-accent-mint/8 transition-colors duration-700 pointer-events-none" />

      {/* Card Header Content */}
      <div className="p-6 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10 select-none">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Net Cashflow Balance
          </span>
          <div className="flex items-baseline gap-2.5">
            {loading ? (
              <Skeleton variant="text" className="w-40 h-8 mt-1" />
            ) : (
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {netWorthFormatted}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Chart Content Area (Empty State due to missing backend timeseries data) */}
      <div className="p-6 pt-2 h-[240px] relative z-10">
        {loading ? (
          <div className="h-full flex flex-col justify-end space-y-4">
            <Skeleton variant="text" className="w-1/4 h-6" />
            <Skeleton variant="rect" className="h-44" />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 border border-white/5 rounded-xl border-dashed">
            <BarChart3 className="w-8 h-8 text-slate-500 mb-3" />
            <p className="text-sm font-medium text-slate-400">No historical data available</p>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px] text-center">Connect timeseries endpoint to view cashflow trends over time.</p>
          </div>
        )}
      </div>
    </Card>
  );
}
