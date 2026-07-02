'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-[11px] font-bold text-muted uppercase tracking-wider select-none px-1">
            {label}
          </label>
        )}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="w-full relative flex items-center"
        >
          {leftIcon && (
            <div className="absolute left-4 text-muted pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={errorId}
            className={`w-full h-[58px] bg-white/8 backdrop-blur-[20px] border border-white/10 rounded-input px-5 text-sm text-text placeholder-muted/50 transition-all duration-250 ease-in-out outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/30 focus:shadow-glow disabled:opacity-50 disabled:pointer-events-none ${
              leftIcon ? 'pl-12' : ''
            } ${
              rightIcon ? 'pr-12' : ''
            } ${
              error ? 'border-danger focus:border-danger focus:ring-danger/30' : ''
            } ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </motion.div>
        {error && (
          <span 
            id={errorId}
            className="text-xs text-danger font-medium px-1 animate-fade-in"
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
