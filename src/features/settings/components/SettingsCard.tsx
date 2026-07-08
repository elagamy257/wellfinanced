'use client';

import React from 'react';
import { Card } from '@/components/ui';

interface SettingsCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function SettingsCard({ children, className = '', glow = false }: SettingsCardProps) {
  return (
    <Card 
      variant="default" 
      className={`relative overflow-hidden ${className} ${glow ? 'border-primary/20 bg-primary/2' : ''}`}
    >
      {glow && (
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/4 rounded-full blur-[80px] pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </Card>
  );
}
