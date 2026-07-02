import React from 'react';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 border border-dashed border-border rounded-xl bg-surface/20 min-h-[300px] animate-fade-in">
      {Icon ? (
        <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-muted border border-border mb-4">
          <Icon className="w-6 h-6" />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-muted border border-border mb-4">
          <svg className="w-6 h-6 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
      )}
      <h3 className="text-base md:text-lg font-bold text-text mb-1">{title}</h3>
      <p className="text-xs md:text-sm text-muted max-w-sm mb-6 leading-relaxed">{description}</p>
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}
