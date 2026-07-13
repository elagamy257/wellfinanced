import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { dashboardKeys } from './queryKeys';

export function useIncomeStats() {
  return useQuery({
    queryKey: dashboardKeys.incomeStats(),
    queryFn: () => dashboardService.getIncomeStats(),
  });
}
