import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle' | 'card' | 'input';
}

export function Skeleton({ variant = 'rect', className = '', ...props }: SkeletonProps) {
  const baseStyles = 'bg-white/5 animate-pulse';
  
  const variants = {
    text: 'h-4 w-full rounded-md',
    rect: 'w-full h-24 rounded-[20px]',
    card: 'w-full h-40 rounded-card',
    input: 'w-full h-[58px] rounded-input',
    circle: 'rounded-full',
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
      role="progressbar"
      aria-label="loading state"
    />
  );
}
