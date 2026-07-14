import { apiClient } from '@/services/apiClient';
import { ChatRequest, ChatResponse, QuickAdviceRequest, QuickAdviceResponse } from '../types';

export const aiService = {
  async chat(data: ChatRequest): Promise<ChatResponse> {
    const response = await apiClient.post<ChatResponse>('/api/advisor/chat', data, { timeout: 60000 });
    return response.data;
  },

  async quickAdvice(data: QuickAdviceRequest): Promise<QuickAdviceResponse> {
    const response = await apiClient.post<QuickAdviceResponse>('/api/advisor/quick-advice', data, { timeout: 60000 });
    return response.data;
  },
};
