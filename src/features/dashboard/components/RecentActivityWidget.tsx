'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Receipt } from 'lucide-react';

interface WidgetProps {
  isLoading?: boolean;
}

export function RecentActivityWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card variant="default" className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Receipt className="w-4.5 h-4.5 text-accent-mint" />
          <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Recent Activity Ledger</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="min-h-[220px] flex flex-col justify-center">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton variant="rect" className="h-10" />
            <Skeleton variant="rect" className="h-10" />
            <Skeleton variant="rect" className="h-10" />
          </div>
        ) : (
          <EmptyState
            title="Activity Ledger Empty"
            description="Your latest transactions, bank balance reconciliations, and category mappings will list here once linked."
          />
        )}
      </CardContent>
    </Card>
  );
}
