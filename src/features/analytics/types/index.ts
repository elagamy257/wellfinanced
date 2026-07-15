// ─── Raw API DTOs ──────────────────────────────────────────────────────────────

/** POST /api/forecast/generate */
export interface ForecastGenerateResponse {
  months?: string[];
  predicted_values?: number[];
  months_ahead?: number;
  confidence?: number;
  insight?: string;
  [key: string]: unknown;
}

/** GET /api/forecast/latest */
export interface ForecastLatestResponse {
  months?: string[];
  predicted_values?: number[];
  actual_values?: number[];
  predicted_value?: number;
  confidence?: number;
  min_bound?: number;
  max_bound?: number;
  insight?: string;
  created_at?: string;
  [key: string]: unknown;
}

/** A single K-Means expense category group from expense analysis */
export interface ExpenseCategoryGroup {
  category?: string;
  name?: string;
  total?: number;
  amount?: number;
  count?: number;
  percentage?: number;
  type?: string;
  [key: string]: unknown;
}

/** GET /api/expenses/analysis */
export interface ExpenseAnalysisResponse {
  needs?: ExpenseCategoryGroup[];
  wants?: ExpenseCategoryGroup[];
  categories?: ExpenseCategoryGroup[];
  category_breakdown?: ExpenseCategoryGroup[];
  monthly_avg?: number;
  total_needs?: number;
  total_wants?: number;
  needs_percentage?: number;
  wants_percentage?: number;
  total?: number;
  [key: string]: unknown;
}

/** GET /api/smoothed-salary/deviation */
export interface SalaryDeviationResponse {
  recommended_salary?: number;
  smoothed_salary?: number;
  actual_spending?: number;
  deviation_pct?: number;
  deviation_percentage?: number;
  surplus_or_deficit?: number;
  status?: string;
  description?: string;
  insight?: string;
  emergency_fund?: number;
  safety_margin?: number;
  safety_margin_pct?: number;
  [key: string]: unknown;
}

// ─── UI Models (output of mappers) ─────────────────────────────────────────────

/** Data point consumed by RevenueMomentumChart */
export interface AnalyticsChartPoint {
  month: string;
  actual?: number;
  projected?: number;
  isCurrent?: boolean;
}

/** Row consumed by RevenuePipelineList */
export interface AnalyticsPipelineItem {
  id: string;
  status: 'ACTIVE' | 'HIGH PROBABILITY';
  project: string;
  client: string;
  value: number;
  progressText: string;
  progressPercentage?: number;
  iconName: 'web' | 'palette' | 'view_in_ar';
}

/** Metrics consumed by SmartSalaryWidget */
export interface AnalyticsSalaryWidgetModel {
  smartSalaryValue: number;
  statusText: string;
  descriptionText: string;
  emergencyFundValue: number;
  safetyMarginValue: number;
}
