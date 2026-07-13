export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    currentUser: () => [...queryKeys.auth.all, 'currentUser'] as const,
  },
  dashboard: {
    all: ['dashboard'] as const,
    snapshot: () => [...queryKeys.dashboard.all, 'snapshot'] as const,
    incomeStats: () => [...queryKeys.dashboard.all, 'incomeStats'] as const,
    expenseStats: () => [...queryKeys.dashboard.all, 'expenseStats'] as const,
    debtSummary: () => [...queryKeys.dashboard.all, 'debtSummary'] as const,
    forecast: () => [...queryKeys.dashboard.all, 'forecast'] as const,
    savings: () => [...queryKeys.dashboard.all, 'savings'] as const,
    recentTransactions: () => [...queryKeys.dashboard.all, 'recentTransactions'] as const,
  },
  transactions: {
    all: ['transactions'] as const,
    income: {
      all: ['transactions', 'income'] as const,
      lists: () => [...queryKeys.transactions.income.all, 'list'] as const,
      list: (filters: Record<string, unknown>) => [...queryKeys.transactions.income.lists(), filters] as const,
      stats: () => [...queryKeys.transactions.income.all, 'stats'] as const,
    },
    expenses: {
      all: ['transactions', 'expenses'] as const,
      lists: () => [...queryKeys.transactions.expenses.all, 'list'] as const,
      list: (filters: Record<string, unknown>) => [...queryKeys.transactions.expenses.lists(), filters] as const,
      stats: () => [...queryKeys.transactions.expenses.all, 'stats'] as const,
    },
    debts: {
      all: ['transactions', 'debts'] as const,
      lists: () => [...queryKeys.transactions.debts.all, 'list'] as const,
      list: (filters: Record<string, unknown>) => [...queryKeys.transactions.debts.lists(), filters] as const,
      summary: () => [...queryKeys.transactions.debts.all, 'summary'] as const,
    },
  },
  savings: {
    all: ['savings'] as const,
    lists: () => [...queryKeys.savings.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.savings.lists(), filters] as const,
    summary: () => [...queryKeys.savings.all, 'summary'] as const,
  },
  accounts: {
    all: ['accounts'] as const,
    lists: () => [...queryKeys.accounts.all, 'list'] as const,
    summary: () => [...queryKeys.accounts.all, 'summary'] as const,
  },
};
