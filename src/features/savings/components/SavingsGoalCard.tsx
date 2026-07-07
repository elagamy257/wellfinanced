'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { Target, Calendar, ArrowUpRight } from 'lucide-react';
import { SavingsGoal } from '../mocks';

interface SavingsGoalCardProps {
  goal: SavingsGoal;
}

export function SavingsGoalCard({ goal }: SavingsGoalCardProps) {
  const { name, target, saved, percentage, eta, timeLeftText } = goal;

  // Determine theme colors based on progress or goal type
  const isHighProgress = percentage >= 80;
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
              <h4 className="text-sm font-extrabold text-white tracking-tight">{name}</h4>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
                Target: ${target.toLocaleString()}
              </span>
            </div>
          </div>
          <span className={`text-lg font-black tracking-tighter ${textColor}`}>
            {percentage}%
          </span>
        </div>

        {/* Middle: Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
            <div 
              className={`absolute left-0 top-0 h-full ${barColor} ${glowColor} rounded-full transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <div className="flex justify-between items-center text-[10px] font-bold tracking-wide uppercase text-slate-400">
            <span>${saved.toLocaleString()} saved</span>
            <span>
              {timeLeftText ? timeLeftText : `$${(target - saved).toLocaleString()} remaining`}
            </span>
          </div>
        </div>

        {/* Bottom: ETA / Time Limit */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{eta}</span>
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
