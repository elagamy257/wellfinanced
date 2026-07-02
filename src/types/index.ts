// Type definitions for WellFinanced

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description?: string;
  date: string;
  taxAllocated?: number;
}

export interface SavingsVault {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  runwayMonths?: number;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  isCompleted: boolean;
}
