'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight } from 'lucide-react';

interface WidgetProps {
  isLoading?: boolean;
}

const data1M = [
  { name: 'Week 1', value: 10400 },
  { name: 'Week 2', value: 11100 },
  { name: 'Week 3', value: 11800 },
  { name: 'Week 4', value: 12842.5 },
];

const data3M = [
  { name: 'Aug Begin', value: 8500 },
  { name: 'Aug Mid', value: 9200 },
  { name: 'Aug End', value: 8900 },
  { name: 'Sep Begin', value: 10400 },
  { name: 'Sep Mid', value: 9800 },
  { name: 'Sep End', value: 11200 },
  { name: 'Oct Begin', value: 10800 },
  { name: 'Oct Mid', value: 12500 },
  { name: 'Oct End', value: 12842.5 },
];

const data1Y = [
  { name: 'Jan-Mar', value: 6200 },
  { name: 'Apr-Jun', value: 8900 },
  { name: 'Jul-Sep', value: 11100 },
  { name: 'Oct-Dec', value: 12842.5 },
];

export function CashflowWidget({ isLoading = false }: WidgetProps) {
  const [period, setPeriod] = useState<'1M' | '3M' | '1Y'>('3M');

  const getChartData = () => {
    switch (period) {
      case '1M':
        return data1M;
      case '1Y':
        return data1Y;
      case '3M':
      default:
        return data3M;
    }
  };

  const chartData = getChartData();

  return (
    <Card variant="default" className="h-full relative overflow-hidden group">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent-mint/5 rounded-full blur-[90px] group-hover:bg-accent-mint/8 transition-colors duration-700 pointer-events-none" />

      {/* Card Header Content */}
      <div className="p-6 pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10 select-none">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Net Cashflow Balance
          </span>
          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              $12,842.50
            </span>
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-accent-mint/10 text-accent-mint text-[10px] font-bold border border-accent-mint/15">
              <ArrowUpRight className="w-3 h-3" />
              <span>+12.4%</span>
            </span>
          </div>
        </div>

        {/* Period Switching Tabs */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 self-start sm:self-center">
          {(['1M', '3M', '1Y'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                period === p
                  ? 'bg-accent-mint/15 text-accent-mint border border-accent-mint/20 shadow-md'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Content Area */}
      <div className="p-6 pt-2 h-[240px] relative z-10">
        {isLoading ? (
          <div className="h-full flex flex-col justify-end space-y-4">
            <Skeleton variant="text" className="w-1/4 h-6" />
            <Skeleton variant="rect" className="h-44" />
          </div>
        ) : (
          <div className="w-full h-full relative">
            {/* Custom Tooltip Positioned statically or inside the Chart */}
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7CFFB2" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7CFFB2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeDasharray="3 3"
                />
                <XAxis dataKey="name" hide />
                <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                <Tooltip
                  cursor={{ stroke: 'rgba(124, 255, 178, 0.2)', strokeWidth: 1.5 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0b0f19] border border-white/10 px-3 py-1.5 rounded-xl shadow-2xl">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                            {payload[0].payload.name}
                          </p>
                          <p className="text-xs font-black text-accent-mint">
                            Value: ${Number(payload[0].value).toLocaleString()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#7CFFB2"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorCashflow)"
                  dot={{ r: 3.5, fill: '#060B1A', stroke: '#7CFFB2', strokeWidth: 2 }}
                  activeDot={{ r: 5.5, fill: '#7CFFB2', stroke: '#060B1A', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Static overlay tooltip for the current node */}
            <div className="absolute right-6 top-1 px-2.5 py-1 rounded-lg bg-accent-mint text-background text-[10px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(124,255,178,0.45)] pointer-events-none">
              Current: $12.8k
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
