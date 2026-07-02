import React from 'react';
import { Card, CardContent } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    type: 'positive' | 'negative' | 'neutral';
  };
}

export function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="hover:border-primary/20 transition-all duration-300">
      <CardContent className="flex flex-col gap-4">
        {/* Header section of card */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">{title}</span>
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-primary">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Value and trends */}
        <div className="flex flex-col gap-1">
          <span className="text-xl md:text-2xl font-extrabold text-text tracking-tight">{value}</span>
          
          {(trend || description) && (
            <div className="flex items-center gap-1.5 text-xs">
              {trend && (
                <span
                  className={`flex items-center gap-0.5 font-bold ${
                    trend.type === 'positive'
                      ? 'text-success'
                      : trend.type === 'negative'
                      ? 'text-danger'
                      : 'text-muted'
                  }`}
                >
                  {trend.type === 'positive' ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : trend.type === 'negative' ? (
                    <TrendingDown className="w-3.5 h-3.5" />
                  ) : null}
                  {trend.value > 0 ? `+${trend.value}%` : `${trend.value}%`}
                </span>
              )}
              {description && <span className="text-muted/80">{description}</span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
