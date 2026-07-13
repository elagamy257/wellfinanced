import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard.service';
import { dashboardKeys } from './queryKeys';

export function useLatestForecast() {
  return useQuery({
    queryKey: dashboardKeys.forecast(),
    queryFn: () => dashboardService.getLatestForecast(),
  });
}
