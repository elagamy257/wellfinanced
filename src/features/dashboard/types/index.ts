export interface FinancialSnapshot {
  financial_health_score: number;
  total_assets: number;
  total_liabilities: number;
  net_worth: number;
  debt_to_income_ratio: number;
  emergency_fund_ratio: number;
  savings_rate: number;
}

export interface IncomeStats {
  average?: number;
  total?: number;
  monthly_average?: number;
  avg?: number;
  [key: string]: unknown;
}

export interface ExpenseStats {
  average?: number;
  total?: number;
  monthly_average?: number;
  avg?: number;
  [key: string]: unknown;
}

export interface DebtSummary {
  total_debt: number;
  debt_count: number;
  monthly_installments: number;
}

export interface ForecastResponse {
  predicted_value?: number;
  confidence?: number;
  min_bound?: number;
  max_bound?: number;
  insight?: string;
  [key: string]: unknown;
}

export interface DashboardSavingsGoal {
  id: string;
  goal_name: string;
  target_amount: number;
  saved_amount: number;
}

export interface DashboardIncome {
  id: string;
  source_name: string;
  amount: number;
  date: string;
  status: string;
}

export interface DashboardExpense {
  id: string;
  category: string;
  amount: number;
  expense_date: string;
}
