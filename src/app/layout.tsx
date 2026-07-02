import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppLayout } from '@/components/layout/AppLayout';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WellFinanced | AI-Powered Financial Stability Platform',
  description: 'A financial stability platform built for freelancers, creators, solopreneurs, and independent workers with irregular income.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="antialiased bg-background text-text min-h-screen">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
