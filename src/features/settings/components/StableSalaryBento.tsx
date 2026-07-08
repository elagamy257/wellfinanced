'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { Shield, Sparkles, Clock, Calculator, CheckCircle } from 'lucide-react';
import { initialStableSalaryData, mockIncomeBaselineBars } from '../mocks/mocks';

export function StableSalaryBento() {
  const salary = initialStableSalaryData;

  const handleUpdatePayout = () => {
    alert('Payout settings updated!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 select-none">
      
      {/* LEFT COLUMN */}
      <div className="space-y-6 md:space-y-8">
        
        {/* Recommended Monthly Payout Card */}
        <Card variant="default" className="p-6 bg-[#0c1328]/50 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between h-56">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              RECOMMENDED MONTHLY PAYOUT
            </span>
            <div className="flex items-baseline pt-1">
              <span className="text-4xl font-black text-white tracking-tighter">
                ${salary.recommendedPayout.toLocaleString()}
              </span>
              <span className="text-lg font-black text-[#8BFF7D]">.00</span>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] text-[#8BFF7D] font-bold pt-1.5">
              <CheckCircle className="w-3.5 h-3.5 fill-[#8BFF7D]/10 shrink-0" />
              <span>Optimized for long-term stability</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleUpdatePayout}
            className="w-full h-11 text-xs font-black uppercase tracking-wider text-black bg-[#8BFF7D] rounded-xl hover:brightness-110 shadow-[0_4px_15px_rgba(139,255,125,0.15)] transition-all cursor-pointer select-none"
          >
            Update Payout
          </button>
        </Card>

        {/* Safety Buffer Card */}
        <Card variant="default" className="p-6 bg-[#0c1328]/50 border border-white/5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-accent-cyan shrink-0" />
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                Safety Buffer
              </h4>
            </div>
            <span className="text-xs font-black text-accent-cyan tracking-wider">
              {salary.safetyBufferPercent}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
            <div 
              className="absolute left-0 top-0 h-full bg-accent-cyan rounded-full shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              style={{ width: `${salary.safetyBufferPercent}%` }}
            />
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
            Allocating <span className="text-white font-bold">${salary.safetyBufferAmount}</span> monthly to your &quot;Dry Season&quot; reserve. This ensures {salary.drySeasonReserveMonths} months of stability if income drops to zero.
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
            <p className="text-[10px] text-slate-300 leading-relaxed font-semibold">
              Your current &quot;Burn Rate&quot; is ${salary.burnRate.toLocaleString()}. Setting your salary to ${salary.recommendedPayout.toLocaleString()} leaves you with a healthy surplus of <span className="text-[#8BFF7D] font-bold">${salary.predictedSurplus.toLocaleString()}</span> for reinvestment and personal growth.
            </p>
          </div>
        </Card>

      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6 md:space-y-8">
        
        {/* Income Baseline Card */}
        <Card variant="default" className="p-6 bg-[#0c1328]/50 border border-white/5 shadow-2xl space-y-4">
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
                      ? 'bg-[#8BFF7D] shadow-[0_0_10px_rgba(139,255,125,0.3)]' 
                      : 'bg-white/5 hover:bg-white/8 border border-white/5'
                  }`}
                  style={{ height: `${bar.height}%`, minHeight: '15%' }}
                />
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-400 font-semibold text-center sm:text-left">
            Based on your 12-month average of <span className="text-white font-bold">${salary.grossAverage.toLocaleString()}</span>.
          </p>
        </Card>

        {/* Salary Calculation Card */}
        <Card variant="default" className="p-6 bg-[#0c1328]/50 border border-white/5 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <Calculator className="w-4.5 h-4.5 text-accent-cyan shrink-0" />
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Salary Calculation
            </h4>
          </div>

          <div className="space-y-3 text-[11px] font-bold text-slate-300">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-400">Gross Monthly Average</span>
              <span className="font-black text-white">${salary.grossAverage.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-400">Safety Buffer (15%)</span>
              <span className="font-black text-accent-pink">-${salary.safetyBufferAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </Card>

        {/* Target Net Salary Card */}
        <Card variant="default" className="p-6 bg-[#0c1328]/50 border border-white/5 shadow-2xl flex items-center justify-between h-18">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5 text-[#8BFF7D] fill-[#8BFF7D]/10 shrink-0" />
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Target Net Salary
            </h4>
          </div>
          <span className="text-2xl font-black text-[#8BFF7D] tracking-tight">
            ${salary.targetNetSalary.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </Card>

        {/* Stability Score Card */}
        <Card variant="default" className="p-6 bg-[#0c1328]/50 border border-white/5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Stability Score
            </h4>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-black text-[#8BFF7D]">{salary.stabilityScore}</span>
              <span className="text-[10px] text-slate-500 font-bold">/100</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
            <div 
              className="absolute left-0 top-0 h-full bg-[#8BFF7D] rounded-full shadow-[0_0_8px_rgba(139,255,125,0.4)]"
              style={{ width: `${salary.stabilityScore}%` }}
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
