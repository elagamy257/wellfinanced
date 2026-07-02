import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'purple' | 'cyan' | 'mint' | 'pink' | 'yellow' | 'outline';
}

export function Badge({ children, variant = 'blue', className = '', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold select-none border tracking-wider uppercase transition-colors';
  
  const variants = {
    blue: 'bg-primary-blue/15 text-primary-blue border-primary-blue/30',
    purple: 'bg-primary-purple/15 text-primary-purple border-primary-purple/30',
    cyan: 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30',
    mint: 'bg-accent-mint/15 text-accent-mint border-accent-mint/30',
    pink: 'bg-accent-pink/15 text-accent-pink border-accent-pink/30',
    yellow: 'bg-accent-yellow/15 text-accent-yellow border-accent-yellow/30',
    outline: 'bg-transparent text-muted border-border hover:text-text hover:border-white/30',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
