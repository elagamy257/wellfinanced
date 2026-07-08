import type { Metadata } from 'next';
import { AppLayout } from '@/components/layout/AppLayout';
import '@/styles/globals.css';

// Local font definition to bypass remote Google Fonts queries during offline compilation.
const inter = {
  variable: 'font-sans',
};

export const metadata: Metadata = {
  title: 'Fintova | AI-Powered Financial Stability Platform',
  description: 'A financial stability platform built for freelancers, creators, solopreneurs, and independent workers with irregular income.',
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
