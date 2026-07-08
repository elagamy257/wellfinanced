'use client';

import React from 'react';
import { PageContainer } from '@/components/layout';
import { SectionTitle } from '@/components/ui';
import { PublicProfileCard, StableSalaryBento } from '@/features/settings';

export default function SettingsPage() {
  return (
    <PageContainer>
      {/* Top Header Title */}
      <SectionTitle 
        title="Settings" 
        subtitle="Manage public profile metadata and salary reserve configurations." 
      />

      <div className="space-y-10 pb-20">
        
        {/* Public Profile Form Panel */}
        <PublicProfileCard />

        {/* Stable Salary Bento Title block */}
        <div className="pt-2 select-none">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Stable Salary Configuration
          </h2>
        </div>

        {/* Stable Salary Bento Grid */}
        <StableSalaryBento />

      </div>
    </PageContainer>
  );
}
