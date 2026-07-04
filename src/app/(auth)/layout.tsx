import React from 'react';
import { AuthHeader } from '@/components/layout/AuthHeader';
import { AuthFooter } from '@/components/layout/AuthFooter';

export default function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col font-sans text-white bg-background overflow-x-hidden">
      {/* Global Background Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan/10 blur-[120px] pointer-events-none -z-10" />

      <AuthHeader />
      <main className="flex-1 flex w-full pt-20 pb-16 z-10 relative">
        {children}
      </main>
      <AuthFooter />
    </div>
  );
}
