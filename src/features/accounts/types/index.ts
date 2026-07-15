export interface AccountResponse {
  id: string;
  user_id: string;
  label: string;
  institution?: string;
  category: 'checking' | 'savings' | 'credit' | 'investment' | string;
  current_balance: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AccountCreate {
  label: string;
  institution?: string;
  category: string;
  current_balance?: number;
  currency?: string;
  status?: string;
}

export interface AccountsSummaryResponse {
  total_balance: number;
  net_worth: number;
  accounts_count?: number;
  [key: string]: unknown;
}
