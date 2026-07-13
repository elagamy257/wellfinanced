import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { dashboardKeys } from './queryKeys';

export function useExpenseStats() {
  return useQuery({
    queryKey: dashboardKeys.expenseStats(),
    queryFn: () => dashboardService.getExpenseStats(),
  });
}
