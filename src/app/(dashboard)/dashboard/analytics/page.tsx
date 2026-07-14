'use client';

import React from 'react';
import { PageContainer } from '@/components/layout';
import { SectionTitle } from '@/components/ui';
import {
  RevenueMomentumChart,
  SmartSalaryWidget,
  RevenuePipelineList,
} from '@/features/analytics';
import {
  useForecastLatest,
  useExpenseAnalysis,
  useSalaryDeviation,
  useGenerateForecast,
} from '@/features/analytics';
import {
  mapForecastToChartData,
  mapExpenseAnalysisToPipeline,
  mapSalaryDeviationToWidget,
} from '@/features/analytics';

export default function AnalyticsPage() {
  // ─── React Query hooks ────────────────────────────────────────────────────────
  const forecastLatest = useForecastLatest();
  const expenseAnalysis = useExpenseAnalysis();
  const salaryDeviation = useSalaryDeviation();
  const generateForecast = useGenerateForecast();

  // ─── Mapped UI models ─────────────────────────────────────────────────────────
  const chartData = mapForecastToChartData(forecastLatest.data ?? null);
  const pipelineData = mapExpenseAnalysisToPipeline(expenseAnalysis.data ?? null);
  const salaryWidgetData = mapSalaryDeviationToWidget(salaryDeviation.data ?? null);

  // ─── Mutation handler ─────────────────────────────────────────────────────────
  const handleGenerateForecast = () => {
    generateForecast.mutate(3);
  };

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
            <RevenueMomentumChart
              data={chartData}
              isLoading={forecastLatest.isLoading}
              isError={forecastLatest.isError}
            />
          </div>
          <div className="lg:col-span-1">
            <SmartSalaryWidget
              data={salaryWidgetData}
              isLoading={salaryDeviation.isLoading}
              isError={salaryDeviation.isError}
              isGenerating={generateForecast.isPending}
              onGenerateForecast={handleGenerateForecast}
            />
          </div>
        </div>

        {/* Row 2: Pipeline revenue and client opportunities list */}
        <div className="w-full">
          <RevenuePipelineList
            data={pipelineData}
            isLoading={expenseAnalysis.isLoading}
            isError={expenseAnalysis.isError}
          />
        </div>

      </div>
    </PageContainer>
  );
}
