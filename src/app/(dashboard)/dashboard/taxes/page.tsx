import React from 'react';
import { PageContainer, ContentWrapper } from '@/components/layout';
import { SectionTitle, EmptyState } from '@/components/ui';
import { Calculator } from 'lucide-react';

export default function TaxesPage() {
  return (
    <PageContainer>
      <SectionTitle 
        title="Tax Planner" 
        subtitle="Estimate write-offs and dynamic quarterly tax reserves" 
      />
      <ContentWrapper>
        <EmptyState 
          icon={Calculator}
          title="Estimated Tax Reserves" 
          description="This section represents the tax planner workspace. Write-off categories, tax bracket estimates, and automated deduction formulas will render here."
        />
      </ContentWrapper>
    </PageContainer>
  );
}
