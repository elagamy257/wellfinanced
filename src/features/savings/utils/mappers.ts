import { SavingsGoalResponse } from '../types';
import { SavingsGoal } from '../mocks';

export function mapSavingsGoalToModel(dto: SavingsGoalResponse): SavingsGoal {
  const target = dto.target_amount || 0;
  const saved = dto.saved_amount || 0;
  const percentage = target > 0 ? Math.round((saved / target) * 100) : 0;
  
  return {
    id: dto.id,
    name: dto.goal_name,
    target,
    saved,
    percentage: Math.min(percentage, 100),
    eta: dto.deadline 
      ? new Date(dto.deadline).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : '6 months',
    timeLeftText: 'Active',
  };
}
