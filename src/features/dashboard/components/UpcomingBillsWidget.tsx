'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Calendar } from 'lucide-react';

interface WidgetProps {
  isLoading?: boolean;
}

export function UpcomingBillsWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card variant="default" className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4.5 h-4.5 text-accent-pink" />
          <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Upcoming Liabilities</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="h-44 flex flex-col justify-center">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton variant="text" className="w-1/3" />
            <Skeleton variant="rect" className="h-16" />
          </div>
        ) : (
          <EmptyState
            title="No Scheduled Liabilities"
            description="Recurring bills, IRS tax deadlines, and subscription costs will compile here."
          />
        )}
      </CardContent>
    </Card>
  );
}
