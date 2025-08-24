'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { GitHubIssue } from '@/types/github';
import { IssueCard } from '@/components/IssueCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface IssuesListProps {
  issues: GitHubIssue[];
  isLoading: boolean;
  error: Error | null;
  onRefresh: () => void;
}

export function IssuesList({ issues, isLoading, error, onRefresh }: IssuesListProps) {
  if (isLoading) {
    return (
      <div className="glass-card p-12 text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-400">Loading issues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-8 text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Error Loading Issues</h3>
        <p className="text-gray-400 mb-4">{error.message}</p>
        <button
          onClick={onRefresh}
          className="glass-button px-6 py-2 rounded-lg flex items-center gap-2 mx-auto hover:bg-primary-500/20 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Issues Found</h3>
        <p className="text-gray-400">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          Showing {issues.length} issue{issues.length !== 1 ? 's' : ''}
        </p>
        <button
          onClick={onRefresh}
          className="text-gray-400 hover:text-white transition-colors"
          title="Refresh issues"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid gap-4">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}

