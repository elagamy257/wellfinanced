'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { Skeleton } from '@/components/ui';
import { Shield, Sparkles, Clock, Calculator, CheckCircle } from 'lucide-react';
import { mockIncomeBaselineBars } from '../mocks/mocks';
import { SmoothedSalaryConfig } from '../types';

interface StableSalaryBentoProps {
  salary?: SmoothedSalaryConfig;
  isLoading?: boolean;
  isAccepting?: boolean;
  onAccept?: (overrideAmount: number) => void;
}

export function StableSalaryBento({ salary, isLoading, isAccepting, onAccept }: StableSalaryBentoProps) {
  const [overrideAmount, setOverrideAmount] = useState<string>('');

  const handleUpdatePayout = () => {
    if (onAccept && salary?.recommended_payout) {
      onAccept(overrideAmount ? Number(overrideAmount) : salary.recommended_payout);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 select-none">
      
      {/* LEFT COLUMN */}
      <div className="space-y-6 md:space-y-8">
        
        {/* Recommended Monthly Payout Card */}
        <Card variant="default" className="p-6 bg-bg-3/50 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between h-56">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              RECOMMENDED MONTHLY PAYOUT
            </span>
            <div className="flex items-baseline pt-1">
              {isLoading ? (
                <Skeleton variant="text" className="w-32 h-10" />
              ) : (
                <>
                  <span className="text-4xl font-black text-white tracking-tighter">
                    ${(salary?.recommended_payout ?? 0).toLocaleString()}
                  </span>
                  <span className="text-lg font-black text-success">.00</span>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] text-success font-bold pt-1.5">
              <CheckCircle className="w-3.5 h-3.5 fill-success/10 shrink-0" />
              <span>Optimized for long-term stability</span>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="number"
              placeholder="Override amount (optional)"
              value={overrideAmount}
              onChange={(e) => setOverrideAmount(e.target.value)}
              className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-white/30 focus:outline-none focus:border-primary/50"
            />
            <button
              type="button"
              onClick={handleUpdatePayout}
              disabled={isAccepting || isLoading}
              className="w-full h-11 text-xs font-black uppercase tracking-wider text-black bg-success rounded-xl hover:brightness-110 shadow-glow transition-all cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAccepting ? 'Updating...' : 'Update Payout'}
            </button>
          </div>
        </Card>

        {/* Safety Buffer Card */}
        <Card variant="default" className="p-6 bg-bg-3/50 border border-white/5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-accent-cyan shrink-0" />
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                Safety Buffer
              </h4>
            </div>
            {isLoading ? (
              <Skeleton variant="text" className="w-8 h-4" />
            ) : (
              <span className="text-xs font-black text-accent-cyan tracking-wider">
                {salary?.safety_buffer_percent ?? 0}%
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
            <div 
              className="absolute left-0 top-0 h-full bg-accent-cyan rounded-full shadow-glow transition-all duration-1000"
              style={{ width: `${salary?.safety_buffer_percent ?? 0}%` }}
            />
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
            Allocating <span className="text-white font-bold">${salary?.safety_buffer_amount ?? 0}</span> monthly to your &quot;Dry Season&quot; reserve. This ensures {salary?.dry_season_reserve_months ?? 0} months of stability if income drops to zero.
          </p>
        </Card>

        {/* AI Insight Card */}
        <Card variant="default" className="p-6 bg-primary/5 border border-primary/10 shadow-2xl flex items-start gap-3.5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/3 rounded-full blur-xl pointer-events-none" />
          <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5 animate-pulse" />
          <div className="space-y-1">
            <h4 className="text-[10px] font-black text-primary uppercase tracking-widest">
              AI Insight
            </h4>
            {isLoading ? (
              <div className="space-y-1.5 pt-1">
                <Skeleton variant="text" className="w-full h-3" />
                <Skeleton variant="text" className="w-3/4 h-3" />
              </div>
            ) : (
              <p className="text-[10px] text-slate-300 leading-relaxed font-semibold">
                Your current &quot;Burn Rate&quot; is ${(salary?.burn_rate ?? 0).toLocaleString()}. Setting your salary to ${(salary?.recommended_payout ?? 0).toLocaleString()} leaves you with a healthy surplus of <span className="text-success font-bold">${(salary?.predicted_surplus ?? 0).toLocaleString()}</span> for reinvestment and personal growth.
              </p>
            )}
          </div>
        </Card>

      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6 md:space-y-8">
        
        {/* Income Baseline Card */}
        <Card variant="default" className="p-6 bg-bg-3/50 border border-white/5 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4.5 h-4.5 text-primary shrink-0" />
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Income Baseline
            </h4>
          </div>

          {/* Mini Bar Chart */}
          <div className="flex items-end justify-between h-20 px-2 pt-2">
            {mockIncomeBaselineBars.map((bar, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center flex-1 gap-1"
              >
                <div 
                  className={`w-7 rounded-md transition-all shadow-sm ${
                    bar.active 
                      ? 'bg-success shadow-glow' 
                      : 'bg-white/5 hover:bg-white/8 border border-white/5'
                  }`}
                  style={{ height: `${bar.height}%`, minHeight: '15%' }}
                />
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-400 font-semibold text-center sm:text-left">
            Based on your 12-month average of <span className="text-white font-bold">${(salary?.gross_average ?? 0).toLocaleString()}</span>.
          </p>
        </Card>

        {/* Salary Calculation Card */}
        <Card variant="default" className="p-6 bg-bg-3/50 border border-white/5 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Calculator className="w-4.5 h-4.5 text-accent-cyan shrink-0" />
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Salary Calculation
            </h4>
          </div>

          <div className="space-y-3 text-[11px] font-bold text-slate-300">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-400">Gross Monthly Average</span>
              {isLoading ? (
                <Skeleton variant="text" className="w-16 h-4" />
              ) : (
                <span className="font-black text-white">${(salary?.gross_average ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-400">Safety Buffer ({salary?.safety_buffer_percent ?? 0}%)</span>
              {isLoading ? (
                <Skeleton variant="text" className="w-16 h-4" />
              ) : (
                <span className="font-black text-accent-pink">-${(salary?.safety_buffer_amount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              )}
            </div>
          </div>
        </Card>

        {/* Target Net Salary Card */}
        <Card variant="default" className="p-6 bg-bg-3/50 border border-white/5 shadow-2xl flex items-center justify-between h-18">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5 text-success fill-success/10 shrink-0" />
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Target Net Salary
            </h4>
          </div>
          {isLoading ? (
            <Skeleton variant="text" className="w-24 h-8" />
          ) : (
            <span className="text-2xl font-black text-success tracking-tight">
              ${(salary?.target_net_salary ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          )}
        </Card>

        {/* Stability Score Card */}
        <Card variant="default" className="p-6 bg-bg-3/50 border border-white/5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Stability Score
            </h4>
            <div className="flex items-baseline gap-0.5">
              {isLoading ? (
                <Skeleton variant="text" className="w-12 h-8" />
              ) : (
                <>
                  <span className="text-2xl font-black text-success">{salary?.stability_score ?? 0}</span>
                  <span className="text-[10px] text-slate-500 font-bold">/100</span>
                </>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
            <div 
              className="absolute left-0 top-0 h-full bg-success rounded-full shadow-glow transition-all duration-1000"
              style={{ width: `${salary?.stability_score ?? 0}%` }}
            />
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
            Top 5% of freelancers. Your current configuration is highly resilient to market fluctuations.
          </p>
        </Card>

      </div>

    </div>
  );
}
