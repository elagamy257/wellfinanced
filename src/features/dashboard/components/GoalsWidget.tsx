'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Target } from 'lucide-react';

interface WidgetProps {
  isLoading?: boolean;
}

export function GoalsWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card variant="default" className="h-full border-l-4 border-accent-yellow/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Target className="w-4.5 h-4.5 text-accent-yellow" />
          <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">Savings Goals</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="h-28 flex flex-col justify-center">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton variant="text" className="w-1/4" />
            <Skeleton variant="text" className="w-3/4" />
          </div>
        ) : (
          <EmptyState
            title="Targets & Buffers"
            description="Active savings rules, smoothing fund status, and custom targets will calibrate here."
          />
        )}
      </CardContent>
    </Card>
  );
}
