'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout';
import { SectionTitle, Button, Card, Skeleton } from '@/components/ui';
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert,
  AlertCircle
} from 'lucide-react';
import { 
  TransactionItem,
  TransactionSummaryCard,
  TransactionFilterBar,
  TransactionTable,
  AddTransactionModal,
  useUnifiedTransactions,
  useCreateIncome,
  useCreateExpense,
  useCreateDebt,
  useDeleteIncome,
  useDeleteExpense,
  useDeleteDebt
} from '@/features/transactions';
import { formatCurrency } from '@/utils';

export default function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const { transactions, stats, isLoading, isError } = useUnifiedTransactions({
    searchQuery,
    filterType,
    filterStatus,
  });

  const createIncome = useCreateIncome();
  const createExpense = useCreateExpense();
  const createDebt = useCreateDebt();

  const deleteIncome = useDeleteIncome();
  const deleteExpense = useDeleteExpense();
  const deleteDebt = useDeleteDebt();

  // Handle Form Submission
  const handleSaveTransaction = async (tx: Omit<TransactionItem, 'id'>) => {
    try {
      if (tx.type === 'income') {
        await createIncome.mutateAsync({
          source_name: tx.source,
          amount: tx.amount,
          date: tx.date,
          status: tx.status,
        });
      } else if (tx.type === 'expense') {
        await createExpense.mutateAsync({
          category: tx.category || 'Development',
          amount: tx.amount,
          expense_date: tx.date,
          is_recurring: false,
        });
      } else if (tx.type === 'debt') {
        await createDebt.mutateAsync({
          debt_name: tx.source,
          total_amount: tx.amount,
          remaining_amount: tx.amount,
          monthly_payment: tx.amount > 120 ? Math.round(tx.amount / 12) : tx.amount,
          due_date: tx.date,
          status: 'active',
        });
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, type: 'income' | 'expense' | 'debt') => {
    try {
      if (type === 'income') {
        await deleteIncome.mutateAsync(id);
      } else if (type === 'expense') {
        await deleteExpense.mutateAsync(id);
      } else if (type === 'debt') {
        await deleteDebt.mutateAsync(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isError) {
    return (
      <PageContainer>
        <SectionTitle 
          title="Transactions Ledger" 
          subtitle="Manage client payments, service invoices, and operational infrastructure costs." 
        />
        <div className="py-12 flex flex-col items-center justify-center gap-4 text-danger select-none">
          <div className="w-14 h-14 rounded-full bg-danger/10 border border-danger/15 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-white">Failed to load transactions</h2>
          <p className="text-xs text-slate-400 max-w-sm text-center">
            There was an issue retrieving ledger logs. Please check your network and try again.
          </p>
        </div>
      </PageContainer>
    );
  }

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
        
        {/* Summary Widgets - Rendering Static Decoupled Mock Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
          {isLoading ? (
            <>
              <Skeleton variant="rect" className="h-[92px]" />
              <Skeleton variant="rect" className="h-[92px]" />
              <Skeleton variant="rect" className="h-[92px]" />
            </>
          ) : (
            <>
              <TransactionSummaryCard
                label="Total Income"
                value={formatCurrency(stats.totalIncome)}
                icon={TrendingUp}
                variant="success"
              />

              <TransactionSummaryCard
                label="Total Expenses"
                value={formatCurrency(stats.totalExpenses)}
                icon={TrendingDown}
                variant="pink"
              />

              <TransactionSummaryCard
                label="Allocated Debt"
                value={formatCurrency(stats.allocatedDebt)}
                icon={ShieldAlert}
                variant="danger"
              />
            </>
          )}
        </div>

        {/* Filters and Table Ledger */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/3 blur-[120px] pointer-events-none -z-10" />

          {/* Filter Bar Component */}
          <TransactionFilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterType={filterType}
            setFilterType={setFilterType}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          {/* Ledger Table Component */}
          {isLoading ? (
            <div className="p-6 space-y-4">
              <Skeleton variant="rect" className="w-full h-10" />
              <Skeleton variant="rect" className="w-full h-12" />
              <Skeleton variant="rect" className="w-full h-12" />
            </div>
          ) : (
            <TransactionTable
              transactions={transactions}
              onDelete={handleDelete}
            />
          )}
        </Card>
      </div>

      {/* Add Transaction Modal Overlay Component */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
      />
    </PageContainer>
  );
}
