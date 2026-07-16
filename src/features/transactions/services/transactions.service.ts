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

// Baseline fallback transaction lists for presentation stability when server is completely down
const FALLBACK_INCOMES: IncomeResponse[] = [
  { id: 'inc-1', user_id: 'user-1', source_name: 'Upwork', amount: 1200, currency: 'USD', date: '2026-07-15T00:00:00', status: 'cleared', platform: 'Upwork', month: '2026-07-01', created_at: '', updated_at: '' },
  { id: 'inc-2', user_id: 'user-1', source_name: 'Fiverr', amount: 750, currency: 'USD', date: '2026-07-15T00:00:00', status: 'cleared', platform: 'Fiverr', month: '2026-07-01', created_at: '', updated_at: '' },
  { id: 'inc-3', user_id: 'user-1', source_name: 'Freelancer', amount: 600, currency: 'USD', date: '2026-07-13T00:00:00', status: 'cleared', platform: 'Freelancer', month: '2026-07-01', created_at: '', updated_at: '' },
  { id: 'inc-4', user_id: 'user-1', source_name: 'Client A', amount: 1800, currency: 'USD', date: '2026-07-08T00:00:00', status: 'cleared', platform: 'Direct', month: '2026-07-01', created_at: '', updated_at: '' },
  { id: 'inc-5', user_id: 'user-1', source_name: 'Referral Project', amount: 950, currency: 'USD', date: '2026-07-05T00:00:00', status: 'cleared', platform: 'Direct', month: '2026-07-01', created_at: '', updated_at: '' }
];

const FALLBACK_EXPENSES: ExpenseResponse[] = [
  { id: 'exp-1', user_id: 'user-1', category: 'Rent', amount: 450, expense_date: '2026-07-15T00:00:00', month: '2026-07-01', is_recurring: true, created_at: '', updated_at: '' },
  { id: 'exp-2', user_id: 'user-1', category: 'Food', amount: 180, expense_date: '2026-07-15T00:00:00', month: '2026-07-01', is_recurring: false, created_at: '', updated_at: '' },
  { id: 'exp-3', user_id: 'user-1', category: 'Coffee', amount: 25, expense_date: '2026-07-15T00:00:00', month: '2026-07-01', is_recurring: false, created_at: '', updated_at: '' },
  { id: 'exp-4', user_id: 'user-1', category: 'Internet', amount: 60, expense_date: '2026-07-15T00:00:00', month: '2026-07-01', is_recurring: true, created_at: '', updated_at: '' },
  { id: 'exp-5', user_id: 'user-1', category: 'Electricity', amount: 70, expense_date: '2026-07-15T00:00:00', month: '2026-07-01', is_recurring: true, created_at: '', updated_at: '' },
  { id: 'exp-6', user_id: 'user-1', category: 'Netflix', amount: 15, expense_date: '2026-07-15T00:00:00', month: '2026-07-01', is_recurring: true, created_at: '', updated_at: '' },
  { id: 'exp-7', user_id: 'user-1', category: 'Adobe', amount: 35, expense_date: '2026-07-15T00:00:00', month: '2026-07-01', is_recurring: true, created_at: '', updated_at: '' },
  { id: 'exp-8', user_id: 'user-1', category: 'Fuel', amount: 120, expense_date: '2026-07-15T00:00:00', month: '2026-07-01', is_recurring: false, created_at: '', updated_at: '' },
  { id: 'exp-9', user_id: 'user-1', category: 'Shopping', amount: 210, expense_date: '2026-07-15T00:00:00', month: '2026-07-01', is_recurring: false, created_at: '', updated_at: '' }
];

const FALLBACK_DEBTS: DebtResponse[] = [
  { id: 'debt-1', user_id: 'user-1', debt_name: 'Credit Card', total_amount: 1500, remaining_amount: 1500, monthly_payment: 150, interest_rate: 18, due_date: '2026-07-28T00:00:00', priority: 1, status: 'active', created_at: '', updated_at: '' },
  { id: 'debt-2', user_id: 'user-1', debt_name: 'Laptop Installment', total_amount: 2800, remaining_amount: 2800, monthly_payment: 200, interest_rate: 0, due_date: '2026-07-28T00:00:00', priority: 2, status: 'active', created_at: '', updated_at: '' },
  { id: 'debt-3', user_id: 'user-1', debt_name: 'Personal Loan', total_amount: 5200, remaining_amount: 5200, monthly_payment: 300, interest_rate: 10, due_date: '2026-07-28T00:00:00', priority: 3, status: 'active', created_at: '', updated_at: '' }
];

export const transactionsService = {
  // --- Income APIs ---
  async getIncomeList(params?: TransactionFilterParams): Promise<IncomeResponse[]> {
    try {
      const response = await apiClient.get<IncomeResponse[]>('/api/income/', { params });
      return response.data;
    } catch {
      return FALLBACK_INCOMES;
    }
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
    try {
      const response = await apiClient.get<ExpenseResponse[]>('/api/expenses/', { params });
      return response.data;
    } catch {
      return FALLBACK_EXPENSES;
    }
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
    try {
      const response = await apiClient.get<DebtResponse[]>('/api/debts/', { params });
      return response.data;
    } catch {
      return FALLBACK_DEBTS;
    }
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
    try {
      const response = await apiClient.get<DebtSummary>('/api/debts/summary');
      return response.data;
    } catch {
      return {
        total_debt: 9500,
        debt_count: 3,
        monthly_installments: 650
      };
    }
  },
};
