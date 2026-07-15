import { IncomeResponse, ExpenseResponse, DebtResponse, TransactionItem } from '../types';

export function mapIncomeToTransactionItem(income: IncomeResponse): TransactionItem {
  return {
    id: income.id,
    source: income.source_name,
    date: income.date.substring(0, 10), // Format as YYYY-MM-DD
    category: 'Service Revenue',
    amount: income.amount,
    type: 'income',
    status: (income.status === 'pending' ? 'pending' : 'cleared'),
    notes: income.platform ? `Platform: ${income.platform}` : undefined,
  };
}

export function mapExpenseToTransactionItem(expense: ExpenseResponse): TransactionItem {
  return {
    id: expense.id,
    source: expense.category,
    date: expense.expense_date.substring(0, 10),
    category: expense.category,
    amount: -expense.amount, // Expenses represented as negative amounts
    type: 'expense',
    status: 'cleared',
    notes: expense.is_recurring ? `Recurring: ${expense.recurrence_rule || 'Yes'}` : undefined,
  };
}

export function mapDebtToTransactionItem(debt: DebtResponse): TransactionItem {
  return {
    id: debt.id,
    source: debt.debt_name,
    date: debt.due_date.substring(0, 10),
    category: 'Debt Repayment',
    amount: -debt.monthly_payment,
    type: 'debt',
    status: (debt.status === 'pending' ? 'pending' : 'cleared'),
    notes: `Interest Rate: ${debt.interest_rate}%`,
  };
}
