import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { settingsService } from '../../services/settings.service';

export function useSmoothedSalary() {
  return useQuery({
    queryKey: queryKeys.settings.smoothedSalary(),
    queryFn: () => settingsService.getSmoothedSalary(),
  });
}
