'use client';

import React, { useState } from 'react';
import { Card, Input, Button, Select } from '@/components/ui';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  RefreshCw, 
  Building,
  PiggyBank
} from 'lucide-react';
import { useAccounts } from '../hooks/queries/useAccounts';
import { useAccountsSummary } from '../hooks/queries/useAccountsSummary';
import { useCreateAccount } from '../hooks/mutations/useCreateAccount';
import { useDeleteAccount } from '../hooks/mutations/useDeleteAccount';

export function ConnectedAccountsCard() {
  const [isLinking, setIsLinking] = useState(false);
  const [label, setLabel] = useState('');
  const [institution, setInstitution] = useState('');
  const [category, setCategory] = useState('checking');
  const [balance, setBalance] = useState('');
  const [formError, setFormError] = useState('');

  const { data: accounts = [], isLoading: isAccountsLoading, isError: isAccountsError, refetch: refetchAccounts } = useAccounts();
  const { data: summary, isLoading: isSummaryLoading, isError: isSummaryError, refetch: refetchSummary } = useAccountsSummary();

  const createAccountMut = useCreateAccount();
  const deleteAccountMut = useDeleteAccount();

  const handleLinkAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!label.trim()) {
      setFormError('Please enter an account name label.');
      return;
    }

    const parsedBalance = balance ? parseFloat(balance) : 0;
    if (isNaN(parsedBalance)) {
      setFormError('Please enter a valid balance.');
      return;
    }

    createAccountMut.mutate(
      {
        label: label.trim(),
        institution: institution.trim() || 'Manual Integration',
        category,
        current_balance: parsedBalance,
        currency: 'USD',
        status: 'active'
      },
      {
        onSuccess: () => {
          setIsLinking(false);
          setLabel('');
          setInstitution('');
          setCategory('checking');
          setBalance('');
        },
        onError: () => {
          setFormError('Failed to save account. Please try again.');
        }
      }
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to disconnect this account ledger?')) {
      deleteAccountMut.mutate(id);
    }
  };

  const handleRetry = () => {
    refetchAccounts();
    refetchSummary();
  };

  const categoryOptions = [
    { value: 'checking', label: 'Checking Account' },
    { value: 'savings', label: 'Savings Vault' },
    { value: 'credit', label: 'Credit Card' },
    { value: 'investment', label: 'Investment Portfolio' },
  ];

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'savings': return 'bg-success/10 border-success/15 text-success';
      case 'credit': return 'bg-accent-pink/10 border-accent-pink/15 text-accent-pink';
      case 'investment': return 'bg-primary/10 border-primary/15 text-primary';
      default: return 'bg-cyan/10 border-cyan/15 text-cyan';
    }
  };

  return (
    <Card variant="glass" className="p-6 md:p-8 border border-white/5 bg-bg-1/40 relative overflow-hidden select-none">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-cyan/5 rounded-full blur-[70px] pointer-events-none -z-10" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-cyan" />
            <span>Connected Accounts</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Manage your physical checking, savings, and credit ledger connections.
          </p>
        </div>

        {!isLinking && (
          <Button
            size="sm"
            variant="cyan"
            onClick={() => setIsLinking(true)}
            className="flex items-center gap-1.5 self-start sm:self-auto text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Link Account</span>
          </Button>
        )}
      </div>

      {/* ERROR LOADING STATE */}
      {(isAccountsError || isSummaryError) && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/15 text-slate-200 mb-6 animate-scale-in">
          <div className="flex items-center gap-2 text-danger font-bold text-xs">
            <AlertTriangle className="w-4.5 h-4.5 animate-bounce" />
            <span>Connection Failure</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
            Failed to retrieve bank integrations. Your connection settings are preserved.
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-3 h-8 px-4 bg-danger/15 hover:bg-danger/20 border border-danger/25 text-[9px] font-black uppercase tracking-widest text-danger rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* SUMMARY STATS BAR */}
      {summary && !isSummaryLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 pt-1 animate-scale-in">
          <div className="p-4 rounded-xl bg-bg-3/50 border border-white/5 space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Total Balance</span>
            <span className="text-sm font-black text-white">
              ${(summary.total_balance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-bg-3/50 border border-white/5 space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Net Worth Assets</span>
            <span className="text-sm font-black text-success">
              ${(summary.net_worth ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="p-4 rounded-xl bg-bg-3/50 border border-white/5 space-y-1 col-span-2 md:col-span-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Total Institutions</span>
            <span className="text-sm font-black text-cyan">
              {accounts.length} Ledgers
            </span>
          </div>
        </div>
      )}

      {/* MANUAL LINK FORM INLINE */}
      {isLinking && (
        <div className="mb-6 p-5 rounded-xl border border-cyan/20 bg-cyan/5 space-y-4 animate-scale-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-cyan">Link Bank Account</span>
            <button
              type="button"
              onClick={() => setIsLinking(false)}
              className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-wider"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleLinkAccount} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="link-label"
                label="Account Label / Name"
                placeholder="e.g. Chase Business Checking"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                disabled={createAccountMut.isPending}
                className="text-white text-xs h-10"
              />
              <Input
                id="link-institution"
                label="Financial Institution (Optional)"
                placeholder="e.g. JPMorgan Chase"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                disabled={createAccountMut.isPending}
                className="text-white text-xs h-10"
              />
              <Select
                label="Account Category"
                value={category}
                onChange={setCategory}
                options={categoryOptions}
              />
              <Input
                id="link-balance"
                label="Initial Balance ($)"
                type="number"
                placeholder="e.g. 15000"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                disabled={createAccountMut.isPending}
                className="text-white text-xs h-10"
              />
            </div>

            {formError && (
              <span className="text-xs text-danger font-medium block">{formError}</span>
            )}

            <Button
              type="submit"
              variant="cyan"
              size="sm"
              isLoading={createAccountMut.isPending}
              disabled={createAccountMut.isPending || !label.trim()}
            >
              Confirm Account Link
            </Button>
          </form>
        </div>
      )}

      {/* ACCOUNTS LIST */}
      {isAccountsLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 w-full rounded-xl bg-white/5 animate-pulse border border-white/5" />
          ))}
        </div>
      ) : accounts.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-white/10 rounded-2xl bg-white/3 select-none">
          <PiggyBank className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">No connected accounts found</p>
          <p className="text-[10px] text-slate-500 mt-1">Link your business accounts to start tracking liquidity ratios.</p>
        </div>
      ) : (
        <div className="space-y-3 animate-scale-in">
          {accounts.map((acc) => (
            <div 
              key={acc.id} 
              className="p-4 rounded-xl border border-white/5 bg-bg-3/40 hover:bg-bg-3/60 transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white leading-none">{acc.label}</span>
                    <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-md border ${getCategoryBadgeColor(acc.category)}`}>
                      {acc.category}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium block mt-1">
                    {acc.institution || 'Manual Ledger'} • {acc.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs font-black text-white block">
                    ${acc.current_balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[8px] text-slate-500 font-black uppercase block tracking-widest mt-0.5">
                    {acc.currency}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(acc.id)}
                  disabled={deleteAccountMut.isPending}
                  className="p-1.5 text-slate-500 hover:text-danger hover:bg-danger/10 border border-transparent hover:border-danger/15 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                  aria-label="Disconnect account"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
