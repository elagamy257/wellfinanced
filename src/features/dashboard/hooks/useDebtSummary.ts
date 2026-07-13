import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { dashboardKeys } from './queryKeys';

export function useDebtSummary() {
  return useQuery({
    queryKey: dashboardKeys.debtSummary(),
    queryFn: () => dashboardService.getDebtSummary(),
  });
}
