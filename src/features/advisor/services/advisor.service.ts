import { apiClient } from '@/services/apiClient';
import { 
  CanIAffordRequest, 
  CanIAffordResponse, 
  InstallmentRequest, 
  InstallmentResponse, 
  SavingsPlanRequest, 
  SavingsPlanResponse,
  PaymentPlanResponse
} from '../types';

export const advisorService = {
  async canIAfford(data: CanIAffordRequest): Promise<CanIAffordResponse> {
    const response = await apiClient.post<CanIAffordResponse>('/api/advisor/can-i-afford', data, { timeout: 60000 });
    return response.data;
  },

  async installmentImpact(data: InstallmentRequest): Promise<InstallmentResponse> {
    const response = await apiClient.post<InstallmentResponse>('/api/advisor/installment-impact', data, { timeout: 60000 });
    return response.data;
  },

  async savingsPlan(data: SavingsPlanRequest): Promise<SavingsPlanResponse> {
    const response = await apiClient.post<SavingsPlanResponse>('/api/advisor/savings-plan', data, { timeout: 60000 });
    return response.data;
  },

  async getPaymentPlan(strategy = 'hybrid', monthlyBudget?: number): Promise<PaymentPlanResponse> {
    const params: Record<string, string | number> = { strategy };
    if (monthlyBudget !== undefined && monthlyBudget > 0) {
      params.monthly_budget = monthlyBudget;
    }
    const response = await apiClient.get<PaymentPlanResponse>('/api/debts/payment-plan', { params, timeout: 60000 });
    return response.data;
  },

  async getWhichDebtFirst(): Promise<unknown> {
    const response = await apiClient.get<unknown>('/api/advisor/which-debt-first', { timeout: 60000 });
    return response.data;
  },

  async getPrioritizedDebts(strategy = 'hybrid', monthlyBudget?: number): Promise<unknown> {
    const params: Record<string, string | number> = { strategy };
    if (monthlyBudget !== undefined && monthlyBudget > 0) {
      params.monthly_budget = monthlyBudget;
    }
    const response = await apiClient.get<unknown>('/api/debts/prioritized', { params, timeout: 60000 });
    return response.data;
  }
};
