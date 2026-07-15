'use client';

import React from 'react';
import { PageContainer } from '@/components/layout';
import { SectionTitle } from '@/components/ui';
import { 
  PublicProfileCard, 
  StableSalaryBento, 
  useSmoothedSalary, 
  useAcceptSmoothedSalary 
} from '@/features/settings';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { data: salaryData, isLoading } = useSmoothedSalary();
  const { mutate: acceptSalary, isPending } = useAcceptSmoothedSalary();

  const handleAccept = (amount: number) => {
    acceptSalary(
      { accepted_amount: amount },
      {
        onSuccess: () => {
          toast.success('Payout settings updated!');
        },
        onError: () => {
          toast.error('Failed to update payout settings.');
        }
      }
    );
  };

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
        <StableSalaryBento 
          salary={salaryData} 
          isLoading={isLoading}
          isAccepting={isPending}
          onAccept={handleAccept}
        />

      </div>
    </PageContainer>
  );
}
