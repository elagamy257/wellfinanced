'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Sparkles } from 'lucide-react';

interface WidgetProps {
  isLoading?: boolean;
}

export function AIWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card variant="default" className="h-full relative border-t-4 border-primary-purple overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <span className="px-2.5 py-0.5 rounded-full bg-primary-purple/10 text-primary-purple text-[8px] font-bold tracking-widest border border-primary-purple/20">PREDICTIVE AI</span>
      </div>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4.5 h-4.5 text-primary-purple" />
          <CardTitle className="text-sm font-bold text-white uppercase tracking-wider">AI 30-Day Range</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="min-h-[220px] flex flex-col justify-center">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton variant="text" className="w-2/3" />
            <Skeleton variant="rect" className="h-16" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton variant="rect" className="h-10" />
              <Skeleton variant="rect" className="h-10" />
            </div>
          </div>
        ) : (
          <EmptyState
            title="AI Co-Pilot Offline"
            description="Our machine learning models will analyze past transactions to forecast cash ranges, tax reserves, and risk parameters."
          />
        )}
      </CardContent>
    </Card>
  );
}
