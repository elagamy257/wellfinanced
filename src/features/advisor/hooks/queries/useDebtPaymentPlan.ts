import { useQuery } from '@tanstack/react-query';
import { advisorService } from '../../services/advisor.service';
import { PaymentPlanResponse } from '../../types';

export function useDebtPaymentPlan(strategy = 'hybrid', monthlyBudget?: number) {
  return useQuery<PaymentPlanResponse, Error>({
    queryKey: ['advisor', 'payment-plan', strategy, monthlyBudget],
    queryFn: () => advisorService.getPaymentPlan(strategy, monthlyBudget),
  });
}
