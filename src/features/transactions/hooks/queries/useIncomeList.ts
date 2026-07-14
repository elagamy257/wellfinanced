import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { TransactionFilterParams, IncomeResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';
import { PaginatedResponse } from '@/types/api';

export function useIncomeList(params?: TransactionFilterParams) {
  return useQuery<IncomeResponse[], Error, PaginatedResponse<IncomeResponse>>({
    queryKey: queryKeys.transactions.income.list(params as Record<string, unknown> || {}),
    queryFn: () => transactionsService.getIncomeList(params),
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
