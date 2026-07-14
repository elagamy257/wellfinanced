import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { DebtCreate, DebtResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';

export function useCreateDebt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DebtCreate) => transactionsService.createDebt(data),
    onMutate: async (newDebt) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions.debts.all });

      const queryKey = queryKeys.transactions.debts.list({});
      const previousData = queryClient.getQueryData<DebtResponse[]>(queryKey);

      const tempId = `temp-debt-${Date.now()}`;
      const optimisticItem: DebtResponse = {
        id: tempId,
        user_id: 'temp-user',
        debt_name: newDebt.debt_name,
        total_amount: newDebt.total_amount,
        remaining_amount: newDebt.remaining_amount,
        monthly_payment: newDebt.monthly_payment,
        interest_rate: newDebt.interest_rate || 0,
        due_date: newDebt.due_date,
        priority: newDebt.priority || 1,
        status: newDebt.status || 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (previousData) {
        queryClient.setQueryData<DebtResponse[]>(queryKey, [
          optimisticItem,
          ...previousData,
        ]);
      }

      return { previousData, queryKey };
    },
    onError: (err, newDebt, context) => {
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
