import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../../services/analytics.service';
import { queryKeys } from '@/constants/queryKeys';
import type { ForecastLatestResponse } from '../../types';

export function useForecastLatest() {
  return useQuery<ForecastLatestResponse, Error>({
    queryKey: queryKeys.analytics.forecastLatest(),
    queryFn: () => analyticsService.getLatestForecast(),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
