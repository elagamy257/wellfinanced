'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-muted uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder-muted/60 transition-all duration-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none ${
            error ? 'border-danger focus:border-danger focus:ring-danger' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-danger font-medium animate-fade-in">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
