import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { IncomeCreate, IncomeResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';

export function useCreateIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IncomeCreate) => transactionsService.createIncome(data),
    onMutate: async (newIncome) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions.income.all });

      // Snapshot the previous state
      const queryKey = queryKeys.transactions.income.list({});
      const previousData = queryClient.getQueryData<IncomeResponse[]>(queryKey);

      // Optimistically insert item
      const tempId = `temp-income-${Date.now()}`;
      const optimisticItem: IncomeResponse = {
        id: tempId,
        user_id: 'temp-user',
        source_name: newIncome.source_name,
        amount: newIncome.amount,
        currency: newIncome.currency || 'USD',
        date: newIncome.date,
        status: newIncome.status || 'cleared',
        platform: newIncome.platform || undefined,
        month: newIncome.date.substring(0, 7) + '-01',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (previousData) {
        queryClient.setQueryData<IncomeResponse[]>(queryKey, [
          optimisticItem,
          ...previousData,
        ]);
      }

      return { previousData, queryKey };
    },
    onError: (err, newIncome, context) => {
      // Rollback to previous state
      if (context?.previousData) {
        queryClient.setQueryData(context.queryKey, context.previousData);
      }
    },
    onSettled: () => {
      // Refetch and sync
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.income.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
