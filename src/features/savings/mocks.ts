export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  saved: number;
  percentage: number;
  eta: string;
  timeLeftText?: string;
  category?: string;
}

export const initialSavingsGoals: SavingsGoal[] = [
  {
    id: 'goal-1',
    name: 'Emergency Fund',
    target: 15000,
    saved: 12300,
    percentage: 82,
    eta: 'Oct 2024'
  },
  {
    id: 'goal-2',
    name: 'New Laptop',
    target: 4000,
    saved: 1800,
    percentage: 45,
    eta: 'Jan 2025'
  },
  {
    id: 'goal-3',
    name: 'Q3 Estimated Tax',
    target: 6420,
    saved: 4815,
    percentage: 75,
    eta: 'Due Sep 15',
    timeLeftText: '18 days left'
  }
];

export const mockProjectedGrowthData = [
  { month: 'Jun', value: 14000 },
  { month: 'Jul', value: 16500 },
  { month: 'Aug', value: 18200 },
  { month: 'Sep', value: 19800, isProjected: true },
  { month: 'Oct', value: 20520, isProjected: true }
];

export const mockSavingsMetrics = {
  totalTargetReach: 20520,
  insightTitle: 'Smart Acceleration Opportunity',
  insightText: 'Based on your 18% lower coffee & transit spend this month, you can accelerate your New Laptop goal by 14 days.'
};
