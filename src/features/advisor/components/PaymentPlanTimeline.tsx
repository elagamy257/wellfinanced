'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { Calendar, ChevronRight } from 'lucide-react';
import { PaymentPlanTimelineItem } from '../types';

interface PaymentPlanTimelineProps {
  timeline: PaymentPlanTimelineItem[];
}

export function PaymentPlanTimeline({ timeline }: PaymentPlanTimelineProps) {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="text-center py-10 border border-white/5 bg-bg-1/20 rounded-2xl select-none">
        <Calendar className="w-10 h-10 text-slate-500 mx-auto mb-3" />
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">No active timeline data</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block px-1">
        Chronological Payoff Timeline
      </span>
      
      <div className="relative border-l-2 border-white/5 pl-6 ml-4 space-y-6">
        {timeline.map((item) => (
          <div key={item.month_num} className="relative select-none group">
            {/* Timeline node dot */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-bg-3 border-2 border-primary group-hover:border-success transition-colors shadow-glow" />
            
            <Card variant="default" className="p-4 bg-bg-3/45 border border-white/5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black text-white block">
                  {item.date} (Month {item.month_num})
                </span>
                <div className="mt-2 space-y-1">
                  {Array.isArray(item.payments) && item.payments.map((pay, pIdx) => {
                    const amountVal = typeof pay?.amount === 'number' ? pay.amount.toFixed(2) : '0.00';
                    const remainingVal = typeof pay?.remaining === 'number' ? pay.remaining.toFixed(2) : '0.00';
                    const debtLabel = pay?.debt || 'Debt';
                    return (
                      <div key={pIdx} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <ChevronRight className="w-3.5 h-3.5 text-success shrink-0" />
                        <span>
                          Pay <span className="text-white">${amountVal}</span> to <span className="text-white">{debtLabel}</span>
                          <span className="text-[9px] text-slate-500"> (Remaining: ${remainingVal})</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="sm:text-right border-t sm:border-t-0 border-white/5 pt-2.5 sm:pt-0">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Monthly Outflow</span>
                <span className="text-xs font-black text-white">
                  ${typeof item.total_payment === 'number' ? item.total_payment.toFixed(2) : '0.00'}
                </span>
                <span className="text-[9px] font-black text-slate-400 block mt-0.5">
                  Paid: ${typeof item.cumulative_paid === 'number' ? item.cumulative_paid.toFixed(2) : '0.00'}
                </span>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
