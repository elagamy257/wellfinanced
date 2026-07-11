import { useQuery } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { authKeys } from './queryKeys';
import { tokenStorage } from '@/lib/auth/tokenStorage';
import { User } from '../types';

export function useCurrentUser(options?: { enabled?: boolean }) {
  const hasToken = typeof window !== 'undefined' ? !!tokenStorage.getAccessToken() : false;

  return useQuery<User, Error>({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      return await authService.getCurrentUser();
    },
    enabled: options?.enabled !== false && hasToken,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}
