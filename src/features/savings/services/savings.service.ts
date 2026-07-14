import { apiClient } from '@/services/apiClient';
import {
  SavingsGoalCreate,
  SavingsGoalResponse,
  SavingsGoalUpdate,
  SavingsGoalFilterParams,
} from '../types';

export const savingsService = {
  async getSavingsGoals(params?: SavingsGoalFilterParams): Promise<SavingsGoalResponse[]> {
    const response = await apiClient.get<SavingsGoalResponse[]>('/api/savings/', { params });
    return response.data;
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
