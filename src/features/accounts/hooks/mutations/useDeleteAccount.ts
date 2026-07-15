import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { accountsService } from '../../services/accounts.service';

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => accountsService.deleteAccount(id),
    onSuccess: () => {
      // Invalidate all account keys
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts.all });
      // Invalidate dashboard totals
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all });
    },
  });
}
