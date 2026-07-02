// Global System Constants

export const APP_NAME = 'WellFinanced';

export const APP_DESCRIPTION = 'AI-powered financial stability workstation';

export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: {
    HOME: '/dashboard',
    TRANSACTIONS: '/dashboard/transactions',
    ANALYTICS: '/dashboard/analytics',
    SAVINGS: '/dashboard/savings',
    GOALS: '/dashboard/goals',
    AI: '/dashboard/ai',
    TAXES: '/dashboard/taxes',
    REPORTS: '/dashboard/reports',
    PROFILE: '/dashboard/profile',
    SETTINGS: '/dashboard/settings',
  },
} as const;

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;
