import React from 'react';
import { ProtectedLayout, DashboardLayout } from '@/components/layout';

interface DashboardGroupLayoutProps {
  children: React.ReactNode;
}

export default function DashboardGroupLayout({ children }: DashboardGroupLayoutProps) {
  return (
    <ProtectedLayout>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedLayout>
  );
}
