import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-9 h-9 border-[3px]',
    lg: 'w-14 h-14 border-4',
  };

  return (
    <div className={`flex items-center justify-center p-4 ${className}`} role="status" aria-label="loading">
      <div
        className={`${sizes[size]} rounded-full border-t-primary-purple border-r-transparent border-b-transparent border-l-transparent animate-spin`}
        style={{ borderStyle: 'solid', borderColor: 'var(--color-primary-purple) transparent transparent transparent' }}
      />
    </div>
  );
}
