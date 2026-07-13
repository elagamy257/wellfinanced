import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions.service';
import { DebtCreate } from '../types';
import { queryKeys } from '@/constants/queryKeys';

export function useCreateDebt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DebtCreate) => transactionsService.createDebt(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.debts.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
