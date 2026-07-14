import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { DebtResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';

export function useDeleteDebt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionsService.deleteDebt(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions.debts.all });

      const queryKey = queryKeys.transactions.debts.list({});
      const previousData = queryClient.getQueryData<DebtResponse[]>(queryKey);

      if (previousData) {
        queryClient.setQueryData<DebtResponse[]>(
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
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.debts.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
