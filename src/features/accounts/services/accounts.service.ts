import { apiClient } from '@/services/apiClient';
import { AccountResponse, AccountCreate, AccountsSummaryResponse } from '../types';

export const accountsService = {
  async getAccounts(): Promise<AccountResponse[]> {
    const response = await apiClient.get<AccountResponse[]>('/api/accounts/');
    return response.data;
  },

  async getSummary(): Promise<AccountsSummaryResponse> {
    const response = await apiClient.get<AccountsSummaryResponse>('/api/accounts/summary');
    return response.data;
  },

  async createAccount(data: AccountCreate): Promise<AccountResponse> {
    const response = await apiClient.post<AccountResponse>('/api/accounts/', data);
    return response.data;
  },

  async deleteAccount(id: string): Promise<void> {
    await apiClient.delete(`/api/accounts/${id}`);
  }
};
