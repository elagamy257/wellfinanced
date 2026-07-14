'use client';

import React, { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { X, Calendar, Sparkles } from 'lucide-react';
import { SavingsGoal } from '../mocks';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Omit<SavingsGoal, 'id' | 'percentage'>) => void;
}

export function GoalModal({ isOpen, onClose, onSave }: GoalModalProps) {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [savedAmount, setSavedAmount] = useState('');
  const [eta, setEta] = useState(new Date().toISOString().substring(0, 10));
  const [category, setCategory] = useState('Emergency Fund');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName || Number(targetAmount) <= 0) return;

    onSave({
      name: goalName,
      target: Number(targetAmount),
      saved: Number(savedAmount) || 0,
      eta,
      category
    });

    resetForm();
  };

  const resetForm = () => {
    setGoalName('');
    setTargetAmount('');
    setSavedAmount('');
    setEta(new Date().toISOString().substring(0, 10));
    setCategory('Emergency Fund');
  };

  return (
    <div className="fixed inset-0 bg-bg-1/85 backdrop-blur-md z-50 flex justify-center items-start overflow-y-auto p-4 md:p-6 animate-fade-in">
      <div className="my-auto w-full max-w-[460px] bg-bg-3/95 border border-white/10 rounded-card p-6 md:p-8 relative shadow-neon overflow-hidden animate-scale-in">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5 select-none">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span>Create Savings Goal</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 pt-5">
          {/* Goal Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
              Goal Name
            </label>
            <Input
              id="goal-name"
              type="text"
              placeholder="e.g., Taxes, Investment Runway"
              value={goalName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoalName(e.target.value)}
              required
            />
          </div>

          {/* Amount inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                Target Amount ($)
              </label>
              <input
                type="number"
                placeholder="10,000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full h-11 px-4 bg-white/5 hover:bg-white/8 focus:bg-bg-2 border border-white/5 focus:border-primary/20 text-xs font-bold text-white rounded-xl outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                Already Saved ($)
              </label>
              <input
                type="number"
                placeholder="0"
                value={savedAmount}
                onChange={(e) => setSavedAmount(e.target.value)}
                className="w-full h-11 px-4 bg-white/5 hover:bg-white/8 focus:bg-bg-2 border border-white/5 focus:border-primary/20 text-xs font-bold text-white rounded-xl outline-none transition-all"
              />
            </div>
          </div>

          {/* Grid: Category & Target Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                Category
              </label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-4 bg-white/5 border border-white/5 text-xs text-slate-300 font-bold rounded-xl outline-none focus:border-primary/20 cursor-pointer hover:bg-white/8 transition-all"
              >
                <option value="Emergency Fund" className="bg-bg-2">Emergency Fund</option>
                <option value="Taxes" className="bg-bg-2">Taxes</option>
                <option value="Hardware" className="bg-bg-2">Hardware</option>
                <option value="Business Expansion" className="bg-bg-2">Business expansion</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                Target Date (ETA)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </span>
                <input
                  type="date"
                  value={eta}
                  onChange={(e) => setEta(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-white/5 hover:bg-white/8 focus:bg-bg-2 border border-white/5 focus:border-primary/20 text-xs font-bold text-white rounded-xl outline-none transition-all cursor-pointer"
                  required
                />
              </div>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="flex items-center justify-end pt-4 border-t border-white/5 select-none gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <Button 
              type="submit" 
              variant="primary" 
              size="sm"
              className="font-bold tracking-wide uppercase h-11"
            >
              Save Goal
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
