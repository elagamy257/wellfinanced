import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions.service';
import { TransactionFilterParams } from '../types';
import { queryKeys } from '@/constants/queryKeys';

export function useExpenseList(params?: TransactionFilterParams) {
  return useQuery({
    queryKey: queryKeys.transactions.expenses.list(params as Record<string, unknown> || {}),
    queryFn: () => transactionsService.getExpenseList(params),
    retry: 2,
  });
}
