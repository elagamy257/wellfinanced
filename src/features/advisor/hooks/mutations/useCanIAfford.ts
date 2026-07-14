import { useMutation } from '@tanstack/react-query';
import { advisorService } from '../../services/advisor.service';
import { CanIAffordRequest, CanIAffordResponse } from '../../types';

export function useCanIAfford() {
  return useMutation<CanIAffordResponse, Error, CanIAffordRequest>({
    mutationFn: (data: CanIAffordRequest) => advisorService.canIAfford(data),
  });
}
