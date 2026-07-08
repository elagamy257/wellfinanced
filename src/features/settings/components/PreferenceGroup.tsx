'use client';

import React from 'react';

interface PreferenceGroupProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
}

export function PreferenceGroup({ children, columns = 2 }: PreferenceGroupProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2 gap-6',
    3: 'grid-cols-1 md:grid-cols-3 gap-6'
  };

  return (
    <div className={`grid ${colClasses[columns]}`}>
      {children}
    </div>
  );
}
