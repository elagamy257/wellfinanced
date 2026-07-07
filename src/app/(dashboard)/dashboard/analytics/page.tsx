'use client';

import React from 'react';
import { PageContainer } from '@/components/layout';
import { SectionTitle } from '@/components/ui';
import { 
  RevenueMomentumChart, 
  SmartSalaryWidget, 
  RevenuePipelineList 
} from '@/features/analytics';

export default function AnalyticsPage() {
  return (
    <PageContainer>
      {/* Section Title Header */}
      <SectionTitle 
        title="Earnings Forecast" 
        subtitle="Comparing historical data from April to July against AI-driven predictive modeling for the upcoming quarter." 
      />

      {/* Grid Layout System */}
      <div className="space-y-6 md:space-y-8 pb-16">
        
        {/* Row 1: Revenue Momentum Double Line Chart & Smart Recommended Salary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueMomentumChart />
          </div>
          <div className="lg:col-span-1">
            <SmartSalaryWidget />
          </div>
        </div>

        {/* Row 2: Pipeline revenue and client opportunities list */}
        <div className="w-full">
          <RevenuePipelineList />
        </div>

      </div>
    </PageContainer>
  );
}
