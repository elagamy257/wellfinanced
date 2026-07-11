import axios from 'axios';
import { tokenStorage } from '@/lib/auth/tokenStorage';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://alaarhb--wellfinanced-backend-fastapi-app.modal.run',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Attach access token to every outgoing request if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Catch unauthorized errors and clean up local token storage
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStorage.clearTokens();
    }
    return Promise.reject(error);
  }
);
