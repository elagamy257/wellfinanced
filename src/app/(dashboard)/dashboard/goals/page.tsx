import React from 'react';
import { PageContainer, ContentWrapper, Breadcrumb } from '@/components/layout';
import { SectionTitle, EmptyState } from '@/components/ui';
import { Target } from 'lucide-react';

export default function GoalsPage() {
  return (
    <PageContainer>
      <Breadcrumb />
      <SectionTitle 

        title="Goals" 
        subtitle="Track financial safety thresholds and target achievements" 
      />
      <ContentWrapper>
        <EmptyState 
          icon={Target}
          title="Financial Targets & Milestones" 
          description="This section represents the financial goal tracker. Saving challenges, stability targets, and milestone calculations will reside here."
        />
      </ContentWrapper>
    </PageContainer>
  );
}
