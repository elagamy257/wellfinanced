'use client';

import React, { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { X, Sparkles, Calendar as CalendarIcon } from 'lucide-react';
import { TransactionItem } from '../types';

const DEFAULT_SUGGESTED_TAGS = ['Development', 'UI Design', 'Consulting', 'Infrastructure', 'Office Hardware'];

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tx: Omit<TransactionItem, 'id'>) => void;
}

export function AddTransactionModal({ isOpen, onClose, onSave }: AddTransactionModalProps) {
  const [txType, setTxType] = useState<'income' | 'expense' | 'debt'>('income');
  const [txAmount, setTxAmount] = useState('0.00');
  const [txSource, setTxSource] = useState('');
  const [txDate, setTxDate] = useState(new Date().toISOString().substring(0, 10));
  const [txStatus, setTxStatus] = useState<'cleared' | 'pending'>('cleared');
  const [txCategory, setTxCategory] = useState('Development');
  const [txNotes, setTxNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txSource || Number(txAmount) <= 0) return;

    onSave({
      source: txSource,
      date: txDate,
      category: txCategory,
      amount: Number(txAmount),
      type: txType,
      status: txStatus,
      notes: txNotes || undefined
    });

    resetForm();
  };

  const resetForm = () => {
    setTxType('income');
    setTxAmount('0.00');
    setTxSource('');
    setTxDate(new Date().toISOString().substring(0, 10));
    setTxStatus('cleared');
    setTxCategory('Development');
    setTxNotes('');
  };

  return (
    <div className="fixed inset-0 bg-bg-1/85 backdrop-blur-md z-50 flex justify-center items-start overflow-y-auto p-4 md:p-6 animate-fade-in">
      {/* Card Modal Container */}
      <div className="my-auto w-full max-w-[480px] bg-bg-3/95 border border-white/10 rounded-card p-6 md:p-8 relative shadow-neon overflow-hidden animate-scale-in">
        {/* Ambient inner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5 select-none">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span>Add Transaction</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="space-y-5 pt-5">
          {/* Type selector toggle */}
          <div className="space-y-2 select-none">
            <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
              Transaction Type
            </label>
            <div className="grid grid-cols-3 gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
              {(['income', 'expense', 'debt'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTxType(t)}
                  className={`h-10 text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                    txType === t
                      ? t === 'income' 
                        ? 'bg-success/15 text-success border border-success/20 shadow-md'
                        : t === 'expense'
                          ? 'bg-accent-pink/15 text-accent-pink border border-accent-pink/20 shadow-md'
                          : 'bg-danger/15 text-danger border border-danger/20 shadow-md'
                      : 'text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Amount input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
              Amount
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 font-extrabold text-lg select-none">
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={txAmount}
                onChange={(e) => setTxAmount(e.target.value)}
                className="w-full h-14 pl-9 pr-4 bg-white/5 hover:bg-white/8 focus:bg-bg-2 border border-white/5 focus:border-primary/20 text-lg font-black text-white placeholder-slate-500 rounded-xl outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Source Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
              Source / Payee
            </label>
            <Input
              id="source"
              type="text"
              placeholder="e.g., Client Payment / UI Design Project"
              value={txSource}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTxSource(e.target.value)}
              className="font-medium"
              required
            />
          </div>

          {/* Grid: Date & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                Date
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <CalendarIcon className="w-4 h-4" />
                </span>
                <input
                  type="date"
                  value={txDate}
                  onChange={(e) => setTxDate(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-white/5 hover:bg-white/8 focus:bg-bg-2 border border-white/5 focus:border-primary/20 text-xs font-bold text-white rounded-xl outline-none transition-all cursor-pointer"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                Status
              </label>
              <select 
                value={txStatus}
                onChange={(e) => setTxStatus(e.target.value as 'cleared' | 'pending')}
                className="w-full h-11 px-4 bg-white/5 border border-white/5 text-xs text-slate-300 font-bold rounded-xl outline-none focus:border-primary/20 cursor-pointer hover:bg-white/8 transition-all"
              >
                <option value="cleared" className="bg-bg-2">Cleared</option>
                <option value="pending" className="bg-bg-2">Pending</option>
              </select>
            </div>
          </div>

          {/* AI Categorization Suggested Tags */}
          <div className="space-y-2.5 p-4 rounded-xl bg-primary/5 border border-primary/10 select-none">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                AI Suggested Tags
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {DEFAULT_SUGGESTED_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setTxCategory(tag);
                    if (!txSource) setTxSource(tag);
                  }}
                  className={`px-2.5 py-1 text-[9px] font-bold rounded-lg border transition-all cursor-pointer ${
                    txCategory === tag
                      ? 'bg-primary/20 text-primary border-primary/30'
                      : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/8 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
              Notes (Optional)
            </label>
            <textarea
              placeholder="Add any extra details here..."
              value={txNotes}
              onChange={(e) => setTxNotes(e.target.value)}
              rows={2}
              className="w-full p-4 bg-white/5 hover:bg-white/8 focus:bg-bg-2 border border-white/5 focus:border-primary/20 text-xs text-white placeholder-slate-500 rounded-xl outline-none transition-all resize-none font-medium"
            />
          </div>

          {/* Modal Actions Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5 select-none gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Clear Form
            </button>
            <div className="flex items-center gap-3">
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
                Save Transaction
              </Button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
