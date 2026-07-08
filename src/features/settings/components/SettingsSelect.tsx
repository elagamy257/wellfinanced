'use client';

import React from 'react';

interface SettingsSelectOption {
  value: string;
  label: string;
}

interface SettingsSelectProps {
  label: string;
  options: SettingsSelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export function SettingsSelect({ label, options, value, onChange }: SettingsSelectProps) {
  return (
    <div className="space-y-1.5 select-none">
      <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-4 bg-white/5 border border-white/5 text-xs text-slate-300 font-bold rounded-xl outline-none focus:border-primary/20 cursor-pointer hover:bg-white/8 transition-all"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0b1329]">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
