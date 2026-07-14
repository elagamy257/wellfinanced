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
