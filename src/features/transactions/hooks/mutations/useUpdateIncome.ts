import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { IncomeUpdate, IncomeResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';

interface UpdateIncomeParams {
  id: string;
  data: IncomeUpdate;
}

export function useUpdateIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateIncomeParams) => transactionsService.updateIncome(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions.income.all });

      const queryKey = queryKeys.transactions.income.list({});
      const previousData = queryClient.getQueryData<IncomeResponse[]>(queryKey);

      if (previousData) {
        queryClient.setQueryData<IncomeResponse[]>(
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
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.income.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
