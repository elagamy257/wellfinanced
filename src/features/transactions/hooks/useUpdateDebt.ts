import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../services/transactions.service';
import { DebtUpdate } from '../types';
import { queryKeys } from '@/constants/queryKeys';

interface UpdateDebtParams {
  id: string;
  data: DebtUpdate;
}

export function useUpdateDebt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateDebtParams) => transactionsService.updateDebt(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions.debts.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
