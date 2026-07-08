'use client';

import React from 'react';
import { Card, Badge, Button } from '@/components/ui';
import { Sparkles, Landmark, Percent, Award } from 'lucide-react';
import { mockSmartSalaryMetrics } from '../mocks';

export function SmartSalaryWidget() {
  const { 
    smartSalaryValue, 
    statusText, 
    descriptionText, 
    emergencyFundValue, 
    safetyMarginValue 
  } = mockSmartSalaryMetrics;

  return (
    <Card variant="default" className="h-full relative overflow-hidden group select-none border-t-2 border-primary/20">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/4 rounded-full blur-[90px] pointer-events-none" />

      <div className="p-6 space-y-6 relative z-10 flex flex-col justify-between h-full">
        {/* Title & Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <h4 className="text-xs font-black text-white uppercase tracking-widest">
              Smart Salary
            </h4>
          </div>
          <Badge variant="mint" className="font-bold text-[9px] uppercase tracking-wider">
            {statusText}
          </Badge>
        </div>

        {/* Value and Description */}
        <div className="space-y-3">
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
              Recommended Monthly Payout
            </span>
            <span className="text-4xl font-black text-white tracking-tighter block pt-1">
              ${smartSalaryValue.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {descriptionText}
          </p>
        </div>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-5">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider  flex items-center gap-1">
              <Landmark className="w-3.5 h-3.5 text-slate-500" />
              Emergency Fund
            </span>
            <span className="text-base font-extrabold text-white">
              ${emergencyFundValue.toLocaleString()}
            </span>
          </div>
          
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider  flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-slate-500" />
              Safety Margin
            </span>
            <span className="text-base font-extrabold text-white">
              {safetyMarginValue}%
            </span>
          </div>
        </div>

        {/* Apply CTA Button */}
        <Button 
          variant="primary" 
          className="w-full mt-4 flex items-center justify-center gap-2 h-11 text-xs uppercase tracking-wider font-black"
        >
          <Sparkles className="w-4 h-4 fill-white" />
          <span>Apply Smart Budgeting</span>
        </Button>
      </div>
    </Card>
  );
}
