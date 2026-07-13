import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions.service';
import { TransactionFilterParams } from '../types';
import { queryKeys } from '@/constants/queryKeys';

export function useDebtList(params?: TransactionFilterParams) {
  return useQuery({
    queryKey: queryKeys.transactions.debts.list(params as Record<string, unknown> || {}),
    queryFn: () => transactionsService.getDebtList(params),
    retry: 2,
  });
}
