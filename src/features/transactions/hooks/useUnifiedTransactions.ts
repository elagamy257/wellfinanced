import { useMemo } from 'react';
import { useIncomeList } from './useIncomeList';
import { useExpenseList } from './useExpenseList';
import { useDebtList } from './useDebtList';
import { TransactionItem } from '../mocks';

interface UnifiedFilterParams {
  searchQuery?: string;
  filterType?: string;
  filterStatus?: string;
}

export function useUnifiedTransactions(params?: UnifiedFilterParams) {
  const { data: income, isLoading: isIncomeLoading, isError: isIncomeError } = useIncomeList();
  const { data: expenses, isLoading: isExpensesLoading, isError: isExpensesError } = useExpenseList();
  const { data: debts, isLoading: isDebtsLoading, isError: isDebtsError } = useDebtList();

  const isLoading = isIncomeLoading || isExpensesLoading || isDebtsLoading;
  const isError = isIncomeError || isExpensesError || isDebtsError;

  const transactions = useMemo(() => {
    const normalizedIncome = (income || []).map((item) => ({
      id: item.id,
      source: item.source_name,
      date: item.date,
      category: 'Service Revenue',
      amount: item.amount,
      type: 'income' as const,
      status: (item.status === 'pending' ? 'pending' : 'cleared') as 'cleared' | 'pending',
      notes: item.platform ? `Platform: ${item.platform}` : undefined,
    }));

    const normalizedExpenses = (expenses || []).map((item) => ({
      id: item.id,
      source: item.category,
      date: item.expense_date,
      category: item.category,
      amount: -item.amount,
      type: 'expense' as const,
      status: 'cleared' as 'cleared' | 'pending',
      notes: item.is_recurring ? 'Recurring Expense' : undefined,
    }));

    const normalizedDebts = (debts || []).map((item) => ({
      id: item.id,
      source: item.debt_name,
      date: item.due_date,
      category: 'Debt Repayment',
      amount: -item.monthly_payment,
      type: 'debt' as const,
      status: (item.status === 'pending' ? 'pending' : 'cleared') as 'cleared' | 'pending',
      notes: `Interest Rate: ${item.interest_rate}%`,
    }));

    let list: TransactionItem[] = [...normalizedIncome, ...normalizedExpenses, ...normalizedDebts];

    // Sort by date descending
    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Apply filters
    if (params) {
      const { searchQuery, filterType, filterStatus } = params;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        list = list.filter(
          (item) =>
            item.source.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            (item.notes && item.notes.toLowerCase().includes(q))
        );
      }

      if (filterType && filterType !== 'all') {
        list = list.filter((item) => item.type === filterType);
      }

      if (filterStatus && filterStatus !== 'all') {
        list = list.filter((item) => item.status === filterStatus);
      }
    }

    return list;
  }, [income, expenses, debts, params]);

  // Compute stats based on the FULL (unfiltered) lists
  const stats = useMemo(() => {
    const totalIncome = (income || []).reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = (expenses || []).reduce((sum, item) => sum + item.amount, 0);
    const allocatedDebt = (debts || []).reduce((sum, item) => sum + item.monthly_payment, 0);

    return {
      totalIncome,
      totalExpenses,
      allocatedDebt,
    };
  }, [income, expenses, debts]);

  return {
    transactions,
    stats,
    isLoading,
    isError,
  };
}
