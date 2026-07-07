'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layout';
import { SectionTitle, Button, Card } from '@/components/ui';
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert 
} from 'lucide-react';
import { 
  initialMockTransactions, 
  mockSummaryMetrics, 
  TransactionItem,
  TransactionSummaryCard,
  TransactionFilterBar,
  TransactionTable,
  AddTransactionModal
} from '@/features/transactions';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionItem[]>(initialMockTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Handle Form Submission
  const handleSaveTransaction = (tx: Omit<TransactionItem, 'id'>) => {
    const prefix = tx.type === 'income' ? 'Client Payment' : (tx.type === 'expense' ? 'Business Expense' : 'Debt Allocation');
    const finalSource = `${prefix} / ${tx.source}`;
    const amountVal = tx.type === 'income' ? tx.amount : -tx.amount;

    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      source: finalSource,
      date: tx.date,
      category: tx.category,
      amount: amountVal,
      type: tx.type,
      status: tx.status,
      notes: tx.notes
    };

    setTransactions([newTx, ...transactions]);
    setIsModalOpen(false);
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
        
        {/* Summary Widgets - Rendering Static Decoupled Mock Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
          <TransactionSummaryCard
            label="Total Income"
            value={`$${mockSummaryMetrics.totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            icon={TrendingUp}
            variant="success"
          />

          <TransactionSummaryCard
            label="Total Expenses"
            value={`$${mockSummaryMetrics.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            icon={TrendingDown}
            variant="pink"
          />

          <TransactionSummaryCard
            label="Allocated Debt"
            value={`$${mockSummaryMetrics.allocatedDebt.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            icon={ShieldAlert}
            variant="danger"
          />
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
          <TransactionTable
            transactions={filteredTransactions}
            onDelete={handleDelete}
          />
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
