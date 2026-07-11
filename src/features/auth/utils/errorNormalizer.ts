import { AxiosError } from 'axios';
import { AuthError } from '../types';

interface FastAPIValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export function normalizeError(error: unknown): AuthError {
  const normalized: AuthError = {
    message: 'An unexpected system error occurred. Please try again.',
  };

  if (error instanceof Error) {
    normalized.message = error.message;
  }

  // Check if Axios Error
  if (isAxiosError(error)) {
    normalized.status = error.response?.status;
    const responseData = error.response?.data as { detail?: unknown; message?: unknown } | null | undefined;

    if (responseData) {
      // 1. Handle FastAPI standard validation error detail (array or string)
      if (responseData.detail) {
        if (Array.isArray(responseData.detail)) {
          const detailArray = responseData.detail as FastAPIValidationError[];
          const fieldErrors: Record<string, string> = {};

          detailArray.forEach((err) => {
            // loc is usually ["body", "field_name"]
            const field = err.loc[err.loc.length - 1];
            if (field) {
              fieldErrors[field.toString()] = err.msg;
            }
          });

          normalized.fieldErrors = fieldErrors;
          normalized.message = detailArray.map((d) => d.msg).join(', ');
        } else if (typeof responseData.detail === 'string') {
          normalized.message = responseData.detail;
        }
      } else if (typeof responseData.message === 'string') {
        normalized.message = responseData.message;
      }
    }

    if (error.code === 'ERR_NETWORK') {
      normalized.message = 'Unable to connect to the authentication server. Please check your network connection.';
    }
  }

  return normalized;
}

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}
