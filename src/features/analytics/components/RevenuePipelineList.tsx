'use client';

import React from 'react';
import { Card, Badge } from '@/components/ui';
import { Globe, Palette, Box, ArrowRight } from 'lucide-react';
import { mockPipelineOpportunities } from '../mocks';

export function RevenuePipelineList() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'palette':
        return <Palette className="w-5 h-5 text-accent-pink" />;
      case 'view_in_ar':
        return <Box className="w-5 h-5 text-primary" />;
      case 'web':
      default:
        return <Globe className="w-5 h-5 text-accent-cyan" />;
    }
  };

  const getIconContainerClass = (iconName: string) => {
    switch (iconName) {
      case 'palette':
        return 'bg-accent-pink/10 border border-accent-pink/15';
      case 'view_in_ar':
        return 'bg-primary/10 border border-primary/15';
      case 'web':
      default:
        return 'bg-accent-cyan/10 border border-accent-cyan/15';
    }
  };

  return (
    <Card variant="default" className="h-full relative overflow-hidden group select-none">
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/1 rounded-full blur-[90px] pointer-events-none" />

      {/* Header */}
      <div className="p-6 pb-3 flex items-center justify-between border-b border-white/5 relative z-10">
        <h3 className="text-base font-extrabold text-white tracking-tight">
          Revenue Pipeline
        </h3>
        <button className="text-[10px] font-black text-accent-cyan uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer">
          <span>View All Opportunities</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* List content */}
      <div className="p-6 relative z-10 space-y-4">
        {mockPipelineOpportunities.map((op) => (
          <div 
            key={op.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl hover:bg-white/2 border border-transparent hover:border-white/5 transition-all duration-150"
          >
            {/* Left: Icon and Project Details */}
            <div className="flex items-center gap-4 min-w-0">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${getIconContainerClass(op.iconName)}`}>
                {getIcon(op.iconName)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-extrabold text-white truncate">{op.project}</h4>
                  <Badge 
                    variant={op.status === 'ACTIVE' ? 'mint' : 'purple'}
                    className="font-bold text-[8px] tracking-widest uppercase shrink-0 py-0 h-4 flex items-center"
                  >
                    {op.status}
                  </Badge>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate mt-0.5">
                  {op.client}
                </p>
              </div>
            </div>

            {/* Right: Value & Progress */}
            <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 sm:text-right">
              {/* Progress Slider (only for items with progress percentage) */}
              {op.progressPercentage !== undefined && (
                <div className="w-24 hidden md:block space-y-1 select-none">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                    <div 
                      className="absolute left-0 top-0 h-full bg-success rounded-full shadow-glow"
                      style={{ width: `${op.progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">
                    {op.progressText}
                  </span>
                </div>
              )}

              {/* Progress Text (for AI Predicted items) */}
              {op.progressPercentage === undefined && (
                <span className="text-[9px] font-black text-primary uppercase tracking-widest hidden md:block">
                  {op.progressText}
                </span>
              )}

              {/* Amount value */}
              <div className="space-y-0.5">
                <span className="text-sm font-black text-white block">
                  ${op.value.toLocaleString()}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block md:hidden">
                  {op.progressText}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
