'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { LayoutDashboard } from 'lucide-react';

interface WidgetProps {
  isLoading?: boolean;
}

export function OverviewWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card variant="default" className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-4.5 h-4.5 text-primary-purple" />
          <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Overview</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="h-48 flex flex-col justify-center">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton variant="text" className="w-1/3" />
            <Skeleton variant="rect" className="h-20" />
            <Skeleton variant="text" className="w-2/3" />
          </div>
        ) : (
          <EmptyState
            title="Overview Calibration"
            description="Autonomous telemetry summary will populate here. System metrics will display cashflow velocity and index statuses."
          />
        )}
      </CardContent>
    </Card>
  );
}
