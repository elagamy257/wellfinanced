import React from 'react';
import { Card, CardContent } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  trend?: {
    value: number;
    type: 'positive' | 'negative' | 'neutral';
  };
}

export function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  return (
    <Card variant="glass" interactive className="h-full">
      <CardContent className="flex flex-col gap-5 justify-between h-full">
        {/* Header section of card */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted uppercase tracking-wider select-none">{title}</span>
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-blue shadow-sm">
              <Icon className="w-5 h-5" strokeWidth={2} />
            </div>
          )}
        </div>

        {/* Value and trends */}
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-3xl font-extrabold text-text tracking-tight select-all">{value}</span>
          
          {(trend || description) && (
            <div className="flex items-center gap-2 text-xs">
              {trend && (
                <span
                  className={`flex items-center gap-1 font-extrabold px-2 py-0.5 rounded-full border ${
                    trend.type === 'positive'
                      ? 'bg-accent-mint/10 text-accent-mint border-accent-mint/20'
                      : trend.type === 'negative'
                      ? 'bg-accent-pink/10 text-accent-pink border-accent-pink/20'
                      : 'bg-white/5 text-muted border-white/10'
                  }`}
                >
                  {trend.type === 'positive' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : trend.type === 'negative' ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : null}
                  {trend.value > 0 ? `+${trend.value}%` : `${trend.value}%`}
                </span>
              )}
              {description && <span className="text-muted font-medium">{description}</span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
