import React from 'react';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-14 border border-dashed border-white/10 rounded-card bg-white/[0.03] backdrop-blur-[10px] min-h-[350px] animate-fade-in">
      {Icon ? (
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-muted border border-white/10 mb-6 shadow-sm">
          <Icon className="w-7 h-7 text-primary-purple" strokeWidth={2} />
        </div>
      ) : (
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-muted border border-white/10 mb-6 shadow-sm">
          <svg className="w-7 h-7 text-primary-purple opacity-65" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
      )}
      <h3 className="text-card-title font-extrabold text-text mb-2 select-none">{title}</h3>
      <p className="text-caption text-muted max-w-sm mb-8 leading-relaxed select-none">{description}</p>
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}
