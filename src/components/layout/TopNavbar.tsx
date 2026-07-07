'use client';

import React from 'react';
import { Menu, Sun, Moon, Search, Bell } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useUIStore } from '@/store/uiStore';

export function TopNavbar() {
  const { theme, setTheme } = useTheme();
  const { toggleMobileSidebar } = useUIStore();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="h-16 border-b border-white/5 bg-[#060B1A]/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between select-none">
      
      {/* Left side: Mobile Toggler & New Search Input */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors md:hidden cursor-pointer"
          aria-label="Open Mobile Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Search Field */}
        <div className="relative w-full hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search analytics or transactions..."
            className="w-full h-10 pl-9 pr-4 bg-white/5 hover:bg-white/8 focus:bg-[#09152E] border border-white/5 focus:border-[#8BFF7D]/20 text-xs font-bold text-white placeholder-slate-400 rounded-xl outline-none transition-all"
          />
        </div>
      </div>

      {/* Right side: Bell, Theme, and Profile Area */}
      <div className="flex items-center gap-4.5">
        {/* Notification Bell */}
        <button
          className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors relative cursor-pointer"
          aria-label="View Notifications"
        >
          <Bell className="w-5 h-5" />
          {/* Lime notification dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8BFF7D] shadow-[0_0_10px_rgba(139,255,125,0.7)]" />
        </button>

        {/* Theme Toggler */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle Theme Mode"
        >
          <Sun className="w-5 h-5 hidden dark:block text-[#FDE047]" />
          <Moon className="w-5 h-5 block dark:hidden text-slate-400" />
        </button>

        {/* Vertical Divider */}
        <div className="w-px h-6 bg-white/10 hidden md:block" />

        {/* Premium Profile Badge & Name */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block select-none">
            <span className="text-xs font-black text-white leading-tight block">
              Wafaa
            </span>
            <span className="text-[8px] font-black text-accent-cyan tracking-widest uppercase leading-none block mt-0.5">
              Premium User
            </span>
          </div>

          {/* Square Profile Picture with rounded corners */}
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#8BFF7D] to-[#8FFFD2] flex items-center justify-center font-black text-black text-xs shadow-[0_0_15px_rgba(139,255,125,0.25)] select-none">
            WA
          </div>
        </div>
      </div>
    </header>
  );
}
