import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div
        className={`${sizes[size]} rounded-full border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin`}
        style={{ borderStyle: 'solid', borderColor: 'var(--color-primary) transparent transparent transparent' }}
        role="status"
        aria-label="loading"
      />
    </div>
  );
}
