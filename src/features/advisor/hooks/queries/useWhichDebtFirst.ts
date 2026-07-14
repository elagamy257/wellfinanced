import { useQuery } from '@tanstack/react-query';
import { advisorService } from '../../services/advisor.service';

export function useWhichDebtFirst() {
  return useQuery<unknown, Error>({
    queryKey: ['advisor', 'which-debt-first'],
    queryFn: () => advisorService.getWhichDebtFirst(),
    retry: false, // Don't spam retries for this unstable endpoint
  });
}
