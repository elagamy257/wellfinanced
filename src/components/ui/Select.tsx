'use client';

import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export function Select({ label, options, value, onChange, id }: SelectProps) {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="space-y-1.5 select-none">
      <label htmlFor={selectId} className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-4 bg-white/5 border border-white/5 text-xs text-slate-300 font-bold rounded-xl outline-none focus:border-primary/20 cursor-pointer hover:bg-white/8 transition-all focus-visible:ring-1 focus-visible:ring-primary/30"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-bg-2">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
