'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-small font-bold text-muted uppercase tracking-wider select-none">
            {label}
          </label>
        )}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="w-full"
        >
          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={errorId}
            className={`w-full h-[58px] bg-white/[0.08] backdrop-blur-[20px] border border-white/10 rounded-[18px] px-5 text-sm text-text placeholder-muted/50 transition-all duration-250 ease-in-out outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/30 focus:shadow-glow disabled:opacity-50 disabled:pointer-events-none ${
              error ? 'border-danger focus:border-danger focus:ring-danger/30' : ''
            } ${className}`}
            {...props}
          />
        </motion.div>
        {error && (
          <span 
            id={errorId}
            className="text-xs text-danger font-medium animate-fade-in"
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
