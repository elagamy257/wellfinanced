import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { accountsService } from '../../services/accounts.service';
import { AccountCreate, AccountResponse } from '../../types';

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation<AccountResponse, Error, AccountCreate>({
    mutationFn: (data: AccountCreate) => accountsService.createAccount(data),
    onSuccess: () => {
      // Invalidate all account keys
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts.all });
      // Invalidate dashboard totals
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
