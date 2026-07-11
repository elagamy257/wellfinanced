export interface User {
  id: string;
  name: string;
  email: string;
  profile_type: string;
  avg_monthly_income: number;
  joined_at: string;
  primary_skill: string | null;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
  profile_type?: string | null;
  primary_skill?: string | null;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface AuthError {
  message: string;
  status?: number;
  fieldErrors?: Record<string, string>;
}
