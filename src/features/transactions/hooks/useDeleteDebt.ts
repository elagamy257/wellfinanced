import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions.service';
import { queryKeys } from '@/constants/queryKeys';

export function useDeleteDebt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionsService.deleteDebt(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.debts.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
