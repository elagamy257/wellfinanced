'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Receipt, 
  TrendingUp, 
  PiggyBank, 
  Target, 
  Sparkles, 
  Calculator, 
  FileText, 
  User, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  X
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

// Navigation Item Structure
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'core' | 'tools' | 'system';
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, category: 'core' },
  { name: 'Transactions', href: '/dashboard/transactions', icon: Receipt, category: 'core' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp, category: 'core' },
  { name: 'Savings', href: '/dashboard/savings', icon: PiggyBank, category: 'tools' },
  { name: 'Goals', href: '/dashboard/goals', icon: Target, category: 'tools' },
  { name: 'AI Advisor', href: '/dashboard/ai', icon: Sparkles, category: 'tools' },
  { name: 'Tax Planner', href: '/dashboard/taxes', icon: Calculator, category: 'tools' },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText, category: 'system' },
  { name: 'Profile', href: '/dashboard/profile', icon: User, category: 'system' },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, category: 'system' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { 
    isSidebarCollapsed, 
    isMobileSidebarOpen, 
    toggleSidebar, 
    closeMobileSidebar 
  } = useUIStore();

  const renderNavLinks = (category: 'core' | 'tools' | 'system') => {
    return navItems
      .filter((item) => item.category === category)
      .map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link key={item.href} href={item.href} onClick={closeMobileSidebar}>
            <span
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-250 relative group ${
                isActive
                  ? 'bg-primary/10 text-primary border-l-2 border-primary'
                  : 'text-muted hover:bg-surface hover:text-text'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : 'text-muted group-hover:text-text'}`} />
              
              {!isSidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {item.name}
                </motion.span>
              )}

              {/* Tooltip for collapsed state */}
              {isSidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-surface border border-border text-text text-xs rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50 whitespace-nowrap shadow-md">
                  {item.name}
                </div>
              )}
            </span>
          </Link>
        );
      });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className={`hidden md:flex flex-col bg-background border-r border-border h-screen sticky top-0 z-40 transition-all duration-300 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}
        animate={{ width: isSidebarCollapsed ? 64 : 256 }}
      >
        {/* Header/Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-background text-lg flex-shrink-0">
              W
            </div>
            {!isSidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-extrabold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap"
              >
                WellFinanced
              </motion.span>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
          <div>
            {!isSidebarCollapsed && (
              <h4 className="px-3 text-xs font-semibold text-muted/65 uppercase tracking-wider mb-2">Core</h4>
            )}
            <div className="space-y-1">{renderNavLinks('core')}</div>
          </div>

          <div>
            {!isSidebarCollapsed && (
              <h4 className="px-3 text-xs font-semibold text-muted/65 uppercase tracking-wider mb-2">Workspace</h4>
            )}
            <div className="space-y-1">{renderNavLinks('tools')}</div>
          </div>

          <div>
            {!isSidebarCollapsed && (
              <h4 className="px-3 text-xs font-semibold text-muted/65 uppercase tracking-wider mb-2">Account</h4>
            )}
            <div className="space-y-1">{renderNavLinks('system')}</div>
          </div>
        </div>

        {/* Collapse Toggle Footer */}
        <div className="p-2 border-t border-border flex justify-end">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors w-full flex justify-center items-center"
            aria-label="Toggle Sidebar"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Drawer (Overlay and Menu) */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileSidebar}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />

            {/* Sidebar drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-background border-r border-border z-50 flex flex-col md:hidden"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                <Link href="/dashboard" className="flex items-center gap-2" onClick={closeMobileSidebar}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-background text-lg">
                    W
                  </div>
                  <span className="font-extrabold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    WellFinanced
                  </span>
                </Link>
                <button
                  onClick={closeMobileSidebar}
                  className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
                <div>
                  <h4 className="px-3 text-xs font-semibold text-muted/65 uppercase tracking-wider mb-2">Core</h4>
                  <div className="space-y-1">{renderNavLinks('core')}</div>
                </div>

                <div>
                  <h4 className="px-3 text-xs font-semibold text-muted/65 uppercase tracking-wider mb-2">Workspace</h4>
                  <div className="space-y-1">{renderNavLinks('tools')}</div>
                </div>

                <div>
                  <h4 className="px-3 text-xs font-semibold text-muted/65 uppercase tracking-wider mb-2">Account</h4>
                  <div className="space-y-1">{renderNavLinks('system')}</div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
