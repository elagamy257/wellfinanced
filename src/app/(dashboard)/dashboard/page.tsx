import React from 'react';
import { PageContainer, ContentWrapper } from '@/components/layout';
import { SectionTitle, EmptyState } from '@/components/ui';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
  return (
    <PageContainer>
      <SectionTitle 
        title="Dashboard" 
        subtitle="AI-powered financial stability workstation" 
      />
      <ContentWrapper>
        <EmptyState 
          icon={LayoutDashboard}
          title="Overview Workspace" 
          description="This section represents the Dashboard Overview workspace foundation. Core platform widgets, stability indexes, and summary flows will integrate here."
        />
      </ContentWrapper>
    </PageContainer>
  );
}
