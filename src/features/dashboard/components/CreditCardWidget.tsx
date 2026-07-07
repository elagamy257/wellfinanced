'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

interface WidgetProps {
  isLoading?: boolean;
}

export function CreditCardWidget({ isLoading = false }: WidgetProps) {
  return (
    <Card 
      variant="default" 
      className="h-[185px] relative overflow-hidden group select-none bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 border-none shadow-[0_15px_35px_rgba(124,58,237,0.3)]"
    >
      {/* Gloss reflection overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/10 opacity-70" />
      
      {/* Glowing card ring decoration */}
      <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {isLoading ? (
        <div className="p-6 h-full flex flex-col justify-between relative z-10">
          <div className="flex justify-between items-start">
            <Skeleton variant="circle" className="w-8 h-8 bg-white/10" />
            <Skeleton variant="text" className="w-16 h-6 bg-white/10" />
          </div>
          <Skeleton variant="text" className="w-3/4 h-8 bg-white/10" />
          <div className="flex justify-between items-end">
            <Skeleton variant="text" className="w-1/3 h-4 bg-white/10" />
            <Skeleton variant="text" className="w-10 h-4 bg-white/10" />
          </div>
        </div>
      ) : (
        <div className="p-6 h-full flex flex-col justify-between relative z-10">
          {/* Top Row: Contactless Waves & Brand Logo */}
          <div className="flex justify-between items-start">
            {/* Contactless symbol using SVG */}
            <svg 
              className="w-6 h-6 text-white/85 transform rotate-90" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24" 
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 12l.75-5M13.5 19l-.75-7 .75-5M17.25 21l-.75-9 .75-9" />
            </svg>
            
            {/* Visa Logo Text */}
            <span className="text-xl font-black italic text-white tracking-tighter">
              VISA
            </span>
          </div>

          {/* Middle Row: Card Type and Number */}
          <div className="space-y-0.5">
            <span className="text-[8px] font-black text-pink-300 tracking-widest uppercase block">
              Corporate Debit
            </span>
            <span className="text-xl font-bold font-mono text-white tracking-[0.25em] block pt-1">
              •••• •••• •••• 8824
            </span>
          </div>

          {/* Bottom Row: Cardholder & Expiry */}
          <div className="flex justify-between items-end">
            <div className="space-y-0.5">
              <span className="text-[7px] text-white/50 uppercase tracking-wider block">
                Card Holder
              </span>
              <span className="text-[10px] font-bold text-white uppercase tracking-wider block">
                Wafaa Al-Sabbagh
              </span>
            </div>
            <div className="text-right space-y-0.5">
              <span className="text-[7px] text-white/50 uppercase tracking-wider block">
                Expires
              </span>
              <span className="text-[10px] font-bold text-white tracking-wider block">
                12/26
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
