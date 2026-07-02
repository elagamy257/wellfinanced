import React from 'react';
import { PageContainer, ContentWrapper } from '@/components/layout';
import { SectionTitle, EmptyState } from '@/components/ui';
import { PiggyBank } from 'lucide-react';

export default function SavingsPage() {
  return (
    <PageContainer>
      <SectionTitle 
        title="Savings" 
        subtitle="Manage irregular income buffers, reserves, and safety nets" 
      />
      <ContentWrapper>
        <EmptyState 
          icon={PiggyBank}
          title="Savings & Buffer Vaults" 
          description="This section represents the savings buffer workspace. Dynamic runway modeling and emergency fund distributions will integrate here."
        />
      </ContentWrapper>
    </PageContainer>
  );
}
