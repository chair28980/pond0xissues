'use client';

import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { IssuesList } from '@/components/IssuesList';
import { QuickStartCard } from '@/components/tutorial/QuickStartCard';
import { GitHubTutorialButton } from '@/components/tutorial/GitHubTutorialButton';
import { TutorialModal } from '@/components/tutorial/TutorialModal';
import { useIssues } from '@/hooks/useIssues';

export default function HomePage() {
  const { issues, isLoading, error, filters, setFilters, stats, refetch } = useIssues();

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <Header
        totalIssues={stats.total}
        openIssues={stats.open}
        closedIssues={stats.closed}
      />

      {/* Quick Start Section */}
      <QuickStartCard />

      {/* Floating Tutorial Button for Mobile */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        <GitHubTutorialButton />
      </div>

      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
      />

      <IssuesList
        issues={issues}
        isLoading={isLoading}
        error={error}
        onRefresh={refetch}
      />

      {/* Tutorial Modal */}
      <TutorialModal />

      {/* Footer */}
      <footer className="mt-16 text-center">
        <div className="glass-card p-6">
          <p className="text-gray-400 text-sm">
            Built with ❤️ for the Pond0x community •{' '}
            <a
              href="https://github.com/Cary0x/pond0x-issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              View Source
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}