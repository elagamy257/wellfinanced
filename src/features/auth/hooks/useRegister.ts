import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { User, UserCreate } from '../types';

export function useRegister() {
  return useMutation<User, Error, UserCreate>({
    mutationFn: async (registrationData) => {
      return await authService.register(registrationData);
    },
  });
}
