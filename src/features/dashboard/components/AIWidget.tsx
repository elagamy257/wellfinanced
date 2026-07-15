import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Sparkles, AlertCircle } from 'lucide-react';
import { useLatestForecast } from '../hooks/useLatestForecast';
import { formatCurrencyNoDecimals, formatPercentage } from '@/utils';

interface WidgetProps {
  isLoading?: boolean;
}

export function AIWidget({ isLoading = false }: WidgetProps) {
  const { data, isLoading: isQueryLoading, isError } = useLatestForecast();
  const loading = isLoading || isQueryLoading;

  if (isError) {
    return (
      <Card variant="default" className="h-full relative overflow-hidden border-danger/20 bg-danger/5 select-none">
        <div className="p-6 pb-2 relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center text-danger">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              AI Forecast
            </h3>
            <span className="text-[9px] font-bold text-danger/80 uppercase tracking-widest block mt-0.5">
              Prediction error
            </span>
          </div>
        </div>
        <div className="p-6 pt-3 relative z-10 flex items-center justify-center h-[256px]">
          <span className="text-xs font-bold text-slate-400 text-center">
            Failed to generate predictive cashflow forecasts.
          </span>
        </div>
      </Card>
    );
  }

  const hasData = data && data.predicted_value !== undefined;

  return (
    <Card variant="default" className="h-full relative overflow-hidden group">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary-purple/5 rounded-full blur-[90px] group-hover:bg-primary-purple/8 transition-colors duration-700 pointer-events-none" />

      {/* Card Header Content */}
      <div className="p-6 pb-2 relative z-10 flex items-center gap-3 select-none">
        <div className="w-10 h-10 rounded-full bg-primary-purple/10 border border-primary-purple/20 flex items-center justify-center text-primary-purple shadow-[0_0_15px_rgba(124,58,237,0.2)]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            AI Forecast
          </h3>
          <span className="text-[9px] font-bold text-primary-purple uppercase tracking-widest block mt-0.5">
            30-Day Predicted Range
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-6 pt-3 relative z-10 flex flex-col justify-between h-[256px]">
        {loading ? (
          <div className="space-y-4">
            <Skeleton variant="text" className="w-1/2" />
            <Skeleton variant="input" />
            <Skeleton variant="text" className="w-3/4" />
          </div>
        ) : !hasData ? (
          <div className="h-full flex items-center justify-center text-center px-4">
            <span className="text-xs text-slate-400 font-medium">
              Forecast engine is analyzing your transaction history. Predictions will appear here once sufficient data is gathered.
            </span>
          </div>
        ) : (
          <>
            {/* Center Predicted Value */}
            <div className="text-center py-2 select-none">
              <span className="text-4xl font-extrabold text-primary-purple tracking-tight drop-shadow-[0_0_15px_rgba(124,58,237,0.35)]">
                {formatCurrencyNoDecimals(data.predicted_value!)}
              </span>
              <span className="text-[9px] font-bold text-slate-500 tracking-wider text-center block mt-1.5 uppercase">
                Medium Confidence Index ({formatPercentage(data.confidence ?? 0)})
              </span>
            </div>

            {/* Custom Progress Slider Track */}
            <div className="relative py-2 select-none">
              <div className="h-1.5 w-full bg-white/5 rounded-full relative">
                {/* Active predicted range shade */}
                <div className="absolute left-[15%] right-[15%] top-0 h-full bg-primary-purple/15 rounded-full" />
                {/* Glowing line filled to 50% */}
                <div className="absolute left-[15%] w-[35%] top-0 h-full bg-primary-purple rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                {/* Slider dot marker at 50% */}
                <div className="absolute left-[50%] -translate-x-1/2 -top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-primary-purple shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
              </div>

              {/* Range Bounds */}
              <div className="flex justify-between items-center mt-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>{formatCurrencyNoDecimals(data.min_bound ?? 0)} Min</span>
                <span>{formatCurrencyNoDecimals(data.max_bound ?? 0)} Max</span>
              </div>
            </div>

            {/* Insight Alert Box */}
            {data.insight && (
              <div className="bg-primary-purple/5 border border-primary-purple/10 rounded-xl p-3.5 mt-2 shadow-sm">
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  &quot;{data.insight}&quot;
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
