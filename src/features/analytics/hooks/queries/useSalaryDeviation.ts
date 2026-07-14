import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../../services/analytics.service';
import { queryKeys } from '@/constants/queryKeys';
import type { SalaryDeviationResponse } from '../../types';

export function useSalaryDeviation() {
  return useQuery<SalaryDeviationResponse, Error>({
    queryKey: queryKeys.analytics.salaryDeviation(),
    queryFn: () => analyticsService.getSalaryDeviation(),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
