'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'purple' | 'cyan' | 'mint';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', isLoading, fullWidth, className = '', disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold select-none cursor-pointer outline-none transition-all focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-gradient-button text-background hover:brightness-110 shadow-glow hover:shadow-glow-strong border-0 text-bg-1',
      secondary: 'glass-panel text-text hover:bg-white/15 border border-border shadow-sm',
      outline: 'bg-transparent text-text border border-border hover:bg-white/5',
      ghost: 'bg-transparent text-muted hover:text-text hover:bg-white/5',
      danger: 'bg-danger text-background hover:bg-danger/90 font-extrabold',
      purple: 'bg-gradient-purple text-text hover:brightness-110 shadow-glow hover:shadow-glow-strong border-0',
      cyan: 'bg-gradient-cyan text-text hover:brightness-110 shadow-glow hover:shadow-glow-strong border-0',
      mint: 'bg-gradient-to-r from-[#10b981] to-[#0d9488] text-white hover:brightness-110 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.55)] border-0',
    };

    const sizes = {
      sm: 'h-11 px-4 text-xs rounded-xl',
      md: 'h-14 px-6 text-sm rounded-[18px]',
      lg: 'h-16 px-8 text-base rounded-[20px]',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
        whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
