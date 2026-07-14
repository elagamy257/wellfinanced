import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '../../services/transactions.service';
import { TransactionFilterParams, DebtResponse } from '../../types';
import { queryKeys } from '@/constants/queryKeys';
import { PaginatedResponse } from '@/types/api';

export function useDebtList(params?: TransactionFilterParams) {
  return useQuery<DebtResponse[], Error, PaginatedResponse<DebtResponse>>({
    queryKey: queryKeys.transactions.debts.list(params as Record<string, unknown> || {}),
    queryFn: () => transactionsService.getDebtList(params),
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
