'use client';

import React from 'react';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-0.5 select-none">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {children && <div className="pt-2">{children}</div>}
    </div>
  );
}
