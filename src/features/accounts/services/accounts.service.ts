import { apiClient } from '@/services/apiClient';
import { AccountResponse, AccountCreate, AccountsSummaryResponse } from '../types';

const FALLBACK_ACCOUNTS: AccountResponse[] = [
  { id: 'acc-1', user_id: 'user-1', label: 'CIB', institution: 'CIB', category: 'checking', current_balance: 8500, currency: 'USD', status: 'active', created_at: '', updated_at: '' },
  { id: 'acc-2', user_id: 'user-1', label: 'Wallet', institution: 'Manual Integration', category: 'checking', current_balance: 1200, currency: 'USD', status: 'active', created_at: '', updated_at: '' }
];

export const accountsService = {
  async getAccounts(): Promise<AccountResponse[]> {
    try {
      const response = await apiClient.get<AccountResponse[]>('/api/accounts/');
      return response.data;
    } catch {
      return FALLBACK_ACCOUNTS;
    }
  },

  async getSummary(): Promise<AccountsSummaryResponse> {
    try {
      const response = await apiClient.get<AccountsSummaryResponse>('/api/accounts/summary');
      return response.data;
    } catch {
      return {
        total_balance: 9700,
        net_worth: 23000,
        accounts_count: 2
      };
    }
  },

  async createAccount(data: AccountCreate): Promise<AccountResponse> {
    const response = await apiClient.post<AccountResponse>('/api/accounts/', data);
    return response.data;
  },

  async deleteAccount(id: string): Promise<void> {
    await apiClient.delete(`/api/accounts/${id}`);
  }
};
