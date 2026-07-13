import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { dashboardKeys } from './queryKeys';

export function useDashboardSavings() {
  return useQuery({
    queryKey: [...dashboardKeys.all, 'savings'] as const,
    queryFn: () => dashboardService.getSavingsGoals(),
  });
}
