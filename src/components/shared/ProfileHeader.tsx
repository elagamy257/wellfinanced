'use client';

import React from 'react';

interface ProfileHeaderProps {
  initials: string;
  role: string;
  onChangeAvatar?: () => void;
}

export function ProfileHeader({ initials, role, onChangeAvatar }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-5 select-none">
      <div className="w-16 h-16 rounded-2xl bg-gradient-green flex items-center justify-center font-black text-black text-xl shadow-glow">
        {initials}
      </div>

      <div className="space-y-1.5">
        <span className="text-[9px] font-black text-accent-cyan tracking-widest uppercase block">
          {role}
        </span>
        <button
          type="button"
          onClick={onChangeAvatar}
          className="px-4.5 py-2 text-[10px] font-black tracking-widest text-slate-300 hover:text-white uppercase bg-white/5 hover:bg-white/8 border border-white/5 rounded-xl transition-all cursor-pointer"
        >
          Change Avatar
        </button>
      </div>
    </div>
  );
}
