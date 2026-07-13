import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions.service';
import { IncomeCreate } from '../types';
import { queryKeys } from '@/constants/queryKeys';

export function useCreateIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IncomeCreate) => transactionsService.createIncome(data),
    onSuccess: () => {
      // Invalidate both transactions list and dashboard statistics
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.income.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
