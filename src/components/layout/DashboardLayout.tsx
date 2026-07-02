import React from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar: Left Side Desktop sticky, Mobile overlay drawer */}
      <Sidebar />

      {/* Main Viewport: Right Side */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
