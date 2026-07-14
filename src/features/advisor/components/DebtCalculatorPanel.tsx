'use client';

import React, { useState } from 'react';
import { Card, Input, Button, Select } from '@/components/ui';
import { AlertCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { useDebtPaymentPlan } from '../hooks/queries/useDebtPaymentPlan';
import { useWhichDebtFirst } from '../hooks/queries/useWhichDebtFirst';
import { usePrioritizedDebts } from '../hooks/queries/usePrioritizedDebts';
import { PaymentPlanTimeline } from './PaymentPlanTimeline';

export function DebtCalculatorPanel() {
  const [strategy, setStrategy] = useState('hybrid');
  const [extraBudgetInput, setExtraBudgetInput] = useState('');
  const [validationError, setValidationError] = useState('');

  // Active query parameters for triggers
  const [activeStrategy, setActiveStrategy] = useState('hybrid');
  const [activeBudget, setActiveBudget] = useState<number | undefined>(undefined);

  const budgetNum = activeBudget !== undefined ? activeBudget : 0;
  const paymentPlanQuery = useDebtPaymentPlan(activeStrategy, budgetNum);
  
  // Broken AI endpoints (intercepted query states)
  const whichDebtFirstQuery = useWhichDebtFirst();
  const prioritizedDebtsQuery = usePrioritizedDebts(activeStrategy, budgetNum);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const parsedBudget = extraBudgetInput.trim() ? parseFloat(extraBudgetInput) : 0;
    if (isNaN(parsedBudget) || parsedBudget < 0) {
      setValidationError('Please enter a valid budget greater than or equal to 0');
      return;
    }

    setActiveStrategy(strategy);
    setActiveBudget(parsedBudget);
  };

  const handleRetryPlan = () => {
    paymentPlanQuery.refetch();
  };

  const handleRetryAI = () => {
    whichDebtFirstQuery.refetch();
    prioritizedDebtsQuery.refetch();
  };

  const strategyOptions = [
    { value: 'hybrid', label: 'Hybrid (Balanced)' },
    { value: 'avalanche', label: 'Avalanche (Highest Interest First)' },
    { value: 'snowball', label: 'Snowball (Lowest Balance First)' },
  ];

  return (
    <div className="space-y-8">
      {/* 1. CALCULATOR INPUT CONTROLS */}
      <Card variant="glass" className="p-6 md:p-8 border border-white/5 bg-bg-1/40 select-none">
        <div className="space-y-1 mb-6">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Debt Payoff Planner
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
            Calculate your custom payoff timeline and model how extra payments accelerate your debt-free date.
          </p>
        </div>

        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Payoff Strategy"
              value={strategy}
              onChange={setStrategy}
              options={strategyOptions}
            />

            <Input
              id="extra-budget-input"
              label="Additional Monthly Budget"
              type="number"
              placeholder="e.g. 500 (extra payment addition)"
              value={extraBudgetInput}
              onChange={(e) => setExtraBudgetInput(e.target.value)}
              error={validationError}
              className="text-white"
            />
          </div>

          <Button type="submit" variant="cyan" fullWidth>
            Calculate Payoff Plan
          </Button>
        </form>
      </Card>

      {/* 2. BROKEN ENDPOINTS DISPLAY (BACKEND LIMITATIONS) */}
      <Card variant="default" className="p-6 bg-danger/5 border border-danger/15 select-none space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-danger/10 border border-danger/15 flex items-center justify-center text-danger mt-0.5">
            <AlertTriangle className="w-4.5 h-4.5 animate-pulse" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              AI Prioritization Service Offline
            </h4>
            <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
              The AI Debt preference endpoints (`GET /api/advisor/which-debt-first` and `GET /api/debts/prioritized`) failed to execute on the backend server.
            </p>
          </div>
        </div>

        <div className="bg-bg-1/40 border border-white/5 p-3 rounded-xl">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block mb-1">
            Backend Error Log
          </span>
          <p className="text-[10px] text-danger font-mono bg-black/30 p-2 rounded border border-danger/10">
            Internal Server Error 500: AI Debt Prioritizer error: &apos;urgency_score&apos;
          </p>
          <p className="text-[9px] text-slate-400 mt-2 italic">
            Note: This is a known FastAPI schema restriction where newly registered ledger debts lack database urgency parameters. Standard chronological payoff logic remains functional.
          </p>
        </div>

        <div className="flex justify-start">
          <button
            type="button"
            onClick={handleRetryAI}
            className="h-8 px-4 bg-danger/15 hover:bg-danger/20 border border-danger/25 text-[9px] font-black uppercase tracking-widest text-danger rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry AI Endpoints</span>
          </button>
        </div>
      </Card>

      {/* 3. WORKING ENDPOINT PLANNER RESULTS */}
      {paymentPlanQuery.isPending && (
        <Card variant="glass" className="p-10 text-center select-none border border-white/5 bg-bg-1/40">
          <RefreshCw className="w-8 h-8 text-cyan animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Resolving payment matrix timeline...</p>
        </Card>
      )}

      {paymentPlanQuery.isError && (
        <Card variant="glass" className="p-6 md:p-8 border border-danger/15 bg-danger/5 select-none space-y-4">
          <div className="flex items-center gap-2 text-danger font-bold text-xs">
            <AlertCircle className="w-4.5 h-4.5 animate-bounce" />
            <span>Solver Query Error</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
            We encountered a network connection error retrieving the payment solver timeline.
          </p>
          <Button variant="danger" size="sm" onClick={handleRetryPlan} className="flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3" />
            <span>Retry Plan Solver</span>
          </Button>
        </Card>
      )}

      {paymentPlanQuery.data && (
        <div className="space-y-8 animate-scale-in">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default" className="p-5 bg-bg-3/50 border border-white/5 shadow-md space-y-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Debt-Free Target</span>
              <span className="text-lg font-black text-white">
                {paymentPlanQuery.data.summary.debt_free_date || 'No active debt'}
              </span>
              <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">
                ({paymentPlanQuery.data.summary.total_months} months total)
              </span>
            </Card>

            <Card variant="default" className="p-5 bg-bg-3/50 border border-white/5 shadow-md space-y-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Interest Paid</span>
              <span className="text-lg font-black text-accent-pink">
                ${paymentPlanQuery.data.summary.total_interest.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">
                (Total Paid: ${paymentPlanQuery.data.summary.total_paid.toLocaleString(undefined, { minimumFractionDigits: 2 })})
              </span>
            </Card>

            <Card variant="default" className="p-5 bg-bg-3/50 border border-white/5 shadow-md space-y-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Interest Saved</span>
              <span className="text-lg font-black text-success">
                ${paymentPlanQuery.data.summary.interest_saved_vs_minimum.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[9px] font-bold text-success block uppercase tracking-wider">
                vs minimum payment
              </span>
            </Card>
          </div>

          {/* Chronological Timeline */}
          <PaymentPlanTimeline timeline={paymentPlanQuery.data.timeline} />
        </div>
      )}
    </div>
  );
}
