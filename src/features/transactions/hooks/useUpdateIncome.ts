import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions.service';
import { IncomeUpdate } from '../types';
import { queryKeys } from '@/constants/queryKeys';

interface UpdateIncomeParams {
  id: string;
  data: IncomeUpdate;
}

export function useUpdateIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateIncomeParams) => transactionsService.updateIncome(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.income.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
