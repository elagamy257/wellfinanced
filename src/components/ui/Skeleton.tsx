import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
}

export function Skeleton({ variant = 'rect', className = '', ...props }: SkeletonProps) {
  const baseStyles = 'bg-border/60 animate-pulse';
  
  const variants = {
    text: 'h-4 w-full rounded-md',
    rect: 'w-full h-24 rounded-lg',
    circle: 'rounded-full',
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
