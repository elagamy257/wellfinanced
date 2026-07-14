'use client';

import React, { useState } from 'react';
import { Card, Input, Button } from '@/components/ui';
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { useSavingsPlan } from '../hooks/mutations/useSavingsPlan';
import { SavingsPlanResponse } from '../types';

export function SavingsPlanCard() {
  const [goalNameInput, setGoalNameInput] = useState('');
  const [targetInput, setTargetInput] = useState('');
  const [monthsInput, setMonthsInput] = useState('');
  const [validationError, setValidationError] = useState('');
  const [result, setResult] = useState<SavingsPlanResponse | null>(null);

  const savingsPlanMut = useSavingsPlan();

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setResult(null);

    const parsedTarget = parseFloat(targetInput);
    const parsedMonths = parseInt(monthsInput, 10);

    if (!goalNameInput.trim()) {
      setValidationError('Please enter a goal name');
      return;
    }
    if (isNaN(parsedTarget) || parsedTarget <= 0) {
      setValidationError('Please enter a valid target amount greater than 0');
      return;
    }
    if (isNaN(parsedMonths) || parsedMonths <= 0) {
      setValidationError('Please enter a duration in months greater than 0');
      return;
    }

    savingsPlanMut.mutate(
      { goal_name: goalNameInput, target_amount: parsedTarget, months: parsedMonths },
      {
        onSuccess: (data) => {
          setResult(data);
        },
      }
    );
  };

  const handleRetry = () => {
    if (goalNameInput && targetInput && monthsInput) {
      const parsedTarget = parseFloat(targetInput);
      const parsedMonths = parseInt(monthsInput, 10);
      if (parsedTarget > 0 && parsedMonths > 0) {
        savingsPlanMut.mutate({ goal_name: goalNameInput, target_amount: parsedTarget, months: parsedMonths }, {
          onSuccess: (data) => {
            setResult(data);
          }
        });
      }
    }
  };

  return (
    <Card variant="glass" className="p-6 md:p-8 border border-white/5 bg-bg-1/40 relative overflow-hidden select-none">
      <div className="space-y-1 mb-6">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
          Savings Planner
        </h3>
        <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
          Analyze the feasibility of achieving your savings targets based on current surplus runway metrics.
        </p>
      </div>

      <form onSubmit={handleEvaluate} className="space-y-4">
        <Input
          id="goal-name-input"
          label="Goal Name"
          type="text"
          placeholder="e.g. Tax Vault or Equipment Upgrade"
          value={goalNameInput}
          onChange={(e) => setGoalNameInput(e.target.value)}
          disabled={savingsPlanMut.isPending}
          className="text-white"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="savings-target-input"
            label="Target Amount"
            type="number"
            placeholder="e.g. 5000"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            disabled={savingsPlanMut.isPending}
            className="text-white"
          />
          <Input
            id="savings-months-input"
            label="Months to Achieve"
            type="number"
            placeholder="e.g. 12"
            value={monthsInput}
            onChange={(e) => setMonthsInput(e.target.value)}
            disabled={savingsPlanMut.isPending}
            className="text-white"
          />
        </div>

        {validationError && (
          <span className="text-xs text-danger font-medium px-1 block">{validationError}</span>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={savingsPlanMut.isPending}
          disabled={savingsPlanMut.isPending || !goalNameInput.trim() || !targetInput.trim() || !monthsInput.trim()}
        >
          Check Savings Feasibility
        </Button>
      </form>

      {/* ERROR STATE */}
      {savingsPlanMut.isError && (
        <div className="mt-6 p-4 rounded-xl bg-danger/10 border border-danger/15 text-slate-200">
          <div className="flex items-center gap-2 text-danger font-bold text-xs">
            <AlertTriangle className="w-4.5 h-4.5 animate-bounce" />
            <span>Connection Failure</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
            The savings planner failed to communicate with the server. Inputs have been preserved.
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-3 h-8 px-4 bg-danger/15 hover:bg-danger/20 border border-danger/25 text-[9px] font-black uppercase tracking-widest text-danger rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry Plan</span>
          </button>
        </div>
      )}

      {/* RESULTS DISPLAY */}
      {result && (
        <div className="mt-6 border-t border-white/5 pt-5 space-y-4 animate-scale-in">
          <div className="flex items-center gap-3">
            {result.verdict === 'feasible' ? (
              <div className="w-10 h-10 rounded-xl bg-success/10 border border-success/15 flex items-center justify-center text-success">
                <CheckCircle className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-accent-pink/10 border border-accent-pink/15 flex items-center justify-center text-accent-pink">
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider block text-slate-500">
                Feasibility Verdict
              </span>
              <span className={`text-sm font-black uppercase tracking-wider ${
                result.verdict === 'feasible' ? 'text-success' : 'text-accent-pink'
              }`}>
                {result.verdict === 'feasible' ? 'Feasible Goal' : 'Not Feasible Currently'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed font-semibold bg-white/5 border border-white/5 rounded-xl p-3.5">
            {result.recommendation}
          </p>

          <div className="grid grid-cols-2 gap-4.5">
            <div className="p-3 rounded-xl bg-white/3 border border-white/3 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Monthly Needed</span>
              <span className="text-xs font-black text-white">${result.monthly_needed.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/3 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Adjusted Monthly Allocation</span>
              <span className="text-xs font-black text-white">${result.adjusted_monthly.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/3 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Current Surplus</span>
              <span className="text-xs font-black text-white">${result.current_surplus.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/3 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Savings % of Income</span>
              <span className="text-xs font-black text-white">{result.savings_pct_of_income}%</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
