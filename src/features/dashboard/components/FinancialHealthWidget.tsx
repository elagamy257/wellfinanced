'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Activity } from 'lucide-react';

interface WidgetProps {
  isLoading?: boolean;
}

export function FinancialHealthWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card variant="default" className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4.5 h-4.5 text-accent-cyan" />
          <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Financial Health</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="h-48 flex flex-col justify-center">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton variant="text" className="w-1/2" />
            <Skeleton variant="rect" className="h-24" />
          </div>
        ) : (
          <EmptyState
            title="Stability Index Ready"
            description="AI-powered health score tracking freelance cash runway and emergency reserves will calibrate here."
          />
        )}
      </CardContent>
    </Card>
  );
}
