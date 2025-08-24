'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useIssueDetail } from '@/hooks/useIssueDetail';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { IssueDetail } from '@/components/IssueDetail';

export default function IssueDetailPage() {
  const params = useParams();
  const issueNumber = parseInt(params.number as string, 10);
  
  const { data: issue, isLoading, error } = useIssueDetail(issueNumber);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="glass-card p-12 text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-400">Loading issue details...</p>
        </div>
      </main>
    );
  }

  if (error || !issue) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Issue Not Found</h3>
          <p className="text-gray-400 mb-4">
            {error?.message || 'The issue you\'re looking for doesn\'t exist.'}
          </p>
          <Link
            href="/"
            className="glass-button px-6 py-2 rounded-lg flex items-center gap-2 mx-auto hover:bg-primary-500/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Issues
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="glass-button px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-500/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Issues
        </Link>
        
        <a
          href={issue.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-button px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-500/20 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View on GitHub
        </a>
      </div>

      {/* Issue Detail Component */}
      <IssueDetail issue={issue} />
    </main>
  );
}
