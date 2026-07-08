export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface StableSalaryData {
  recommendedPayout: number;
  safetyBufferPercent: number;
  safetyBufferAmount: number;
  grossAverage: number;
  targetNetSalary: number;
  stabilityScore: number;
  drySeasonReserveMonths: number;
  burnRate: number;
  predictedSurplus: number;
}

export const initialProfileData: ProfileData = {
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@example.com',
  role: 'Senior UX/UI Designer',
  avatarUrl: '/developer_avatar.png'
};

export const initialStableSalaryData: StableSalaryData = {
  recommendedPayout: 6500,
  safetyBufferPercent: 15,
  safetyBufferAmount: 1147,
  grossAverage: 7820,
  targetNetSalary: 5109,
  stabilityScore: 94,
  drySeasonReserveMonths: 4,
  burnRate: 4200,
  predictedSurplus: 2300
};

export const mockIncomeBaselineBars = [
  { month: '1', height: 40 },
  { month: '2', height: 55 },
  { month: '3', height: 100, active: true },
  { month: '4', height: 50 },
  { month: '5', height: 35 },
  { month: '6', height: 65 }
];
