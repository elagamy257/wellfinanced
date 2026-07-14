'use client';

import React from 'react';
import { Card, Badge, Button, Skeleton } from '@/components/ui';
import { Sparkles, Landmark, Percent, Award, Loader2 } from 'lucide-react';
import type { AnalyticsSalaryWidgetModel } from '../types';

export interface SmartSalaryWidgetProps {
  data: AnalyticsSalaryWidgetModel | null;
  isLoading: boolean;
  isError: boolean;
  isGenerating: boolean;
  onGenerateForecast: () => void;
}

export function SmartSalaryWidget({
  data,
  isLoading,
  isError,
  isGenerating,
  onGenerateForecast,
}: SmartSalaryWidgetProps) {
  const isPending = isLoading || isGenerating;

  return (
    <Card
      variant="default"
      className="h-full relative overflow-hidden group select-none border-t-2 border-primary/20"
    >
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
          {isPending ? (
            <Skeleton variant="text" className="w-16 h-5 rounded-full" />
          ) : (
            <Badge
              variant={
                data?.statusText === 'Surplus'
                  ? 'mint'
                  : data?.statusText === 'Deficit'
                  ? 'purple'
                  : 'mint'
              }
              className="font-bold text-[9px] uppercase tracking-wider"
            >
              {isError ? 'Unavailable' : (data?.statusText ?? 'Stable')}
            </Badge>
          )}
        </div>

        {/* Value and Description */}
        <div className="space-y-3">
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
              Recommended Monthly Payout
            </span>
            {isPending ? (
              <Skeleton variant="text" className="w-32 h-10 mt-1 rounded-lg" />
            ) : isError ? (
              <span className="text-4xl font-black text-slate-500 tracking-tighter block pt-1">
                —
              </span>
            ) : (
              <span className="text-4xl font-black text-white tracking-tighter block pt-1">
                ${(data?.smartSalaryValue ?? 0).toLocaleString()}
              </span>
            )}
          </div>
          {isPending ? (
            <div className="space-y-1.5">
              <Skeleton variant="text" className="w-full h-3 rounded" />
              <Skeleton variant="text" className="w-3/4 h-3 rounded" />
            </div>
          ) : (
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              {isError
                ? 'Unable to load salary data. Please try generating a forecast.'
                : (data?.descriptionText ?? '')}
            </p>
          )}
        </div>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-5">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Landmark className="w-3.5 h-3.5 text-slate-500" />
              Emergency Fund
            </span>
            {isPending ? (
              <Skeleton variant="text" className="w-20 h-5 rounded" />
            ) : (
              <span className="text-base font-extrabold text-white">
                {isError ? '—' : `$${(data?.emergencyFundValue ?? 0).toLocaleString()}`}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Percent className="w-3.5 h-3.5 text-slate-500" />
              Safety Margin
            </span>
            {isPending ? (
              <Skeleton variant="text" className="w-16 h-5 rounded" />
            ) : (
              <span className="text-base font-extrabold text-white">
                {isError ? '—' : `${data?.safetyMarginValue ?? 0}%`}
              </span>
            )}
          </div>
        </div>

        {/* Generate Forecast CTA */}
        <Button
          variant="primary"
          onClick={onGenerateForecast}
          disabled={isGenerating}
          className="w-full mt-4 flex items-center justify-center gap-2 h-11 text-xs uppercase tracking-wider font-black"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4 fill-white" />
          )}
          <span>{isGenerating ? 'Generating...' : 'Apply Smart Budgeting'}</span>
        </Button>
      </div>
    </Card>
  );
}
