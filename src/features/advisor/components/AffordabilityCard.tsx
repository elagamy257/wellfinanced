'use client';

import React, { useState } from 'react';
import { Card, Input, Button } from '@/components/ui';
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { useCanIAfford } from '../hooks/mutations/useCanIAfford';
import { CanIAffordResponse } from '../types';

export function AffordabilityCard() {
  const [costInput, setCostInput] = useState('');
  const [validationError, setValidationError] = useState('');
  const [result, setResult] = useState<CanIAffordResponse | null>(null);

  const canIAffordMut = useCanIAfford();

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setResult(null);

    const parsedCost = parseFloat(costInput);
    if (isNaN(parsedCost) || parsedCost <= 0) {
      setValidationError('Please enter a valid amount greater than 0');
      return;
    }

    canIAffordMut.mutate(
      { item_cost: parsedCost },
      {
        onSuccess: (data) => {
          setResult(data);
        },
      }
    );
  };

  const handleRetry = () => {
    if (costInput) {
      const parsedCost = parseFloat(costInput);
      if (parsedCost > 0) {
        canIAffordMut.mutate({ item_cost: parsedCost }, {
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
          Can I Afford This?
        </h3>
        <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
          Evaluate whether a large purchase can be fully covered by your current surplus and emergency buffer.
        </p>
      </div>

      <form onSubmit={handleEvaluate} className="space-y-4">
        <Input
          id="item-cost-input"
          label="Estimated Item Cost"
          type="number"
          placeholder="e.g. 3500"
          value={costInput}
          onChange={(e) => setCostInput(e.target.value)}
          error={validationError}
          disabled={canIAffordMut.isPending}
          className="text-white"
        />

        <Button
          type="submit"
          variant="mint"
          fullWidth
          isLoading={canIAffordMut.isPending}
          disabled={canIAffordMut.isPending || !costInput.trim()}
        >
          Check Affordability
        </Button>
      </form>

      {/* ERROR / RETRY STATE */}
      {canIAffordMut.isError && (
        <div className="mt-6 p-4 rounded-xl bg-danger/10 border border-danger/15 text-slate-200">
          <div className="flex items-center gap-2 text-danger font-bold text-xs">
            <AlertTriangle className="w-4.5 h-4.5 animate-bounce" />
            <span>Connection Issue</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
            The affordability checker failed to reach the server. Your input has been preserved.
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-3 h-8 px-4 bg-danger/15 hover:bg-danger/20 border border-danger/25 text-[9px] font-black uppercase tracking-widest text-danger rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry Calculation</span>
          </button>
        </div>
      )}

      {/* RESULTS DISPLAY */}
      {result && (
        <div className="mt-6 border-t border-white/5 pt-5 space-y-4 animate-scale-in">
          <div className="flex items-center gap-3">
            {result.verdict === 'affordable' ? (
              <div className="w-10 h-10 rounded-xl bg-success/10 border border-success/15 flex items-center justify-center text-success shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                <CheckCircle className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-accent-pink/10 border border-accent-pink/15 flex items-center justify-center text-accent-pink shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                <AlertTriangle className="w-5 h-5" />
              </div>
            )}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider block text-slate-500">
                Evaluation Verdict
              </span>
              <span className={`text-sm font-black uppercase tracking-wider ${
                result.verdict === 'affordable' ? 'text-success' : 'text-accent-pink'
              }`}>
                {result.verdict === 'affordable' ? 'Affordable' : 'Not Recommended Now'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed font-semibold bg-white/5 border border-white/5 rounded-xl p-3.5">
            {result.method}
          </p>

          <div className="grid grid-cols-2 gap-4.5 pt-1.5">
            <div className="p-3 rounded-xl bg-white/3 border border-white/3 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Available Cash</span>
              <span className="text-xs font-black text-white">${result.available_cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/3 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Monthly Surplus</span>
              <span className="text-xs font-black text-white">${result.monthly_surplus.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/3 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Debt Obligations</span>
              <span className="text-xs font-black text-white">${result.debt_obligations.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/3 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Months to Save</span>
              <span className="text-xs font-black text-white">
                {result.months_to_save === -1 ? 'N/A' : `${result.months_to_save} Months`}
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
