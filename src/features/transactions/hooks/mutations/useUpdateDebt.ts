import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { DebtUpdate, DebtResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';

interface UpdateDebtParams {
  id: string;
  data: DebtUpdate;
}

export function useUpdateDebt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateDebtParams) => transactionsService.updateDebt(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions.debts.all });

      const queryKey = queryKeys.transactions.debts.list({});
      const previousData = queryClient.getQueryData<DebtResponse[]>(queryKey);

      if (previousData) {
        queryClient.setQueryData<DebtResponse[]>(
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
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.debts.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
