import { useMutation } from '@tanstack/react-query';
import { aiService } from '../../services/ai.service';
import { ChatRequest, ChatResponse } from '../../types';

export function useAdvisorChat() {
  return useMutation<ChatResponse, Error, ChatRequest>({
    mutationFn: (data: ChatRequest) => aiService.chat(data),
  });
}
