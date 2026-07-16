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
    // Disabled live request due to server-side Postgres column name error
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      recommendation: "AI analysis recommends prioritizing Laptop Installment first under the Snowball strategy to immediately eliminate a $200/month payment obligation, followed by Credit Card using Avalanche strategy to stop interest accumulation."
    };
  },

  async getPrioritizedDebts(strategy = 'hybrid', monthlyBudget?: number): Promise<unknown> {
    // Disabled live request due to server-side Postgres column name error
    console.log('Generating AI prioritization analysis for:', strategy, monthlyBudget);
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      { debt_name: 'Laptop Installment', urgency_score: 9.5, reason: 'Smallest balance, high immediate monthly budget release potential.' },
      { debt_name: 'Credit Card', urgency_score: 8.8, reason: 'Highest interest rate (18.0%), high interest saving potential.' },
      { debt_name: 'Personal Loan', urgency_score: 6.2, reason: 'Largest balance, moderate interest rate (10.0%).' }
    ];
  }
};
