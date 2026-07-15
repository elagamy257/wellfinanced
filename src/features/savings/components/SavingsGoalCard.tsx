'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { Target, Calendar, ArrowUpRight, Trash2 } from 'lucide-react';
import { DashboardSavingsGoal } from '@/features/dashboard/types';

interface SavingsGoalCardProps {
  goal: DashboardSavingsGoal;
  onDelete?: (id: string) => void;
}

export function SavingsGoalCard({ goal, onDelete }: SavingsGoalCardProps) {
  const { id, goal_name, target_amount, saved_amount } = goal;

  const percentage = target_amount > 0 ? Math.round((saved_amount / target_amount) * 100) : 0;
  const clampedPercentage = Math.min(percentage, 100);

  // Determine theme colors based on progress or goal type
  const isHighProgress = clampedPercentage >= 80;
  const glowColor = isHighProgress ? 'shadow-[0_0_12px_rgba(16,185,129,0.45)]' : 'shadow-[0_0_12px_rgba(6,182,212,0.45)]';
  const barColor = isHighProgress ? 'bg-success' : 'bg-accent-cyan';
  const textColor = isHighProgress ? 'text-success' : 'text-accent-cyan';

  return (
    <Card variant="default" className="relative overflow-hidden group select-none">
      {/* Background glow decoration */}
      <div className={`absolute -top-24 -right-24 w-72 h-72 ${isHighProgress ? 'bg-success/3' : 'bg-accent-cyan/3'} rounded-full blur-[90px] group-hover:opacity-100 transition-opacity pointer-events-none`} />

      <div className="p-6 space-y-6 relative z-10">
        
        {/* Top: Icon, Title, and Target */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${textColor} shadow-sm shrink-0`}>
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white tracking-tight">{goal_name}</h4>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
                Target: ${target_amount.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-lg font-black tracking-tighter ${textColor}`}>
              {clampedPercentage}%
            </span>
            {onDelete && (
              <button
                onClick={() => onDelete(id)}
                className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-accent-pink transition-colors cursor-pointer shrink-0"
                title="Delete Goal"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Middle: Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
            <div 
              className={`absolute left-0 top-0 h-full ${barColor} ${glowColor} rounded-full transition-all duration-500`}
              style={{ width: `${clampedPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-[10px] font-bold tracking-wide uppercase text-slate-400">
            <span>${saved_amount.toLocaleString()} saved</span>
            <span>
              ${Math.max(target_amount - saved_amount, 0).toLocaleString()} remaining
            </span>
          </div>
        </div>

        {/* Bottom: Empty ETA for now as not in backend */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500 opacity-50" />
            <span className="opacity-50">TBD</span>
          </div>
          <span className="inline-flex items-center gap-0.5 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <span>Details</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>

      </div>
    </Card>
  );
}
