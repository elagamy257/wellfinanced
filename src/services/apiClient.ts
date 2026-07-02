import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Interceptor hook placeholders
apiClient.interceptors.request.use(
  (config) => {
    // Add auth headers here in production
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global API errors here (e.g. token expired)
    return Promise.reject(error);
  }
);
