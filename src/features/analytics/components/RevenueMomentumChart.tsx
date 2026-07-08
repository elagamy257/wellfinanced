'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockForecastData } from '../mocks';

export function RevenueMomentumChart() {
  const [period, setPeriod] = useState<'1M' | '6M' | '1Y'>('6M');

  return (
    <Card variant="default" className="h-full relative overflow-hidden group select-none">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent-cyan/3 rounded-full blur-[90px] pointer-events-none" />

      {/* Header */}
      <div className="p-6 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            PROJECTION OVERVIEW
          </span>
          <h3 className="text-base font-extrabold text-white tracking-tight">
            Revenue Momentum
          </h3>
        </div>

        {/* Filters & Toggles */}
        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-3.5 text-[9px] font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1.5 text-accent-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
              <span>Actual</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>AI Predicted</span>
            </div>
          </div>

          {/* Period Toggles */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            {(['1M', '6M', '1Y'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                  period === p
                    ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/20 shadow-md'
                    : 'text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recharts Double Area Graph */}
      <div className="p-6 pt-4 h-[280px] relative z-10">
        <div className="w-full h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mockForecastData}
              margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent-cyan)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-accent-cyan)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary-purple)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-primary-purple)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeDasharray="3 3"
              />
              <XAxis 
                dataKey="month" 
                stroke="rgba(255, 255, 255, 0.3)"
                fontSize={9}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis hide domain={['dataMin - 3000', 'dataMax + 2000']} />
              <Tooltip
                cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const dataPoint = payload[0].payload;
                    return (
                      <div className="bg-bg-3 border border-white/10 px-3 py-1.5 rounded-xl shadow-2xl">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          {dataPoint.month}
                        </p>
                        {dataPoint.actual !== undefined && (
                          <p className="text-xs font-black text-accent-cyan">
                            Actual: ${dataPoint.actual.toLocaleString()}
                          </p>
                        )}
                        {dataPoint.projected !== undefined && (
                          <p className="text-xs font-black text-primary">
                            Predicted: ${dataPoint.projected.toLocaleString()}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {/* Actual Line */}
              <Area
                type="monotone"
                dataKey="actual"
                stroke="var(--color-accent-cyan)"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorActual)"
                dot={{ r: 3.5, fill: 'var(--color-background)', stroke: 'var(--color-accent-cyan)', strokeWidth: 2 }}
                activeDot={{ r: 5.5, fill: 'var(--color-accent-cyan)', stroke: 'var(--color-background)', strokeWidth: 2 }}
              />
              {/* Projected Line */}
              <Area
                type="monotone"
                dataKey="projected"
                stroke="var(--color-primary-purple)"
                strokeWidth={2.5}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#colorProjected)"
                dot={{ r: 3.5, fill: 'var(--color-background)', stroke: 'var(--color-primary-purple)', strokeWidth: 2 }}
                activeDot={{ r: 5.5, fill: 'var(--color-primary-purple)', stroke: 'var(--color-background)', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
