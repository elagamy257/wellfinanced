import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { queryKeys } from '@/constants/queryKeys';

export function useDebtSummary() {
  return useQuery({
    queryKey: queryKeys.transactions.debts.summary(),
    queryFn: () => transactionsService.getDebtSummary(),
    retry: 2,
  });
}
