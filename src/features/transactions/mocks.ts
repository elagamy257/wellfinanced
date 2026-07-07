export interface TransactionItem {
  id: string;
  source: string;
  date: string;
  category: string;
  amount: number;
  type: 'income' | 'expense' | 'debt';
  status: 'cleared' | 'pending';
  notes?: string;
}

export const initialMockTransactions: TransactionItem[] = [
  {
    id: 'tx-1',
    source: 'Client Payment / UI Design Project',
    date: '2023-10-24',
    category: 'Service Revenue',
    amount: 2400.00,
    type: 'income',
    status: 'cleared',
    notes: 'Milestone 2 payment cleared successfully'
  },
  {
    id: 'tx-2',
    source: 'Business Expense / Cloud Hosting',
    date: '2023-10-23',
    category: 'Infrastructure Cost',
    amount: -142.00,
    type: 'expense',
    status: 'pending',
    notes: 'Monthly cloud hosting automatic billing'
  },
  {
    id: 'tx-3',
    source: 'Client Payment / Tech Consulting',
    date: '2023-10-21',
    category: 'Service Revenue',
    amount: 1200.00,
    type: 'income',
    status: 'cleared',
    notes: 'Consulting services invoice #42'
  },
  {
    id: 'tx-4',
    source: 'Software Subscription / AI Assistant Tools',
    date: '2023-10-20',
    category: 'Development',
    amount: -45.00,
    type: 'expense',
    status: 'cleared',
    notes: 'AI auto-copilot subscription'
  },
  {
    id: 'tx-5',
    source: 'Equipments / Office Keyboard',
    date: '2023-10-18',
    category: 'Equipment',
    amount: -85.00,
    type: 'expense',
    status: 'cleared',
    notes: 'Mechanical developer keyboard'
  }
];

export const mockSuggestedTags = ['Development', 'UI Design', 'Consulting', 'Infrastructure', 'Office Hardware'];

export const mockSummaryMetrics = {
  totalIncome: 3600.00,
  totalExpenses: 272.00,
  allocatedDebt: 0.00
};
