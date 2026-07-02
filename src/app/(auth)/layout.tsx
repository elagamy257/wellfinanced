import React from 'react';

interface AuthGroupLayoutProps {
  children: React.ReactNode;
}

export default function AuthGroupLayout({ children }: AuthGroupLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-3xl" />
      
      {/* Wrapper */}
      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  );
}
