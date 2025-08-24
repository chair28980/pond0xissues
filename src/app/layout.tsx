import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/QueryProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Pond0x Issues Dashboard',
  description: 'A beautiful dashboard for tracking Pond0x GitHub issues',
  keywords: ['pond0x', 'github', 'issues', 'dashboard', 'nft'],
  authors: [{ name: 'Pond0x Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#10b981',
  openGraph: {
    title: 'Pond0x Issues Dashboard',
    description: 'Track and manage Pond0x project issues',
    type: 'website',
    siteName: 'Pond0x Issues',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pond0x Issues Dashboard',
    description: 'Track and manage Pond0x project issues',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <ErrorBoundary>
          <QueryProvider>
            <div className="min-h-screen bg-gradient-pond">
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative">
                {children}
              </div>
            </div>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}