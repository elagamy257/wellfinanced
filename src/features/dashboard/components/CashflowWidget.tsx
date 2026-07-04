'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Wallet } from 'lucide-react';

interface WidgetProps {
  isLoading?: boolean;
}

export function CashflowWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card variant="default" className="h-full relative overflow-hidden group">
      {/* Visual background decoration */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <div className="flex items-center gap-2">
          <Wallet className="w-4.5 h-4.5 text-primary-blue" />
          <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Net Cashflow Balance</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="min-h-[220px] flex flex-col justify-center relative z-10">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton variant="text" className="w-1/4 h-8" />
            <Skeleton variant="rect" className="h-32" />
          </div>
        ) : (
          <EmptyState
            title="Cashflow Ledger Empty"
            description="Linked accounts will stream here. Projections and visual balances will compile upon synchronization."
          />
        )}
      </CardContent>
    </Card>
  );
}
