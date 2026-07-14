export interface CanIAffordRequest {
  item_cost: number;
}

export interface CanIAffordResponse {
  item_cost: number;
  verdict: 'affordable' | 'not_affordable';
  method: string;
  months_to_save: number;
  monthly_surplus: number;
  available_cash: number;
  total_balance: number;
  emergency_fund_needed: number;
  debt_obligations: number;
}

export interface InstallmentRequest {
  monthly_amount: number;
  months: number;
}

export interface InstallmentResponse {
  monthly_amount: number;
  months: number;
  total_cost: number;
  affordable: boolean;
  risk_level: 'low' | 'medium' | 'high';
  current_surplus: number;
  new_surplus: number;
  current_debt_ratio: number;
  new_debt_ratio: number;
  warnings: string[];
}

export interface SavingsPlanRequest {
  goal_name: string;
  target_amount: number;
  months: number;
}

export interface SavingsPlanResponse {
  goal_name: string;
  target_amount: number;
  months: number;
  monthly_needed: number;
  adjusted_monthly: number;
  current_surplus: number;
  verdict: 'feasible' | 'not_feasible';
  recommendation: string;
  savings_pct_of_income: number;
}

export interface PaymentPlanDebt {
  name: string;
  remaining: number;
  interest_rate: number;
  monthly_payment: number;
  payoff_month: number;
  payoff_date: string | null;
  total_interest_paid: number;
  balance_over_time: Array<{ month: number; balance: number }>;
}

export interface PaymentPlanTimelinePayment {
  debt: string;
  amount: number;
  remaining: number;
}

export interface PaymentPlanTimelineItem {
  month_num: number;
  date: string;
  payments: PaymentPlanTimelinePayment[];
  total_payment: number;
  cumulative_paid: number;
}

export interface PaymentPlanSummary {
  total_months: number;
  total_paid: number;
  total_interest: number;
  debt_free_date: string | null;
  monthly_budget: number;
  interest_saved_vs_minimum: number;
}

export interface PaymentPlanResponse {
  debts: PaymentPlanDebt[];
  timeline: PaymentPlanTimelineItem[];
  summary: PaymentPlanSummary;
}
