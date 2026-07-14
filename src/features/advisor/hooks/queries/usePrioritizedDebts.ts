import { useQuery } from '@tanstack/react-query';
import { advisorService } from '../../services/advisor.service';

export function usePrioritizedDebts(strategy = 'hybrid', monthlyBudget?: number) {
  return useQuery<unknown, Error>({
    queryKey: ['advisor', 'prioritized', strategy, monthlyBudget],
    queryFn: () => advisorService.getPrioritizedDebts(strategy, monthlyBudget),
    retry: false, // Don't spam retries for this unstable endpoint
  });
}
