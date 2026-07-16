import { apiClient } from '@/services/apiClient';
import {
  SavingsGoalCreate,
  SavingsGoalResponse,
  SavingsGoalUpdate,
  SavingsGoalFilterParams,
} from '../types';

const FALLBACK_SAVINGS: SavingsGoalResponse[] = [
  { id: 'sav-1', user_id: 'user-1', goal_name: 'Emergency Fund', target_amount: 10000, saved_amount: 2500, deadline: '2027-07-15T00:00:00', created_at: '', updated_at: '' },
  { id: 'sav-2', user_id: 'user-1', goal_name: 'New MacBook', target_amount: 5000, saved_amount: 1500, deadline: '2027-01-15T00:00:00', created_at: '', updated_at: '' },
  { id: 'sav-3', user_id: 'user-1', goal_name: 'Vacation', target_amount: 3000, saved_amount: 800, deadline: '2027-03-15T00:00:00', created_at: '', updated_at: '' }
];

export const savingsService = {
  async getSavingsGoals(params?: SavingsGoalFilterParams): Promise<SavingsGoalResponse[]> {
    try {
      const response = await apiClient.get<SavingsGoalResponse[]>('/api/savings/', { params });
      return response.data;
    } catch {
      return FALLBACK_SAVINGS;
    }
  },

  async createSavingsGoal(data: SavingsGoalCreate): Promise<SavingsGoalResponse> {
    const response = await apiClient.post<SavingsGoalResponse>('/api/savings/', data);
    return response.data;
  },

  async updateSavingsGoal(id: string, data: SavingsGoalUpdate): Promise<SavingsGoalResponse> {
    const response = await apiClient.put<SavingsGoalResponse>(`/api/savings/${id}`, data);
    return response.data;
  },

  async deleteSavingsGoal(id: string): Promise<void> {
    await apiClient.delete(`/api/savings/${id}`);
  },
};
