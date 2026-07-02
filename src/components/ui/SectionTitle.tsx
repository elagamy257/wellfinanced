import React from 'react';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionTitle({ title, subtitle, action }: SectionTitleProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-10 animate-fade-in">
      <div>
        <h1 className="text-title font-extrabold text-text tracking-tight pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[3px] after:bg-gradient-purple after:rounded-full">
          {title}
        </h1>
        {subtitle && <p className="text-caption text-muted mt-2 leading-relaxed max-w-2xl">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
