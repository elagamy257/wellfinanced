import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { TransactionFilterParams, ExpenseResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';
import { PaginatedResponse } from '@/types/api';

export function useExpenseList(params?: TransactionFilterParams) {
  return useQuery<ExpenseResponse[], Error, PaginatedResponse<ExpenseResponse>>({
    queryKey: queryKeys.transactions.expenses.list(params as Record<string, unknown> || {}),
    queryFn: () => transactionsService.getExpenseList(params),
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
