export interface SmoothedSalaryConfig {
  recommended_payout?: number;
  safety_buffer_percent?: number;
  safety_buffer_amount?: number;
  gross_average?: number;
  target_net_salary?: number;
  stability_score?: number;
  dry_season_reserve_months?: number;
  burn_rate?: number;
  predicted_surplus?: number;
  [key: string]: unknown;
}

export interface AcceptSmoothedSalaryPayload {
  accepted_amount: number;
}

export interface AcceptSmoothedSalaryResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}
