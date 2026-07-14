import { useMemo } from 'react';
import { useIncomeList } from './useIncomeList';
import { useExpenseList } from './useExpenseList';
import { useDebtList } from './useDebtList';
import { TransactionItem } from '../../mocks';
import {
  mapIncomeToTransactionItem,
  mapExpenseToTransactionItem,
  mapDebtToTransactionItem,
} from '../../utils/mappers';

interface UnifiedFilterParams {
  searchQuery?: string;
  filterType?: string;
  filterStatus?: string;
}

export function useUnifiedTransactions(params?: UnifiedFilterParams) {
  const { data: incomeData, isLoading: isIncomeLoading, isError: isIncomeError } = useIncomeList();
  const { data: expensesData, isLoading: isExpensesLoading, isError: isExpensesError } = useExpenseList();
  const { data: debtsData, isLoading: isDebtsLoading, isError: isDebtsError } = useDebtList();

  const isLoading = isIncomeLoading || isExpensesLoading || isDebtsLoading;
  const isError = isIncomeError || isExpensesError || isDebtsError;

  const transactions = useMemo(() => {
    const rawIncome = incomeData?.items || [];
    const rawExpenses = expensesData?.items || [];
    const rawDebts = debtsData?.items || [];

    const normalizedIncome = rawIncome.map(mapIncomeToTransactionItem);
    const normalizedExpenses = rawExpenses.map(mapExpenseToTransactionItem);
    const normalizedDebts = rawDebts.map(mapDebtToTransactionItem);

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
  }, [incomeData, expensesData, debtsData, params]);

  // Compute stats based on the FULL (unfiltered) lists
  const stats = useMemo(() => {
    const rawIncome = incomeData?.items || [];
    const rawExpenses = expensesData?.items || [];
    const rawDebts = debtsData?.items || [];

    const totalIncome = rawIncome.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = rawExpenses.reduce((sum, item) => sum + item.amount, 0);
    const allocatedDebt = rawDebts.reduce((sum, item) => sum + item.monthly_payment, 0);

    return {
      totalIncome,
      totalExpenses,
      allocatedDebt,
    };
  }, [incomeData, expensesData, debtsData]);

  return {
    transactions,
    stats,
    isLoading,
    isError,
  };
}
