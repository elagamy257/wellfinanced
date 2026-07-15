import { apiClient } from '@/services/apiClient';
import { SmoothedSalaryConfig, AcceptSmoothedSalaryPayload, AcceptSmoothedSalaryResponse } from '../types';

export const settingsService = {
  async getSmoothedSalary(): Promise<SmoothedSalaryConfig> {
    try {
      const response = await apiClient.get<SmoothedSalaryConfig>('/api/smoothed-salary/current');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch smoothed salary config:', error);
      throw error;
    }
  },

  async acceptSmoothedSalary(payload: AcceptSmoothedSalaryPayload): Promise<AcceptSmoothedSalaryResponse> {
    const response = await apiClient.post<AcceptSmoothedSalaryResponse>('/api/smoothed-salary/accept', payload);
    return response.data;
  }
};
