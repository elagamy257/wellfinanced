'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Zap } from 'lucide-react';

interface WidgetProps {
  isLoading?: boolean;
}

export function QuickActionsWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card variant="default" className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-4.5 h-4.5 text-accent-yellow" />
          <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Quick Calibrations</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="h-44 flex flex-col justify-center">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton variant="text" className="w-1/2" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton variant="rect" className="h-10" />
              <Skeleton variant="rect" className="h-10" />
              <Skeleton variant="rect" className="h-10" />
            </div>
          </div>
        ) : (
          <EmptyState
            title="Interactive Operations Offline"
            description="Reconciliation triggers, invoice generator systems, and bank link controls will appear here."
          />
        )}
      </CardContent>
    </Card>
  );
}
