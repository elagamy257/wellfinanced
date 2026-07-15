import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { accountsService } from '../../services/accounts.service';
import { AccountsSummaryResponse } from '../../types';

export function useAccountsSummary() {
  return useQuery<AccountsSummaryResponse, Error>({
    queryKey: queryKeys.accounts.summary(),
    queryFn: () => accountsService.getSummary(),
  });
}
