'use client';

import React, { useState } from 'react';
import { Card, Input, Button } from '@/components/ui';
import { AlertCircle, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { useInstallmentImpact } from '../hooks/mutations/useInstallmentImpact';
import { InstallmentResponse } from '../types';

export function InstallmentImpactCard() {
  const [monthlyInput, setMonthlyInput] = useState('');
  const [monthsInput, setMonthsInput] = useState('');
  const [validationError, setValidationError] = useState('');
  const [result, setResult] = useState<InstallmentResponse | null>(null);

  const impactMut = useInstallmentImpact();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setResult(null);

    const parsedMonthly = parseFloat(monthlyInput);
    const parsedMonths = parseInt(monthsInput, 10);

    if (isNaN(parsedMonthly) || parsedMonthly <= 0) {
      setValidationError('Please enter a valid monthly payment greater than 0');
      return;
    }
    if (isNaN(parsedMonths) || parsedMonths <= 0) {
      setValidationError('Please enter a duration in months greater than 0');
      return;
    }

    impactMut.mutate(
      { monthly_amount: parsedMonthly, months: parsedMonths },
      {
        onSuccess: (data) => {
          setResult(data);
        },
      }
    );
  };

  const handleRetry = () => {
    if (monthlyInput && monthsInput) {
      const parsedMonthly = parseFloat(monthlyInput);
      const parsedMonths = parseInt(monthsInput, 10);
      if (parsedMonthly > 0 && parsedMonths > 0) {
        impactMut.mutate({ monthly_amount: parsedMonthly, months: parsedMonths }, {
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
          Installment Impact Analyser
        </h3>
        <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
          Model how a monthly installment or subscription agreement affects your runway stability scores.
        </p>
      </div>

      <form onSubmit={handleAnalyze} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="monthly-amount-input"
            label="Monthly Payment"
            type="number"
            placeholder="e.g. 300"
            value={monthlyInput}
            onChange={(e) => setMonthlyInput(e.target.value)}
            disabled={impactMut.isPending}
            className="text-white"
          />
          <Input
            id="installment-months-input"
            label="Months Duration"
            type="number"
            placeholder="e.g. 12"
            value={monthsInput}
            onChange={(e) => setMonthsInput(e.target.value)}
            disabled={impactMut.isPending}
            className="text-white"
          />
        </div>

        {validationError && (
          <span className="text-xs text-danger font-medium px-1 block">{validationError}</span>
        )}

        <Button
          type="submit"
          variant="purple"
          fullWidth
          isLoading={impactMut.isPending}
          disabled={impactMut.isPending || !monthlyInput.trim() || !monthsInput.trim()}
        >
          Analyse Budget Impact
        </Button>
      </form>

      {/* ERROR STATE */}
      {impactMut.isError && (
        <div className="mt-6 p-4 rounded-xl bg-danger/10 border border-danger/15 text-slate-200">
          <div className="flex items-center gap-2 text-danger font-bold text-xs">
            <AlertTriangle className="w-4.5 h-4.5 animate-bounce" />
            <span>Connection Failure</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
            The impact analyzer failed to reach the server. Inputs have been preserved.
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-3 h-8 px-4 bg-danger/15 hover:bg-danger/20 border border-danger/25 text-[9px] font-black uppercase tracking-widest text-danger rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry Analysis</span>
          </button>
        </div>
      )}

      {/* RESULTS DISPLAY */}
      {result && (
        <div className="mt-6 border-t border-white/5 pt-5 space-y-4 animate-scale-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {result.risk_level === 'low' ? (
                <div className="w-10 h-10 rounded-xl bg-success/10 border border-success/15 flex items-center justify-center text-success">
                  <CheckCircle className="w-5 h-5" />
                </div>
              ) : result.risk_level === 'medium' ? (
                <div className="w-10 h-10 rounded-xl bg-warning/10 border border-warning/15 flex items-center justify-center text-warning">
                  <AlertCircle className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-danger/10 border border-danger/15 flex items-center justify-center text-danger">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              )}
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider block text-slate-500">
                  Risk Assessment
                </span>
                <span className={`text-sm font-black uppercase tracking-wider ${
                  result.risk_level === 'low' ? 'text-success' : result.risk_level === 'medium' ? 'text-warning' : 'text-danger'
                }`}>
                  {result.risk_level} Risk
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-wider block text-slate-500">
                Total Commitment
              </span>
              <span className="text-sm font-black text-white">
                ${result.total_cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Warnings List */}
          {result.warnings && result.warnings.length > 0 && (
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                Analysis Warnings
              </span>
              <ul className="space-y-1.5 list-disc pl-4">
                {result.warnings.map((warn, index) => (
                  <li key={index} className="text-[10px] text-slate-300 leading-relaxed font-semibold">
                    {warn}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4.5">
            <div className="p-3 rounded-xl bg-white/3 border border-white/3 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Current Surplus</span>
              <span className="text-xs font-black text-white">${result.current_surplus.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/3 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">New Surplus</span>
              <span className={`text-xs font-black ${result.new_surplus >= 0 ? 'text-success' : 'text-danger'}`}>
                ${result.new_surplus.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/3 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Current Debt Ratio</span>
              <span className="text-xs font-black text-white">{result.current_debt_ratio}%</span>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/3 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">New Debt Ratio</span>
              <span className={`text-xs font-black ${result.new_debt_ratio <= 35 ? 'text-success' : 'text-danger'}`}>
                {result.new_debt_ratio}%
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
