import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { dashboardKeys } from './queryKeys';

export function useDashboardSnapshot() {
  return useQuery({
    queryKey: dashboardKeys.snapshot(),
    queryFn: () => dashboardService.getSnapshot(),
  });
}
