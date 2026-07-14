import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { IncomeResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';

export function useDeleteIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionsService.deleteIncome(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions.income.all });

      const queryKey = queryKeys.transactions.income.list({});
      const previousData = queryClient.getQueryData<IncomeResponse[]>(queryKey);

      if (previousData) {
        queryClient.setQueryData<IncomeResponse[]>(
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
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.income.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
