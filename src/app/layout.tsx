import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/QueryProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { TutorialProvider } from '@/components/tutorial/TutorialProvider';
import { ConditionalTutorialOverlay } from '@/components/ConditionalTutorialOverlay';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Pond0x Issues Dashboard',
  description: 'Track and manage Pond0x project issues',
  keywords: ['pond0x', 'github', 'issues', 'dashboard', 'nft'],
  authors: [{ name: 'Pond0x Team' }],
  openGraph: {
    title: 'Pond0x Issues Dashboard',
    description: 'Track and manage Pond0x project issues',
    type: 'website',
    url: 'https://pond0xissues.vercel.app/',
    siteName: 'Pond0x Issues',
    images: [
      {
        url: 'https://pond0xissues.vercel.app/copeman.jpeg',
        width: 1200,
        height: 630,
        alt: 'Pond0x Issues Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pond0x Issues Dashboard',
    description: 'Track and manage Pond0x project issues',
    images: ['https://pond0xissues.vercel.app/copeman.jpeg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#10b981',
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
            <TutorialProvider>
              <div className="min-h-screen bg-gradient-pond relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-gradient-pond-alt opacity-80" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-pink/10 rounded-full blur-2xl animate-pulse delay-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  {children}
                </div>

                {/* Tutorial Overlay - Only show on non-tutorial pages */}
                <ConditionalTutorialOverlay />
              </div>
            </TutorialProvider>
          </QueryProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}