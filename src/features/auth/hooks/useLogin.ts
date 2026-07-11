import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { UserLogin, TokenResponse, User } from '../types';
import { tokenStorage } from '@/lib/auth/tokenStorage';
import { useAuthStore } from '@/store/authStore';

interface LoginSuccessData {
  user: User;
  tokens: TokenResponse;
}

export function useLogin() {
  const loginState = useAuthStore();

  return useMutation<LoginSuccessData, Error, UserLogin>({
    mutationFn: async (credentials) => {
      // 1. Authenticate and get tokens
      const tokens = await authService.login(credentials);
      
      // 2. Save tokens in storage immediately so subsequent requests have auth header
      tokenStorage.setTokens(tokens.access_token, tokens.refresh_token);

      try {
        // 3. Fetch current user profile details
        const user = await authService.getCurrentUser();

        // 4. Update the Zustand store
        loginState.login(user, tokens.access_token, tokens.refresh_token);

        return { user, tokens };
      } catch (err) {
        // If getting user details fails, rollback tokens in storage
        tokenStorage.clearTokens();
        throw err;
      }
    },
  });
}
