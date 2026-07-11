import { apiClient } from '@/services/apiClient';
import { User, UserCreate, UserLogin, TokenResponse } from '../types';

export const authService = {
  async register(data: UserCreate): Promise<User> {
    const response = await apiClient.post<User>('/api/auth/register', data);
    return response.data;
  },

  async login(data: UserLogin): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>('/api/auth/login', data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/api/auth/me');
    return response.data;
  },
};
