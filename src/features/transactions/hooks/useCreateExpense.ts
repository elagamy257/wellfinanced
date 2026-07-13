import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions.service';
import { ExpenseCreate } from '../types';
import { queryKeys } from '@/constants/queryKeys';

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ExpenseCreate) => transactionsService.createExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.expenses.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
