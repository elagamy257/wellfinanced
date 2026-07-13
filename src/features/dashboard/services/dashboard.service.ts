import { apiClient } from '@/services/apiClient';
import { 
  FinancialSnapshot, 
  IncomeStats, 
  ExpenseStats, 
  DebtSummary, 
  ForecastResponse,
  DashboardSavingsGoal,
  DashboardIncome,
  DashboardExpense
} from '../types';

export const dashboardService = {
  async getSnapshot(): Promise<FinancialSnapshot> {
    const response = await apiClient.get<FinancialSnapshot>('/api/advisor/snapshot');
    return response.data;
  },

  async getIncomeStats(): Promise<IncomeStats> {
    const response = await apiClient.get<IncomeStats>('/api/income/stats');
    return response.data;
  },

  async getExpenseStats(): Promise<ExpenseStats> {
    const response = await apiClient.get<ExpenseStats>('/api/expenses/stats');
    return response.data;
  },

  async getDebtSummary(): Promise<DebtSummary> {
    const response = await apiClient.get<DebtSummary>('/api/debts/summary');
    return response.data;
  },

  async getLatestForecast(): Promise<ForecastResponse> {
    const response = await apiClient.get<ForecastResponse>('/api/forecast/latest');
    return response.data;
  },

  async getSavingsGoals(): Promise<DashboardSavingsGoal[]> {
    const response = await apiClient.get<DashboardSavingsGoal[]>('/api/savings/');
    return response.data;
  },

  async getRecentIncome(): Promise<DashboardIncome[]> {
    const response = await apiClient.get<DashboardIncome[]>('/api/income/');
    return response.data;
  },

  async getRecentExpenses(): Promise<DashboardExpense[]> {
    const response = await apiClient.get<DashboardExpense[]>('/api/expenses/');
    return response.data;
  },
};
