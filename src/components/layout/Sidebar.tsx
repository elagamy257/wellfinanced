'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Receipt, 
  TrendingUp, 
  Target, 
  Sparkles, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  X,
  HelpCircle,
  LogOut,
  Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { tokenStorage } from '@/lib/auth/tokenStorage';
import { Logo } from '@/components/ui/Logo';

// Navigation Item Structure
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp },
  { name: 'AI Assistant', href: '/dashboard/ai', icon: Sparkles },
  { name: 'Transactions', href: '/dashboard/transactions', icon: Receipt },
  { name: 'Savings Goals', href: '/dashboard/goals', icon: Target },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();
  const { 
    isSidebarCollapsed, 
    isMobileSidebarOpen, 
    toggleSidebar, 
    closeMobileSidebar 
  } = useUIStore();

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMobileSidebar();

    // 1. Clear tokens from tokenStorage
    tokenStorage.clearTokens();

    // 2. Clear React Query cache
    queryClient.clear();

    // 3. Reset Zustand auth store state
    logout();

    // 4. Redirect to login
    router.replace('/login');
  };

  const renderNavLinks = () => {
    return navItems.map((item) => {
      const isActive = pathname === item.href;
      const Icon = item.icon;

      return (
        <Link key={item.href} href={item.href} onClick={closeMobileSidebar}>
          <span
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 relative group ${
              isActive
                ? 'bg-success/8 text-success border-l-3 border-success shadow-glow'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-success' : 'text-slate-400 group-hover:text-white'}`} />
            
            {!isSidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="tracking-tight"
              >
                {item.name}
              </motion.span>
            )}

            {/* Tooltip for collapsed state */}
            {isSidebarCollapsed && (
              <div className="absolute left-full ml-2.5 px-2.5 py-1.5 bg-bg-3 border border-white/10 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50 whitespace-nowrap shadow-xl">
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
        className={`hidden md:flex flex-col bg-bg-1/95 backdrop-blur-xl border-r border-white/5 h-screen sticky top-0 z-45`}
        animate={{ width: isSidebarCollapsed ? 64 : 256 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {/* Header/Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          <Logo showText={!isSidebarCollapsed} className="overflow-hidden" />
        </div>

        {/* Navigation & Action Area */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto px-2 py-4 space-y-6">
          <div className="space-y-1">{renderNavLinks()}</div>

          {/* Bottom Upgrade CTA & Help / Signout Links */}
          <div className="space-y-4">
            {/* Upgrade to Pro Button */}
            {!isSidebarCollapsed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-2 p-3.5 rounded-2xl bg-gradient-green text-black shadow-glow select-none group relative overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 fill-black text-black" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Upgrade to Pro
                  </span>
                </div>
                {/* Visual hover overlay */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.div>
            ) : (
              <Link href="/dashboard" className="flex justify-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-green flex items-center justify-center text-black shadow-glow hover:brightness-110 transition-all select-none">
                  <Zap className="w-4.5 h-4.5 fill-black" />
                </div>
              </Link>
            )}

            {/* Help and Logout */}
            <div className="space-y-1 border-t border-white/5 pt-4">
              <Link href="/dashboard">
                <span className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-bold text-slate-400 hover:bg-white/5 hover:text-white group relative">
                  <HelpCircle className="w-5 h-5 text-slate-400 group-hover:text-white shrink-0" />
                  {!isSidebarCollapsed && <span>Help Center</span>}
                  {isSidebarCollapsed && (
                    <div className="absolute left-full ml-2.5 px-2.5 py-1.5 bg-bg-3 border border-white/10 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50 whitespace-nowrap shadow-xl">
                      Help Center
                    </div>
                  )}
                </span>
              </Link>
 
              <button onClick={handleSignOut} className="w-full text-left cursor-pointer">
                <span className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-bold text-slate-400 hover:bg-red-500/10 hover:text-red-400 group relative">
                  <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-400 shrink-0" />
                  {!isSidebarCollapsed && <span>Sign Out</span>}
                  {isSidebarCollapsed && (
                    <div className="absolute left-full ml-2.5 px-2.5 py-1.5 bg-bg-3 border border-white/10 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50 whitespace-nowrap shadow-xl">
                      Sign Out
                    </div>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Collapse Toggle Footer */}
        <div className="p-2 border-t border-white/5 flex justify-end">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors w-full flex justify-center items-center cursor-pointer"
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
              className="fixed top-0 bottom-0 left-0 w-64 bg-bg-1 border-r border-white/5 z-50 flex flex-col md:hidden"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
                <Logo showText={true} onClick={closeMobileSidebar} />
                <button
                  onClick={closeMobileSidebar}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-between overflow-y-auto px-2 py-4 space-y-6">
                <div className="space-y-1">{renderNavLinks()}</div>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-gradient-green text-black shadow-glow select-none">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4 fill-black text-black" />
                      <span className="text-xs font-black uppercase tracking-wider">
                        Upgrade to Pro
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 border-t border-white/5 pt-4">
                    <Link href="/dashboard" onClick={closeMobileSidebar}>
                      <span className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-bold text-slate-400 hover:bg-white/5 hover:text-white">
                        <HelpCircle className="w-5 h-5 text-slate-400 shrink-0" />
                        <span>Help Center</span>
                      </span>
                    </Link>

                    <button onClick={handleSignOut} className="w-full text-left cursor-pointer">
                      <span className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-bold text-slate-400 hover:bg-red-500/10 hover:text-red-400">
                        <LogOut className="w-5 h-5 text-slate-400 shrink-0" />
                        <span>Sign Out</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
