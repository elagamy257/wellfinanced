import { useMutation, useQueryClient } from '@tanstack/react-query';
import { savingsService } from '../../services/savings.service';
import { SavingsGoalCreate, SavingsGoalResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';

export function useCreateSavingsGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SavingsGoalCreate) => savingsService.createSavingsGoal(data),
    onMutate: async (newGoal) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.savings.all });

      const queryKey = queryKeys.savings.list({});
      const previousData = queryClient.getQueryData<SavingsGoalResponse[]>(queryKey);

      const tempId = `temp-goal-${Date.now()}`;
      const optimisticItem: SavingsGoalResponse = {
        id: tempId,
        user_id: 'temp-user',
        goal_name: newGoal.goal_name,
        target_amount: newGoal.target_amount,
        saved_amount: newGoal.saved_amount || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (previousData) {
        queryClient.setQueryData<SavingsGoalResponse[]>(queryKey, [
          optimisticItem,
          ...previousData,
        ]);
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
