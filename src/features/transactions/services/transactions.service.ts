import { apiClient } from '@/services/apiClient';
import {
  IncomeCreate,
  IncomeResponse,
  IncomeUpdate,
  ExpenseCreate,
  ExpenseResponse,
  ExpenseUpdate,
  DebtCreate,
  DebtResponse,
  DebtUpdate,
  TransactionFilterParams,
} from '../types';
import { DebtSummary } from '@/features/dashboard/types';

export const transactionsService = {
  // --- Income APIs ---
  async getIncomeList(params?: TransactionFilterParams): Promise<IncomeResponse[]> {
    const response = await apiClient.get<IncomeResponse[]>('/api/income/', { params });
    return response.data;
  },

  async createIncome(data: IncomeCreate): Promise<IncomeResponse> {
    const response = await apiClient.post<IncomeResponse>('/api/income/', data);
    return response.data;
  },

  async updateIncome(id: string, data: IncomeUpdate): Promise<IncomeResponse> {
    const response = await apiClient.put<IncomeResponse>(`/api/income/${id}`, data);
    return response.data;
  },

  async deleteIncome(id: string): Promise<void> {
    await apiClient.delete(`/api/income/${id}`);
  },

  // --- Expenses APIs ---
  async getExpenseList(params?: TransactionFilterParams): Promise<ExpenseResponse[]> {
    const response = await apiClient.get<ExpenseResponse[]>('/api/expenses/', { params });
    return response.data;
  },

  async createExpense(data: ExpenseCreate): Promise<ExpenseResponse> {
    const response = await apiClient.post<ExpenseResponse>('/api/expenses/', data);
    return response.data;
  },

  async updateExpense(id: string, data: ExpenseUpdate): Promise<ExpenseResponse> {
    const response = await apiClient.put<ExpenseResponse>(`/api/expenses/${id}`, data);
    return response.data;
  },

  async deleteExpense(id: string): Promise<void> {
    await apiClient.delete(`/api/expenses/${id}`);
  },

  // --- Debts APIs ---
  async getDebtList(params?: TransactionFilterParams): Promise<DebtResponse[]> {
    const response = await apiClient.get<DebtResponse[]>('/api/debts/', { params });
    return response.data;
  },

  async createDebt(data: DebtCreate): Promise<DebtResponse> {
    const response = await apiClient.post<DebtResponse>('/api/debts/', data);
    return response.data;
  },

  async updateDebt(id: string, data: DebtUpdate): Promise<DebtResponse> {
    const response = await apiClient.put<DebtResponse>(`/api/debts/${id}`, data);
    return response.data;
  },

  async deleteDebt(id: string): Promise<void> {
    await apiClient.delete(`/api/debts/${id}`);
  },

  async getDebtSummary(): Promise<DebtSummary> {
    const response = await apiClient.get<DebtSummary>('/api/debts/summary');
    return response.data;
  },
};
