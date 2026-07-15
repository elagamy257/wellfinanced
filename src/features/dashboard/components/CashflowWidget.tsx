import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, AlertCircle } from 'lucide-react';
import { useDashboardSnapshot } from '../hooks/useDashboardSnapshot';
import { formatCurrency, formatCompactNumber } from '@/utils';

interface WidgetProps {
  isLoading?: boolean;
}


export function CashflowWidget({ isLoading = false }: WidgetProps) {
  const [period, setPeriod] = useState<'1M' | '3M' | '1Y'>('3M');
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

  // Retrieve net worth or fallback to mock
  const netWorth = data?.net_worth !== undefined ? data.net_worth : 12842.50;
  const netWorthFormatted = formatCurrency(netWorth);
  const netWorthK = formatCompactNumber(netWorth).toLowerCase();

  // History not provided by snapshot backend
  const chartData: any[] = [];

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
              <>
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {netWorthFormatted}
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-accent-mint/10 text-accent-mint text-[10px] font-bold border border-accent-mint/15">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+12.4%</span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Period Switching Tabs */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 self-start sm:self-center">
          {(['1M', '3M', '1Y'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                period === p
                  ? 'bg-accent-mint/15 text-accent-mint border border-accent-mint/20 shadow-md'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Content Area */}
      <div className="p-6 pt-2 h-[240px] relative z-10">
        {loading ? (
          <div className="h-full flex flex-col justify-end space-y-4">
            <Skeleton variant="text" className="w-1/4 h-6" />
            <Skeleton variant="rect" className="h-44" />
          </div>
        ) : (
          <div className="w-full h-full relative flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl bg-white/5">
            <div className="text-center p-4">
              <span className="text-sm font-bold text-slate-400 block mb-1">
                No Historical Data
              </span>
              <span className="text-xs text-slate-500 max-w-[200px] mx-auto block">
                Cashflow history is not yet available from the backend snapshot.
              </span>
            </div>
            {/* Static overlay tooltip for the current node */}
            <div className="absolute right-6 top-6 px-2.5 py-1 rounded-lg bg-accent-mint text-background text-[10px] font-black uppercase tracking-wider shadow-glow pointer-events-none">
              Current: ${netWorthK}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
