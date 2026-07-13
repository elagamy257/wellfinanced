import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions.service';
import { ExpenseUpdate } from '../types';
import { queryKeys } from '@/constants/queryKeys';

interface UpdateExpenseParams {
  id: string;
  data: ExpenseUpdate;
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateExpenseParams) => transactionsService.updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.expenses.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
