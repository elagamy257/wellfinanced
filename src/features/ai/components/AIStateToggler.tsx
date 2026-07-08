'use client';

import React from 'react';

interface AIStateTogglerProps {
  currentState: 'normal' | 'empty' | 'loading' | 'error';
  setCurrentState: (state: 'normal' | 'empty' | 'loading' | 'error') => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
}

export function AIStateToggler({
  currentState,
  setCurrentState,
  isTyping,
  setIsTyping
}: AIStateTogglerProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 p-4 rounded-2xl bg-white/3 border border-white/5 select-none">
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block pr-2">
        Demo States:
      </span>
      
      {/* State Switchers */}
      {(['normal', 'empty', 'loading', 'error'] as const).map((s) => (
        <button
          key={s}
          onClick={() => setCurrentState(s)}
          className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
            currentState === s
              ? 'bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30'
              : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/8 hover:text-white'
          }`}
        >
          {s === 'normal' ? 'Conversation' : `${s} state`}
        </button>
      ))}

      {/* Vertical divider */}
      <div className="w-px h-5 bg-white/10 hidden sm:block mx-1" />

      {/* Typing Toggle */}
      <button
        onClick={() => setIsTyping(!isTyping)}
        className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
          isTyping
            ? 'bg-primary/25 text-primary border-primary/45 shadow-glow'
            : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/8 hover:text-white'
        }`}
      >
        {isTyping ? 'Typing active' : 'Simulate Typing'}
      </button>
    </div>
  );
}
