'use client';

import React from 'react';
import { Card } from '@/components/ui';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockProjectedGrowthData, mockSavingsMetrics } from '../mocks';

export function ProjectedGrowthChart() {
  return (
    <Card variant="default" className="h-full relative overflow-hidden group select-none">
      {/* Background glow decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/3 rounded-full blur-[90px] pointer-events-none" />

      <div className="p-6 pb-2 flex flex-col justify-between gap-4 relative z-10">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            Projected Growth
          </span>
          <span className="text-[9px] text-slate-400 font-medium block">
            Aggregate across all goals
          </span>
          
          <div className="pt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              ${mockSavingsMetrics.totalTargetReach.toLocaleString()}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[8px] font-bold uppercase tracking-widest">
              Total Projected
            </span>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="px-6 pb-6 pt-2 h-[220px] relative z-10">
        <div className="w-full h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mockProjectedGrowthData}
              margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
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
              <YAxis hide domain={['dataMin - 2000', 'dataMax + 1000']} />
              <Tooltip
                cursor={{ stroke: 'rgba(168, 85, 247, 0.2)', strokeWidth: 1.5 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const isProj = payload[0].payload.isProjected;
                    return (
                      <div className="bg-[#0b0f19] border border-white/10 px-3 py-1.5 rounded-xl shadow-2xl">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                          {payload[0].payload.month} {isProj ? '(Projected)' : ''}
                        </p>
                        <p className="text-xs font-black text-primary">
                          Saved: ${Number(payload[0].value).toLocaleString()}
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
                stroke="#A855F7"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorGrowth)"
                dot={{ r: 3.5, fill: '#060B1A', stroke: '#A855F7', strokeWidth: 2 }}
                activeDot={{ r: 5.5, fill: '#A855F7', stroke: '#060B1A', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer descriptor */}
      <div className="p-6 pt-0 border-t border-white/5 bg-white/1 relative z-10">
        <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-4">
          Projected achievement by mid-October based on current trajectory.
        </p>
      </div>
    </Card>
  );
}
