import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Target, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useDashboardSavings } from '../hooks/useDashboardSavings';
import { formatCurrency, formatCurrencyNoDecimals } from '@/utils';

interface WidgetProps {
  isLoading?: boolean;
}

export function GoalsWidget({ isLoading = false }: WidgetProps) {
  const { data, isLoading: isQueryLoading, isError } = useDashboardSavings();
  const loading = isLoading || isQueryLoading;

  if (isError) {
    return (
      <Card variant="default" className="h-[185px] relative overflow-hidden select-none border-danger/20 bg-danger/5">
        <div className="p-6 h-full flex flex-col justify-between relative z-10 text-danger">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-danger/10 border border-danger/15 flex items-center justify-center text-danger">
              <AlertCircle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Savings Goals
            </h3>
          </div>
          <div className="text-xs font-bold text-slate-400 py-2">
            Failed to load savings goal progress.
          </div>
        </div>
      </Card>
    );
  }

  const hasGoals = Array.isArray(data) && data.length > 0;
  const firstGoal = hasGoals ? data[0] : null;

  return (
    <Card variant="default" className="h-[185px] relative overflow-hidden group">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent-cyan/3 rounded-full blur-[90px] group-hover:bg-accent-cyan/5 transition-colors duration-700 pointer-events-none" />

      {/* Content wrapper */}
      <div className="p-6 h-full flex flex-col justify-between relative z-10 select-none">
        
        {/* Header: Title and Target */}
        {loading ? (
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
                {firstGoal ? `Goal: ${firstGoal.goal_name}` : 'Savings Goals'}
              </h3>
            </div>
            {!hasGoals ? (
              <span className="text-[9px] font-bold text-slate-500 uppercase mt-1">Inactive</span>
            ) : (
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                {formatCurrencyNoDecimals(firstGoal?.target_amount || 0)} Target
              </span>
            )}
          </div>
        )}

        {/* Middle: Progress Bar */}
        {loading ? (
          <Skeleton variant="text" className="w-full h-3 rounded-full" />
        ) : !hasGoals ? (
          <span className="text-xs text-slate-400 py-1 font-medium">No savings goals created yet.</span>
        ) : (
          <div className="space-y-1.5 py-1">
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="absolute left-0 top-0 h-full bg-accent-cyan rounded-full shadow-[0_0_12px_rgba(6,182,212,0.45)]"
                style={{ width: `${Math.min(firstGoal!.target_amount > 0 ? Math.round((firstGoal!.saved_amount / firstGoal!.target_amount) * 100) : 0, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer: Amount Saved and Percentage Achieved */}
        {loading ? (
          <div className="flex justify-between items-end">
            <Skeleton variant="text" className="w-1/4 h-4" />
            <Skeleton variant="text" className="w-10 h-4" />
          </div>
        ) : !hasGoals ? (
          <Link href="/dashboard/goals" className="text-xs font-black text-accent-cyan hover:underline uppercase tracking-wider">
            Create Goal &rarr;
          </Link>
        ) : (
          <div className="flex justify-between items-center text-xs">
            <span className="font-extrabold text-accent-cyan">
              {formatCurrency(firstGoal?.saved_amount || 0)} saved
            </span>
            <span className="font-bold text-slate-400">
              {firstGoal!.target_amount > 0 ? Math.round((firstGoal!.saved_amount / firstGoal!.target_amount) * 100) : 0}% achieved
            </span>
          </div>
        )}

      </div>
    </Card>
  );
}
