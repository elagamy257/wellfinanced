export interface IncomeCreate {
  source_name: string;
  amount: number;
  currency?: string;
  date: string;
  status?: string;
  platform?: string;
}

export interface IncomeResponse {
  id: string;
  user_id: string;
  source_name: string;
  amount: number;
  currency: string;
  date: string;
  status: string;
  platform?: string;
  month: string;
  created_at: string;
  updated_at: string;
}

export interface IncomeUpdate {
  source_name?: string;
  amount?: number;
  currency?: string;
  date?: string;
  status?: string;
  platform?: string;
}

export interface ExpenseCreate {
  category: string;
  amount: number;
  expense_date: string;
  is_recurring?: boolean;
  recurrence_rule?: string;
}

export interface ExpenseResponse {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  expense_date: string;
  month: string;
  is_recurring: boolean;
  recurrence_rule?: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseUpdate {
  category?: string;
  amount?: number;
  expense_date?: string;
  is_recurring?: boolean;
  recurrence_rule?: string;
}

export interface DebtCreate {
  debt_name: string;
  total_amount: number;
  remaining_amount: number;
  monthly_payment: number;
  interest_rate?: number;
  due_date: string;
  priority?: number;
  status?: string;
}

export interface DebtResponse {
  id: string;
  user_id: string;
  debt_name: string;
  total_amount: number;
  remaining_amount: number;
  monthly_payment: number;
  interest_rate: number;
  due_date: string;
  priority: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DebtUpdate {
  debt_name?: string;
  total_amount?: number;
  remaining_amount?: number;
  monthly_payment?: number;
  interest_rate?: number;
  due_date?: string;
  priority?: number;
  status?: string;
}

export interface TransactionFilterParams {
  page?: number;
  size?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  category?: string;
}

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
