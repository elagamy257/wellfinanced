import { useMutation } from '@tanstack/react-query';
import { aiService } from '../../services/ai.service';
import { QuickAdviceRequest, QuickAdviceResponse } from '../../types';

export function useQuickAdvice() {
  return useMutation<QuickAdviceResponse, Error, QuickAdviceRequest>({
    mutationFn: (data: QuickAdviceRequest) => aiService.quickAdvice(data),
  });
}
