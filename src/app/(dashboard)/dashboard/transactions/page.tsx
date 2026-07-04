import React from 'react';
import { PageContainer, ContentWrapper, Breadcrumb } from '@/components/layout';
import { SectionTitle, EmptyState } from '@/components/ui';
import { Receipt } from 'lucide-react';

export default function TransactionsPage() {
  return (
    <PageContainer>
      <Breadcrumb />
      <SectionTitle 

        title="Transactions" 
        subtitle="Manage irregular payments, invoices, and expense allocations" 
      />
      <ContentWrapper>
        <EmptyState 
          icon={Receipt}
          title="Transactions Ledger" 
          description="This section represents the Transactions manager ledger. Invoices, tax deductibles, and income matching grids will integrate here."
        />
      </ContentWrapper>
    </PageContainer>
  );
}
