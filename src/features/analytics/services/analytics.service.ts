import { apiClient } from '@/services/apiClient';
import {
  ForecastGenerateResponse,
  ForecastLatestResponse,
  ExpenseAnalysisResponse,
  SalaryDeviationResponse,
} from '../types';

export const analyticsService = {

  /** POST /api/forecast/generate — trigger LSTM model run */
  async generateForecast(months_ahead = 3): Promise<ForecastGenerateResponse> {
    const response = await apiClient.post<ForecastGenerateResponse>(
      '/api/forecast/generate',
      null,
      { params: { months_ahead } }
    );
    return response.data;
  },

  /** GET /api/forecast/latest — retrieve most recent saved forecast */
  async getLatestForecast(): Promise<ForecastLatestResponse> {
    const response = await apiClient.get<ForecastLatestResponse>('/api/forecast/latest');
    return response.data;
  },

  /** GET /api/expenses/analysis — K-Means expense categorisation */
  async getExpenseAnalysis(): Promise<ExpenseAnalysisResponse> {
    const response = await apiClient.get<ExpenseAnalysisResponse>('/api/expenses/analysis');
    return response.data;
  },

  /** GET /api/smoothed-salary/deviation — surplus/deficit vs recommended salary */
  async getSalaryDeviation(): Promise<SalaryDeviationResponse> {
    const response = await apiClient.get<SalaryDeviationResponse>('/api/smoothed-salary/deviation');
    return response.data;
  },
};
