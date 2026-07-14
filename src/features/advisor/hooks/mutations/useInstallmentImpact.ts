import { useMutation } from '@tanstack/react-query';
import { advisorService } from '../../services/advisor.service';
import { InstallmentRequest, InstallmentResponse } from '../../types';

export function useInstallmentImpact() {
  return useMutation<InstallmentResponse, Error, InstallmentRequest>({
    mutationFn: (data: InstallmentRequest) => advisorService.installmentImpact(data),
  });
}
