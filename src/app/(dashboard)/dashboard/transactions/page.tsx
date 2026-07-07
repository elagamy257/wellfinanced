'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout';
import { SectionTitle, Button, Card, Badge, Input } from '@/components/ui';
import { 
  Plus, 
  Search, 
  X, 
  Sparkles, 
  Trash2, 
  Calendar as CalendarIcon, 
  Tag, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert 
} from 'lucide-react';
import { initialMockTransactions, mockSuggestedTags, TransactionItem } from '@/features/transactions';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionItem[]>(initialMockTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Form States
  const [txType, setTxType] = useState<'income' | 'expense' | 'debt'>('income');
  const [txAmount, setTxAmount] = useState('0.00');
  const [txSource, setTxSource] = useState('');
  const [txDate, setTxDate] = useState('2023-10-27');
  const [txStatus, setTxStatus] = useState<'cleared' | 'pending'>('cleared');
  const [txCategory, setTxCategory] = useState('Development');
  const [txNotes, setTxNotes] = useState('');

  // Handle Form Submission
  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txSource || Number(txAmount) <= 0) return;

    const prefix = txType === 'income' ? 'Client Payment' : (txType === 'expense' ? 'Business Expense' : 'Debt Allocation');
    const finalSource = `${prefix} / ${txSource}`;
    const amountVal = txType === 'income' ? Number(txAmount) : -Number(txAmount);

    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      source: finalSource,
      date: txDate,
      category: txCategory,
      amount: amountVal,
      type: txType,
      status: txStatus,
      notes: txNotes || undefined
    };

    setTransactions([newTx, ...transactions]);
    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setTxType('income');
    setTxAmount('0.00');
    setTxSource('');
    setTxDate('2023-10-27');
    setTxStatus('cleared');
    setTxCategory('Development');
    setTxNotes('');
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Filter Logic
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.source.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <PageContainer>
      {/* Page Header */}
      <SectionTitle 
        title="Transactions Ledger" 
        subtitle="Manage client payments, service invoices, and operational infrastructure costs." 
        action={
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </Button>
        }
      />

      <div className="space-y-6 pb-16">
        
        {/* Quick Summary Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
          <Card className="p-5 flex items-center justify-between border-l-4 border-success relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-success/3 rounded-full blur-[85px] pointer-events-none" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Total Income</span>
              <span className="text-xl font-black text-white mt-1 block">
                ${transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-success/10 border border-success/15 flex items-center justify-center text-success shadow-glow">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
          </Card>

          <Card className="p-5 flex items-center justify-between border-l-4 border-accent-pink relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-pink/3 rounded-full blur-[85px] pointer-events-none" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Total Expenses</span>
              <span className="text-xl font-black text-white mt-1 block">
                ${Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent-pink/10 border border-accent-pink/15 flex items-center justify-center text-accent-pink shadow-glow">
              <TrendingDown className="w-4.5 h-4.5" />
            </div>
          </Card>

          <Card className="p-5 flex items-center justify-between border-l-4 border-danger relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-danger/3 rounded-full blur-[85px] pointer-events-none" />
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Allocated Debt</span>
              <span className="text-xl font-black text-white mt-1 block">
                ${Math.abs(transactions.filter(t => t.type === 'debt').reduce((sum, t) => sum + t.amount, 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-danger/10 border border-danger/15 flex items-center justify-center text-danger shadow-glow">
              <ShieldAlert className="w-4.5 h-4.5" />
            </div>
          </Card>
        </div>

        {/* Filters and Table Ledger */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/3 blur-[120px] pointer-events-none -z-10" />

          {/* Filter Bar */}
          <div className="p-5 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search ledger..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-white/5 hover:bg-white/8 focus:bg-[#09152E] border border-white/5 focus:border-primary/20 text-xs font-bold text-white placeholder-slate-400 rounded-xl outline-none transition-all"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="h-11 px-4 bg-white/5 border border-white/5 text-xs text-slate-300 font-bold rounded-xl outline-none focus:border-primary/20 cursor-pointer hover:bg-white/8 transition-all"
              >
                <option value="all" className="bg-[#0b1329]">All Types</option>
                <option value="income" className="bg-[#0b1329]">Income</option>
                <option value="expense" className="bg-[#0b1329]">Expenses</option>
                <option value="debt" className="bg-[#0b1329]">Debt</option>
              </select>

              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-11 px-4 bg-white/5 border border-white/5 text-xs text-slate-300 font-bold rounded-xl outline-none focus:border-primary/20 cursor-pointer hover:bg-white/8 transition-all"
              >
                <option value="all" className="bg-[#0b1329]">All Statuses</option>
                <option value="cleared" className="bg-[#0b1329]">Cleared</option>
                <option value="pending" className="bg-[#0b1329]">Pending</option>
              </select>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse text-xs select-none">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-5 font-bold">Source / Payee</th>
                  <th className="p-5 font-bold">Date</th>
                  <th className="p-5 font-bold">Category</th>
                  <th className="p-5 font-bold text-right">Amount</th>
                  <th className="p-5 font-bold text-center">Status</th>
                  <th className="p-5 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-slate-400 font-medium leading-relaxed">
                      No transactions match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-white/2 transition-colors duration-150">
                      <td className="p-5 font-bold text-white min-w-[200px]">
                        {tx.source}
                        {tx.notes && (
                          <span className="text-[10px] font-normal text-slate-400 block mt-1 leading-normal italic">
                            Note: {tx.notes}
                          </span>
                        )}
                      </td>
                      <td className="p-5 text-slate-300 font-medium whitespace-nowrap">
                        {new Date(tx.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="p-5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-slate-300 font-bold">
                          <Tag className="w-3.5 h-3.5 text-primary/70" />
                          {tx.category}
                        </span>
                      </td>
                      <td className={`p-5 text-right font-black text-sm whitespace-nowrap ${
                        tx.type === 'income' ? 'text-success' : 'text-white'
                      }`}>
                        {tx.type === 'income' ? '+' : ''}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="p-5 text-center whitespace-nowrap">
                        <Badge 
                          variant={tx.status === 'cleared' ? 'mint' : 'yellow'}
                          className="font-bold text-[9px] uppercase tracking-widest"
                        >
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="p-5 text-center">
                        <button
                          onClick={() => handleDelete(tx.id)}
                          className="p-1.5 rounded-lg hover:bg-danger/10 text-slate-400 hover:text-danger transition-colors cursor-pointer"
                          aria-label="Delete Transaction"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Add Transaction Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#020617]/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          {/* Card Modal Container */}
          <div className="w-full max-w-[480px] bg-[#0c142c]/95 border border-white/10 rounded-card p-6 md:p-8 relative shadow-neon overflow-hidden animate-scale-in">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5 select-none">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span>Add Transaction</span>
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveTransaction} className="space-y-5 pt-5">
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
                    className="w-full h-14 pl-9 pr-4 bg-white/5 hover:bg-white/8 focus:bg-[#09152E] border border-white/5 focus:border-primary/20 text-lg font-black text-white placeholder-slate-500 rounded-xl outline-none transition-all"
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
                      className="w-full h-11 pl-10 pr-4 bg-white/5 hover:bg-white/8 focus:bg-[#09152E] border border-white/5 focus:border-primary/20 text-xs font-bold text-white rounded-xl outline-none transition-all cursor-pointer"
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
                    <option value="cleared" className="bg-[#0b1329]">Cleared</option>
                    <option value="pending" className="bg-[#0b1329]">Pending</option>
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
                  {mockSuggestedTags.map((tag) => (
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
                  className="w-full p-4 bg-white/5 hover:bg-white/8 focus:bg-[#09152E] border border-white/5 focus:border-primary/20 text-xs text-white placeholder-slate-500 rounded-xl outline-none transition-all resize-none font-medium"
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
                    onClick={() => setIsModalOpen(false)}
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
      )}

    </PageContainer>
  );
}
