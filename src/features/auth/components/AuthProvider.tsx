'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { tokenStorage } from '@/lib/auth/tokenStorage';
import { authService } from '../services/auth.service';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const login = useAuthStore((state) => state.login);
  const clearSession = useAuthStore((state) => state.clearSession);
  const setLoading = useAuthStore((state) => state.setLoading);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const restoreSession = async () => {
      const token = tokenStorage.getAccessToken();
      const refresh = tokenStorage.getRefreshToken() || '';
      
      if (!token) {
        clearSession();
        return;
      }

      try {
        setLoading(true);
        // Verify session by calling backend /me profile endpoint
        const user = await authService.getCurrentUser();
        login(user, token, refresh);
      } catch {
        // If the session token is expired or invalid, purge tokens
        tokenStorage.clearTokens();
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [login, clearSession, setLoading]);

  // Prevent server-side rendering execution to avoid hydration mismatches
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
