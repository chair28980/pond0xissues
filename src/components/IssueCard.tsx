'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ExternalLink, MessageCircle, Calendar, User } from 'lucide-react';
import { GitHubIssue } from '@/types/github';
import { StatusIcon } from '@/components/ui/StatusIcon';
import { LabelBadge } from '@/components/ui/LabelBadge';
import { formatRelativeTime, truncateText } from '@/lib/utils';

interface IssueCardProps {
  issue: GitHubIssue;
  compact?: boolean;
}

export function IssueCard({ issue, compact = false }: IssueCardProps) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on a link or interactive element
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    router.push(`/issues/${issue.number}`);
  };

  return (
    <article 
      className="pond-card p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <StatusIcon status={issue.state} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2 leading-tight group-hover:text-primary-400 transition-colors">
                {truncateText(issue.title, 80)}
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <span className="font-mono text-primary-400">#{issue.number}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatRelativeTime(issue.created_at)}
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <a
                    href={issue.user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-400 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {issue.user.login}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {issue.comments > 0 && (
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <MessageCircle className="w-4 h-4" />
                  {issue.comments}
                </div>
              )}
              
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Body Preview */}
          {!compact && issue.body && (
            <div className="mb-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                {truncateText(issue.body.replace(/[#*`\n]/g, ' ').trim(), 150)}
              </p>
            </div>
          )}

          {/* Labels */}
          {issue.labels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {issue.labels.slice(0, compact ? 3 : 5).map((label) => (
                <LabelBadge key={label.id} label={label} />
              ))}
              {issue.labels.length > (compact ? 3 : 5) && (
                <span className="text-xs text-gray-400 self-center">
                  +{issue.labels.length - (compact ? 3 : 5)} more
                </span>
              )}
            </div>
          )}

          {/* Author Avatar */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
            <Image
              src={issue.user.avatar_url}
              alt={issue.user.login}
              width={24}
              height={24}
              className="w-6 h-6 rounded-full ring-2 ring-white/20"
            />
            <span className="text-sm text-gray-400">
              by <span className="text-white font-medium">{issue.user.login}</span>
            </span>
            {issue.state === 'closed' && issue.closed_at && (
              <>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-400">
                  closed {formatRelativeTime(issue.closed_at)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
