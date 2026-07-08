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

export const initialChatMessages: Message[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: "Hello! I'm your AI Assistant. I've been monitoring your business accounts... You're 15% ahead of target this month. Keep up the momentum!",
    timestamp: '10:24 AM',
    metrics: {
      currentRevenue: '$12,840.00',
      revenueChange: '+15.2%'
    }
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: "Can I afford to invest in that new high-end workstation this week? It's about $3,500.",
    timestamp: '10:25 AM'
  },
  {
    id: 'msg-3',
    sender: 'ai',
    text: "I've calculated your real-time liquidity. Based on current cashflow and the pending invoice of $2,400 from Studio Alpha (due Thursday), yes, you can comfortably afford this purchase.",
    timestamp: '10:26 AM',
    metrics: {
      postPurchaseBuffer: '$5,240.12',
      pendingIncome: '$2,400.00',
      projectedRunway: '92 Days',
      recommendedRunway: '60+',
      safetyBufferText: '"Your 2-month minimum safety buffer remains untouched."',
      hasActions: true
    }
  }
];

export const mockPromptSuggestions = [
  'ANALYZE MY SPENDING',
  'PROJECT MY TAX DEBT',
  'GENERATE Q3 REPORT'
];
