'use client';

import React from 'react';

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export function Toggle({ label, description, checked, onChange, id }: ToggleProps) {
  const switchId = id || `toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex items-start justify-between gap-4 py-3 select-none">
      <div className="space-y-0.5">
        <label htmlFor={switchId} className="text-xs font-bold text-white block cursor-pointer">
          {label}
        </label>
        {description && (
          <span className="text-[10px] text-slate-400 font-medium leading-relaxed block">
            {description}
          </span>
        )}
      </div>

      {/* Switch Button */}
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer outline-none shrink-0 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-1 ${
          checked ? 'bg-success shadow-glow' : 'bg-white/10'
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-bg-1 transition-transform shadow-md ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
