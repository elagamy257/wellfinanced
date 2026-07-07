export interface EarningsForecastPoint {
  month: string;
  actual?: number;
  projected?: number;
  isCurrent?: boolean;
}

export interface RevenuePipelineOpportunity {
  id: string;
  status: 'ACTIVE' | 'HIGH PROBABILITY';
  project: string;
  client: string;
  value: number;
  progressText: string;
  progressPercentage?: number;
  iconName: 'web' | 'palette' | 'view_in_ar';
}

export const mockForecastData: EarningsForecastPoint[] = [
  { month: 'APR', actual: 8200 },
  { month: 'MAY', actual: 9500 },
  { month: 'JUN', actual: 11100 },
  { month: 'JUL', actual: 12842.5, projected: 12842.5, isCurrent: true },
  { month: 'AUG', projected: 13500 },
  { month: 'SEP', projected: 14800 }
];

export const mockPipelineOpportunities: RevenuePipelineOpportunity[] = [
  {
    id: 'op-1',
    status: 'ACTIVE',
    project: 'SaaS Platform UI',
    client: 'Deep Blue Cloud Corp',
    value: 4200,
    progressText: '75% Complete',
    progressPercentage: 75,
    iconName: 'web'
  },
  {
    id: 'op-2',
    status: 'ACTIVE',
    project: 'Brand Identity',
    client: 'Aura Wellness Ltd',
    value: 2800,
    progressText: '25% Complete',
    progressPercentage: 25,
    iconName: 'palette'
  },
  {
    id: 'op-3',
    status: 'HIGH PROBABILITY',
    project: 'Metaverse Architecture',
    client: 'NeoTokyo Real Estate',
    value: 8500,
    progressText: 'AI Predicted',
    iconName: 'view_in_ar'
  }
];

export const mockSmartSalaryMetrics = {
  smartSalaryValue: 6500,
  statusText: 'Stable',
  descriptionText: 'Based on your 12-month average and predicted $12k+ surplus, this payout ensures a 6-month operational runway.',
  emergencyFundValue: 32000,
  safetyMarginValue: 22
};
