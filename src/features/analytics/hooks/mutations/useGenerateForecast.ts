import { useMutation, useQueryClient } from '@tanstack/react-query';
import { analyticsService } from '../../services/analytics.service';
import { queryKeys } from '@/constants/queryKeys';
import type { ForecastGenerateResponse } from '../../types';

export function useGenerateForecast() {
  const queryClient = useQueryClient();

  return useMutation<ForecastGenerateResponse, Error, number | undefined>({
    mutationFn: (months_ahead?: number) =>
      analyticsService.generateForecast(months_ahead ?? 3),
    onSettled: () => {
      // Invalidate all analytics queries so every component re-fetches
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics.all });
      // Also invalidate the dashboard forecast widget
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.forecast() });
    },
  });
}
