import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../../services/analytics.service';
import { queryKeys } from '@/constants/queryKeys';
import type { ExpenseAnalysisResponse } from '../../types';

export function useExpenseAnalysis() {
  return useQuery<ExpenseAnalysisResponse, Error>({
    queryKey: queryKeys.analytics.expenseAnalysis(),
    queryFn: () => analyticsService.getExpenseAnalysis(),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
