import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { dashboardKeys } from './queryKeys';

export interface DashboardTransaction {
  id: string;
  source: string;
  date: string;
  category: string;
  amount: number;
  type: 'income' | 'expense' | 'debt';
  status: string;
}

export function useDashboardRecentTransactions() {
  return useQuery({
    queryKey: [...dashboardKeys.all, 'recentTransactions'] as const,
    queryFn: async (): Promise<DashboardTransaction[]> => {
      const [income, expenses] = await Promise.all([
        dashboardService.getRecentIncome(),
        dashboardService.getRecentExpenses(),
      ]);

      const normalizedIncome = (income || []).map((item) => ({
        id: item.id,
        source: item.source_name || 'Client Payment',
        date: item.date,
        category: 'Service Revenue',
        amount: item.amount,
        type: 'income' as const,
        status: item.status || 'cleared',
      }));

      const normalizedExpenses = (expenses || []).map((item) => ({
        id: item.id,
        source: item.category || 'Business Expense',
        date: item.expense_date,
        category: item.category,
        amount: -item.amount,
        type: 'expense' as const,
        status: 'cleared',
      }));

      return [...normalizedIncome, ...normalizedExpenses].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    },
  });
}
