'use client';

import React from 'react';

interface SettingsToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SettingsToggle({ label, description, checked, onChange }: SettingsToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 select-none">
      <div className="space-y-0.5">
        <span className="text-xs font-bold text-white block">
          {label}
        </span>
        {description && (
          <span className="text-[10px] text-slate-400 font-medium leading-relaxed block">
            {description}
          </span>
        )}
      </div>

      {/* Switch */}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer outline-none shrink-0 ${
          checked ? 'bg-[#8BFF7D]' : 'bg-white/10'
        }`}
        aria-label={`Toggle ${label}`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-[#060B1A] transition-transform shadow-[0_2px_5px_rgba(0,0,0,0.3)] ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
