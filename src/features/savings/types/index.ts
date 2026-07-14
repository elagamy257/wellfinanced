export interface SavingsGoalCreate {
  goal_name: string;
  target_amount: number;
  saved_amount?: number;
}

export interface SavingsGoalResponse {
  id: string;
  user_id: string;
  goal_name: string;
  target_amount: number;
  saved_amount: number;
  created_at: string;
  updated_at: string;
}

export interface SavingsGoalUpdate {
  goal_name?: string;
  target_amount?: number;
  saved_amount?: number;
}

export interface SavingsGoalFilterParams {
  page?: number;
  size?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
