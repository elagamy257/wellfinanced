'use client';

import React, { useState } from 'react';
import { Paperclip, Send, X, FileText } from 'lucide-react';

interface ChatInputBarProps {
  onSend: (text: string, attachedFile?: string) => void;
}

export function ChatInputBar({ onSend }: ChatInputBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && !attachedFile) return;

    onSend(inputValue, attachedFile || undefined);
    setInputValue('');
    setAttachedFile(null);
  };

  const handleSelectMockFile = (filename: string) => {
    setAttachedFile(filename);
    setShowAttachmentMenu(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 relative select-none">
      
      {/* File Attachment Status Bar Indicator */}
      {attachedFile && (
        <div className="flex items-center gap-2 p-2 px-3.5 bg-primary/10 border border-primary/20 rounded-xl w-fit text-[10px] text-white font-bold select-none animate-scale-in">
          <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="truncate">{attachedFile}</span>
          <button 
            type="button" 
            onClick={() => setAttachedFile(null)}
            className="p-0.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Input row wrapper */}
      <div className="relative flex items-center bg-white/5 border border-white/5 focus-within:border-primary/20 rounded-2xl p-1.5 transition-all">
        {/* Attachment menu trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
            className={`p-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 ${
              showAttachmentMenu ? 'text-white bg-white/5' : ''
            }`}
            aria-label="Attach File"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Attachments UI Dropdown Menu */}
          {showAttachmentMenu && (
            <div className="absolute bottom-14 left-0 bg-bg-3 border border-white/10 p-2 rounded-2xl w-48 shadow-2xl z-50 space-y-1 animate-scale-in">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block px-2.5 py-1 select-none">
                Simulate Attachments
              </span>
              <button
                type="button"
                onClick={() => handleSelectMockFile('acme_invoice_oct.pdf')}
                className="w-full text-left px-2.5 py-2 text-[10px] font-bold text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-accent-cyan" />
                <span>acme_invoice_oct.pdf</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectMockFile('workstation_quote.png')}
                className="w-full text-left px-2.5 py-2 text-[10px] font-bold text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-accent-pink" />
                <span>workstation_quote.png</span>
              </button>
            </div>
          )}
        </div>

        {/* Input element */}
        <input
          type="text"
          placeholder="Type your financial question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-transparent px-3 text-xs text-white placeholder-slate-500 outline-none"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputValue.trim() && !attachedFile}
          className="p-3 bg-gradient-green text-black rounded-xl hover:brightness-110 shadow-glow disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
          aria-label="Send Message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Disclaimer */}
      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest text-center block pt-1 select-none">
        AI CAN MAKE MISTAKES. VERIFY CRITICAL FINANCIAL DATA.
      </span>

    </form>
  );
}
