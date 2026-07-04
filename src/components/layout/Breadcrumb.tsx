'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-2 text-[10px] font-bold text-muted select-none mb-5 uppercase tracking-wider animate-fade-in" aria-label="Breadcrumb">
      <Link href="/dashboard" className="flex items-center gap-1.5 hover:text-text transition-colors">
        <Home className="w-3.5 h-3.5 text-primary-purple" />
        <span>Platform</span>
      </Link>
      
      {paths.map((path, idx) => {
        const href = `/${paths.slice(0, idx + 1).join('/')}`;
        const isLast = idx === paths.length - 1;
        // Clean display name, e.g. "ai" -> "AI Advisor", "taxes" -> "Tax Planner"
        let label = path.charAt(0).toUpperCase() + path.slice(1);
        if (path === 'ai') label = 'AI Advisor';
        if (path === 'taxes') label = 'Tax Planner';

        return (
          <React.Fragment key={href}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            {isLast ? (
              <span className="text-text font-extrabold text-primary-blue">{label}</span>
            ) : (
              <Link href={href} className="hover:text-text transition-colors">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
