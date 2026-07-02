'use client';

import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useUIStore } from '@/store/uiStore';

export function TopNavbar() {
  const { theme, setTheme } = useTheme();
  const { toggleMobileSidebar } = useUIStore();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between">
      {/* Left side: Mobile Toggler & Branding/Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors md:hidden"
          aria-label="Open Mobile Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden md:block">
          <span className="text-sm font-semibold text-muted">Platform Overview</span>
        </div>
      </div>

      {/* Right side: Theme Toggle & Avatar Placeholder */}
      <div className="flex items-center gap-3">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors"
          aria-label="Toggle Theme Mode"
        >
          <Sun className="w-5 h-5 hidden dark:block text-warning" />
          <Moon className="w-5 h-5 block dark:hidden text-muted" />
        </button>

        {/* Custom Avatar Placeholder */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-semibold text-background text-xs select-none">
          JD
        </div>
      </div>
    </header>
  );
}
