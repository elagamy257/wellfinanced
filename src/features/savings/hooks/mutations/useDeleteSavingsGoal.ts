import { useMutation, useQueryClient } from '@tanstack/react-query';
import { savingsService } from '../../services/savings.service';
import { SavingsGoalResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';

export function useDeleteSavingsGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => savingsService.deleteSavingsGoal(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.savings.all });

      const queryKey = queryKeys.savings.list({});
      const previousData = queryClient.getQueryData<SavingsGoalResponse[]>(queryKey);

      if (previousData) {
        queryClient.setQueryData<SavingsGoalResponse[]>(
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
      queryClient.invalidateQueries({ queryKey: queryKeys.savings.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
