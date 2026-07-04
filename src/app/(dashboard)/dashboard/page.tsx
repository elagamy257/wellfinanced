'use client';

import React, { useState } from 'react';
import { PageContainer, Breadcrumb } from '@/components/layout';
import { SectionTitle, Button, Card } from '@/components/ui';
import { 
  Calendar, 
  Plus, 
  Sparkles, 
  Eye, 
  EyeOff
} from 'lucide-react';
import { 
  OverviewWidget,
  FinancialHealthWidget,
  IncomeWidget,
  ExpenseWidget,
  GoalsWidget,
  CashflowWidget,
  AIWidget,
  UpcomingBillsWidget,
  RecentActivityWidget,
  QuickActionsWidget
} from '@/features/dashboard';

export default function DashboardPage() {
  const [isLoadingState, setIsLoadingState] = useState(false);

  return (
    <PageContainer>
      {/* Dynamic Breadcrumbs */}
      <Breadcrumb />

      {/* Dashboard Top Header */}
      <SectionTitle 
        title="Financial Hub" 
        subtitle="Real-time intelligence for your freelance empire." 
        action={
          <div className="flex flex-wrap items-center gap-3">
            {/* Interactive Toggle for Skeletons vs Empty States */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsLoadingState(!isLoadingState)}
              className="flex items-center gap-2"
            >
              {isLoadingState ? (
                <>
                  <Eye className="w-4 h-4 text-accent-cyan" />
                  <span>Show Empty States</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 text-muted" />
                  <span>Preview Skeletons</span>
                </>
              )}
            </Button>

            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted" />
              <span>Last 30 Days</span>
            </Button>
            
            <Button variant="primary" size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>New Invoice</span>
            </Button>
          </div>
        }
      />

      {/* Grid Layout System */}
      <div className="space-y-6 md:space-y-8 pb-16">
        
        {/* Bento Grid Top Section: Cashflow & Quick Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Large Cashflow Card */}
          <div className="lg:col-span-8">
            <CashflowWidget isLoading={isLoadingState} />
          </div>

          {/* Quick Stats Column: Income, Expense, Goals */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            <div className="flex-1">
              <IncomeWidget isLoading={isLoadingState} />
            </div>
            <div className="flex-1">
              <ExpenseWidget isLoading={isLoadingState} />
            </div>
            <div className="flex-1">
              <GoalsWidget isLoading={isLoadingState} />
            </div>
          </div>
        </div>

        {/* Bento Grid Middle Section: AI Advisor & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* AI Forecast */}
          <div className="lg:col-span-5">
            <AIWidget isLoading={isLoadingState} />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-7">
            <RecentActivityWidget isLoading={isLoadingState} />
          </div>
        </div>

        {/* Bento Grid Bottom Section: Upcoming Liabilities & Quick Calibrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingBillsWidget isLoading={isLoadingState} />
          <QuickActionsWidget isLoading={isLoadingState} />
        </div>

        {/* Full-width Section: Financial Health & Overview Aggregates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FinancialHealthWidget isLoading={isLoadingState} />
          <OverviewWidget isLoading={isLoadingState} />
        </div>

        {/* Bottom Floating Promotional Asset Card */}
        <Card variant="glass" className="relative overflow-hidden min-h-[220px] flex flex-col justify-center p-6 md:p-10 border border-white/10">
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-secondary/10 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-yellow animate-pulse-slow" />
              Secure Your Future with AI Tax Optimization
            </h3>
            <p className="text-caption text-muted leading-relaxed">
              Our advanced neural models will automatically identify tax deduction patterns based on your specific freelance niche. Save up to 15% on IRS set-asides with automated quarterly classifications.
            </p>
            <div className="pt-2">
              <Button variant="purple" size="sm" className="px-8">
                Enable Smart Tax
              </Button>
            </div>
          </div>
        </Card>

      </div>
    </PageContainer>
  );
}
