import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { accountsService } from '../../services/accounts.service';
import { AccountResponse } from '../../types';

export function useAccounts() {
  return useQuery<AccountResponse[], Error>({
    queryKey: queryKeys.accounts.lists(),
    queryFn: () => accountsService.getAccounts(),
  });
}
