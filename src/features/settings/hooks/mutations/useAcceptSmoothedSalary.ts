import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../../services/settings.service';
import { queryKeys } from '@/constants/queryKeys';
import { AcceptSmoothedSalaryPayload } from '../../types';

export function useAcceptSmoothedSalary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AcceptSmoothedSalaryPayload) => settingsService.acceptSmoothedSalary(payload),
    onSuccess: () => {
      // Invalidate both settings and relevant analytics/dashboard queries
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.smoothedSalary() });
      queryClient.invalidateQueries({ queryKey: queryKeys.analytics.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.snapshot() });
    },
  });
}
