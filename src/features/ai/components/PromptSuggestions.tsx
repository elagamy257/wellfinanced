'use client';

import React from 'react';
import { mockPromptSuggestions } from '../mocks/mocks';

interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void;
}

export function PromptSuggestions({ onSelect }: PromptSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2.5 select-none pt-2.5">
      {mockPromptSuggestions.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="px-4.5 h-9 bg-white/5 hover:bg-white/8 hover:text-white border border-white/5 focus:border-success/20 text-[9px] font-black tracking-widest text-slate-300 uppercase rounded-xl transition-all cursor-pointer"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
