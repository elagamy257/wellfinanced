import { useMutation } from '@tanstack/react-query';
import { advisorService } from '../../services/advisor.service';
import { SavingsPlanRequest, SavingsPlanResponse } from '../../types';

export function useSavingsPlan() {
  return useMutation<SavingsPlanResponse, Error, SavingsPlanRequest>({
    mutationFn: (data: SavingsPlanRequest) => advisorService.savingsPlan(data),
  });
}
