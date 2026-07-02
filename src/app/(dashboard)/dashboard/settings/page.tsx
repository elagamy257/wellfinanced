import React from 'react';
import { PageContainer, ContentWrapper } from '@/components/layout';
import { SectionTitle, EmptyState } from '@/components/ui';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <PageContainer>
      <SectionTitle 
        title="Settings" 
        subtitle="Configure connections, default tax brackets, and security" 
      />
      <ContentWrapper>
        <EmptyState 
          icon={Settings}
          title="System Settings" 
          description="This section represents the platform configuration area. API connections, layout configurations, and notification controls will integrate here."
        />
      </ContentWrapper>
    </PageContainer>
  );
}
