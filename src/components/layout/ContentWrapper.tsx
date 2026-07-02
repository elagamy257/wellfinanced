import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentWrapper({ children, className = '' }: ContentWrapperProps) {
  return (
    <div className={`bg-surface border border-border rounded-xl p-5 md:p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
