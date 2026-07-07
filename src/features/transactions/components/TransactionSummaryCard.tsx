'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { LucideIcon } from 'lucide-react';

interface TransactionSummaryCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  variant: 'success' | 'pink' | 'danger';
}

export function TransactionSummaryCard({ 
  label, 
  value, 
  icon: Icon, 
  variant 
}: TransactionSummaryCardProps) {
  const borderClasses = {
    success: 'border-l-4 border-success',
    pink: 'border-l-4 border-accent-pink',
    danger: 'border-l-4 border-danger'
  };

  const bgGlowClasses = {
    success: 'bg-success/3',
    pink: 'bg-accent-pink/3',
    danger: 'bg-danger/3'
  };

  const iconContainerClasses = {
    success: 'bg-success/10 border border-success/15 text-success',
    pink: 'bg-accent-pink/10 border border-accent-pink/15 text-accent-pink',
    danger: 'bg-danger/10 border border-danger/15 text-danger'
  };

  return (
    <Card className={`p-5 flex items-center justify-between relative overflow-hidden group ${borderClasses[variant]}`}>
      <div className={`absolute -top-24 -right-24 w-64 h-64 ${bgGlowClasses[variant]} rounded-full blur-[85px] pointer-events-none`} />
      <div>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">{label}</span>
        <span className="text-xl font-black text-white mt-1 block">{value}</span>
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-glow shrink-0 ${iconContainerClasses[variant]}`}>
        <Icon className="w-4.5 h-4.5" />
      </div>
    </Card>
  );
}
