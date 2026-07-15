export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  answer: string;
}

export interface QuickAdviceRequest {
  topic: string;
}

export interface QuickAdviceResponse {
  advice: string;
}

export interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  metrics?: {
    currentRevenue?: string;
    revenueChange?: string;
    postPurchaseBuffer?: string;
    pendingIncome?: string;
    projectedRunway?: string;
    recommendedRunway?: string;
    safetyBufferText?: string;
    hasActions?: boolean;
  };
}
