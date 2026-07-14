import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { ExpenseUpdate, ExpenseResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';

interface UpdateExpenseParams {
  id: string;
  data: ExpenseUpdate;
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateExpenseParams) => transactionsService.updateExpense(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions.expenses.all });

      const queryKey = queryKeys.transactions.expenses.list({});
      const previousData = queryClient.getQueryData<ExpenseResponse[]>(queryKey);

      if (previousData) {
        queryClient.setQueryData<ExpenseResponse[]>(
          queryKey,
          previousData.map((item) => (item.id === id ? { ...item, ...data } : item))
        );
      }

      return { previousData, queryKey };
    },
    onError: (err, variables, context) => {
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
