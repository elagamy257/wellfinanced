export const dashboardKeys = {
  all: ['dashboard'] as const,
  snapshot: () => [...dashboardKeys.all, 'snapshot'] as const,
  incomeStats: () => [...dashboardKeys.all, 'incomeStats'] as const,
  expenseStats: () => [...dashboardKeys.all, 'expenseStats'] as const,
  debtSummary: () => [...dashboardKeys.all, 'debtSummary'] as const,
  forecast: () => [...dashboardKeys.all, 'forecast'] as const,
};
