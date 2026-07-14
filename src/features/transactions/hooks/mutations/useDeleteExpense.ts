import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { ExpenseResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionsService.deleteExpense(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions.expenses.all });

      const queryKey = queryKeys.transactions.expenses.list({});
      const previousData = queryClient.getQueryData<ExpenseResponse[]>(queryKey);

      if (previousData) {
        queryClient.setQueryData<ExpenseResponse[]>(
          queryKey,
          previousData.filter((item) => item.id !== id)
        );
      }

      return { previousData, queryKey };
    },
    onError: (err, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(context.queryKey, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.expenses.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
