import { useMutation, useQueryClient } from '@tanstack/react-query';
import { savingsService } from '../../services/savings.service';
import { SavingsGoalUpdate, SavingsGoalResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';

interface UpdateGoalParams {
  id: string;
  data: SavingsGoalUpdate;
}

export function useUpdateSavingsGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateGoalParams) => savingsService.updateSavingsGoal(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.savings.all });

      const queryKey = queryKeys.savings.list({});
      const previousData = queryClient.getQueryData<SavingsGoalResponse[]>(queryKey);

      if (previousData) {
        queryClient.setQueryData<SavingsGoalResponse[]>(
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
      queryClient.invalidateQueries({ queryKey: queryKeys.savings.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
