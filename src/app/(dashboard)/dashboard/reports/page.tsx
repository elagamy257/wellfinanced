import React from 'react';
import { PageContainer, ContentWrapper, Breadcrumb } from '@/components/layout';
import { SectionTitle, EmptyState } from '@/components/ui';
import { FileText } from 'lucide-react';

export default function ReportsPage() {
  return (
    <PageContainer>
      <Breadcrumb />
      <SectionTitle 

        title="Reports" 
        subtitle="Export stability analysis, cash flow logs, and income records" 
      />
      <ContentWrapper>
        <EmptyState 
          icon={FileText}
          title="Financial Export Center" 
          description="This section represents the report compiler. PDF export layouts, CSV logs, and automated business stability records will generate here."
        />
      </ContentWrapper>
    </PageContainer>
  );
}
