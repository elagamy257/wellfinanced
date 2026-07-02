import React from 'react';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionTitle({ title, subtitle, action }: SectionTitleProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8 animate-fade-in">
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold text-text tracking-tight uppercase border-b-2 border-primary/20 pb-1.5 inline-block">
          {title}
        </h1>
        {subtitle && <p className="text-xs md:text-sm text-muted mt-1.5 leading-relaxed">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
