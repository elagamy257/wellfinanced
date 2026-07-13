import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions.service';
import { queryKeys } from '@/constants/queryKeys';

export function useDeleteIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionsService.deleteIncome(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.income.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
