import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { ExpenseCreate, ExpenseResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ExpenseCreate) => transactionsService.createExpense(data),
    onMutate: async (newExpense) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions.expenses.all });

      const queryKey = queryKeys.transactions.expenses.list({});
      const previousData = queryClient.getQueryData<ExpenseResponse[]>(queryKey);

      const tempId = `temp-expense-${Date.now()}`;
      const optimisticItem: ExpenseResponse = {
        id: tempId,
        user_id: 'temp-user',
        category: newExpense.category,
        amount: newExpense.amount,
        expense_date: newExpense.expense_date,
        month: newExpense.expense_date.substring(0, 7) + '-01',
        is_recurring: newExpense.is_recurring || false,
        recurrence_rule: newExpense.recurrence_rule || undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (previousData) {
        queryClient.setQueryData<ExpenseResponse[]>(queryKey, [
          optimisticItem,
          ...previousData,
        ]);
      }

      return { previousData, queryKey };
    },
    onError: (err, newExpense, context) => {
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
