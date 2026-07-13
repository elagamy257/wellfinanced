import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions.service';
import { TransactionFilterParams } from '../types';
import { queryKeys } from '@/constants/queryKeys';

export function useIncomeList(params?: TransactionFilterParams) {
  return useQuery({
    queryKey: queryKeys.transactions.income.list(params as Record<string, unknown> || {}),
    queryFn: () => transactionsService.getIncomeList(params),
    retry: 2,
  });
}
