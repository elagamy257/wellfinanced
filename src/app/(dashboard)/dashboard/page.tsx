'use client';

import React, { useState } from 'react';
import { PageContainer, Breadcrumb } from '@/components/layout';
import { Button } from '@/components/ui';
import { Sparkles, Eye, EyeOff } from 'lucide-react';
import { 
  IncomeWidget,
  ExpenseWidget,
  GoalsWidget,
  CashflowWidget,
  AIWidget,
  RecentActivityWidget,
  DebtWidget,
  CreditCardWidget
} from '@/features/dashboard';

import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const [isLoadingState, setIsLoadingState] = useState(false);
  const { user } = useAuthStore();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Freelancer';

  return (
    <PageContainer>
      {/* Dynamic Breadcrumbs */}
      <Breadcrumb />

      {/* Dashboard Top Header - Welcome Greeting and AI Active State */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-10 animate-fade-in select-none">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Good Evening, {firstName}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Your financial well-being is in your hands.
          </p>
        </div>
        
        <div className="shrink-0 flex items-center gap-3">
          {/* Debugging helper to test skeleton load state */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsLoadingState(!isLoadingState)}
            className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10"
          >
            {isLoadingState ? (
              <>
                <Eye className="w-4 h-4 text-accent-cyan" />
                <span className="text-xs">Show Live Data</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 text-slate-400" />
                <span className="text-xs">Preview Skeletons</span>
              </>
            )}
          </Button>

          {/* AI Active Status Pill */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-primary-purple/20 bg-primary-purple/10 text-primary-purple text-xs font-bold tracking-wider select-none animate-pulse-slow">
            <Sparkles className="w-4 h-4" />
            <span>AI ASSISTANT ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout System */}
      <div className="space-y-6 pb-16">
        
        {/* Row 1: Net Cashflow Balance (2/3) & AI Forecast (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CashflowWidget isLoading={isLoadingState} />
          </div>
          <div className="lg:col-span-1">
            <AIWidget isLoading={isLoadingState} />
          </div>
        </div>

        {/* Row 2: Monthly Income, Expenses, and Total Debt Card (Equal Widths) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <IncomeWidget isLoading={isLoadingState} />
          <ExpenseWidget isLoading={isLoadingState} />
          <DebtWidget isLoading={isLoadingState} />
        </div>

        {/* Row 3: Recent Activity (2/3) & Credit Card + Goals Stack (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivityWidget isLoading={isLoadingState} />
          </div>

          {/* Credit Card Widget & Q4 Taxes Goal Widget Stack */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <CreditCardWidget isLoading={isLoadingState} />
            <GoalsWidget isLoading={isLoadingState} />
          </div>
        </div>

      </div>
    </PageContainer>
  );
}
