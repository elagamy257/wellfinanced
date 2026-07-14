import { useQuery } from '@tanstack/react-query';
import { savingsService } from '../../services/savings.service';
import { SavingsGoalFilterParams, SavingsGoalResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';
import { PaginatedResponse } from '@/types/api';

export function useSavingsList(params?: SavingsGoalFilterParams) {
  return useQuery<SavingsGoalResponse[], Error, PaginatedResponse<SavingsGoalResponse>>({
    queryKey: queryKeys.savings.list(params as Record<string, unknown> || {}),
    queryFn: () => savingsService.getSavingsGoals(params),
    select: (data) => {
      const page = params?.page || 1;
      const size = params?.size || data.length;
      const total = data.length;
      const pages = Math.ceil(total / size) || 1;

      return {
        items: data,
        total,
        page,
        size,
        pages,
      };
    },
    retry: 2,
  });
}
