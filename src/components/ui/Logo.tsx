'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
  onClick?: () => void;
}

export function Logo({ className = '', showText = true, onClick }: LogoProps) {
  return (
    <Link href="/" onClick={onClick} className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Neon logo graphic */}
      <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 relative bg-bg-1/80 border border-white/10 flex items-center justify-center shadow-glow">
        <Image 
          src="/logo.png" 
          alt="Dananir & Blanco Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
      {showText && (
        <span className="text-base font-extrabold tracking-tight text-white">
          Dananir w Blanco
        </span>
      )}
    </Link>
  );
}
