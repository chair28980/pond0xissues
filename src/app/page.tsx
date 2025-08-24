'use client';

import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { IssuesList } from '@/components/IssuesList';

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

      {/* Footer */}
      <footer className="mt-16 text-center">
        <div className="pond-card p-8">
          <p className="text-gray-300 text-base font-medium">
            Exclaimed with ❤️ for the Pond0x community •{' '}
            <a
              href="https://github.com/Cary0x/pond0x-issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cyan-400 transition-colors font-semibold underline underline-offset-2"
            >
              View source
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}