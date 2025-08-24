'use client';

import Image from 'next/image';
import { 
  MessageCircle, 
  Calendar, 
  User, 
  Tag, 
  Clock,
  CheckCircle,
  XCircle,
  GitCommit,
  UserPlus,
  AlertTriangle
} from 'lucide-react';
import { GitHubIssueDetail } from '@/types/github';
import { StatusIcon } from '@/components/ui/StatusIcon';
import { LabelBadge } from '@/components/ui/LabelBadge';
import { formatRelativeTime, formatDate } from '@/lib/utils';

interface IssueDetailProps {
  issue: GitHubIssueDetail;
}

export function IssueDetail({ issue }: IssueDetailProps) {
  return (
    <div className="space-y-6">
      {/* Issue Header */}
      <div className="pond-card p-6">
        <div className="flex items-start gap-4 mb-4">
          <StatusIcon status={issue.state} size="lg" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
              {issue.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="font-mono text-primary-400">#{issue.number}</span>
              <span>•</span>
              <span className={`font-medium ${issue.state === 'open' ? 'text-green-400' : 'text-red-400'}`}>
                {issue.state === 'open' ? 'Open' : 'Closed'}
              </span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                opened {formatRelativeTime(issue.created_at)}
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <a
                  href={issue.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  {issue.user.login}
                </a>
              </div>
              {issue.comments > 0 && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {issue.comments} comment{issue.comments !== 1 ? 's' : ''}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Labels */}
        {issue.labels.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {issue.labels.map((label) => (
              <LabelBadge key={label.id} label={label} />
            ))}
          </div>
        )}

        {/* Closed info */}
        {issue.state === 'closed' && issue.closed_at && (
          <div className="flex items-center gap-2 text-sm text-gray-400 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <XCircle className="w-4 h-4 text-red-400" />
            <span>
              Closed {formatRelativeTime(issue.closed_at)} by{' '}
              <span className="text-white font-medium">{issue.user.login}</span>
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Issue Body */}
          <div className="pond-card p-0 overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <Image
                  src={issue.user.avatar_url}
                  alt={issue.user.login}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full ring-2 ring-white/20"
                />
                <div>
                  <div className="font-medium text-white">{issue.user.login}</div>
                  <div className="text-sm text-gray-400">
                    commented {formatRelativeTime(issue.created_at)}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              {issue.body ? (
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {issue.body}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 italic">
                  No description provided.
                </div>
              )}
            </div>
          </div>

          {/* Comments */}
          {issue.comments_data && issue.comments_data.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Comments ({issue.comments_data.length})
              </h2>
              
              {issue.comments_data.map((comment) => (
                <div key={comment.id} className="pond-card p-0 overflow-hidden">
                  <div className="p-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src={comment.user.avatar_url}
                          alt={comment.user.login}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full ring-2 ring-white/20"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{comment.user.login}</span>
                            {comment.author_association !== 'NONE' && (
                              <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full">
                                {comment.author_association}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-400">
                            commented {formatRelativeTime(comment.created_at)}
                            {comment.updated_at !== comment.created_at && (
                              <span className="ml-2">• edited</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {comment.body}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Issue Meta */}
          <div className="pond-card p-4">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Details
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={`font-medium ${issue.state === 'open' ? 'text-green-400' : 'text-red-400'}`}>
                  {issue.state === 'open' ? 'Open' : 'Closed'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Created:</span>
                <span className="text-white">{formatDate(issue.created_at)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Updated:</span>
                <span className="text-white">{formatDate(issue.updated_at)}</span>
              </div>
              
              {issue.closed_at && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Closed:</span>
                  <span className="text-white">{formatDate(issue.closed_at)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-400">Comments:</span>
                <span className="text-white">{issue.comments}</span>
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="pond-card p-4">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              Author
            </h3>
            
            <div className="flex items-center gap-3">
              <Image
                src={issue.user.avatar_url}
                alt={issue.user.login}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full ring-2 ring-white/20"
              />
              <div>
                <div className="font-medium text-white">{issue.user.login}</div>
                <a
                  href={issue.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-400 hover:underline"
                >
                  View profile
                </a>
              </div>
            </div>
          </div>

          {/* Timeline Events */}
          {issue.timeline && issue.timeline.length > 0 && (
            <div className="pond-card p-4">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Timeline
              </h3>
              
              <div className="space-y-3">
                {issue.timeline.slice(-5).map((event, index) => (
                  <div key={event.id || index} className="flex items-start gap-3 text-sm">
                    <div className="flex-shrink-0 mt-1">
                      {event.event === 'closed' && <XCircle className="w-4 h-4 text-red-400" />}
                      {event.event === 'reopened' && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {event.event === 'labeled' && <Tag className="w-4 h-4 text-blue-400" />}
                      {event.event === 'unlabeled' && <Tag className="w-4 h-4 text-gray-400" />}
                      {event.event === 'assigned' && <UserPlus className="w-4 h-4 text-purple-400" />}
                      {event.event === 'referenced' && <GitCommit className="w-4 h-4 text-orange-400" />}
                      {!['closed', 'reopened', 'labeled', 'unlabeled', 'assigned', 'referenced'].includes(event.event) && (
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-300">
                        <span className="text-white font-medium">{event.actor.login}</span>{' '}
                        {event.event === 'closed' && 'closed this issue'}
                        {event.event === 'reopened' && 'reopened this issue'}
                        {event.event === 'labeled' && `added the ${event.label?.name} label`}
                        {event.event === 'unlabeled' && `removed the ${event.label?.name} label`}
                        {event.event === 'assigned' && `assigned ${event.assignee?.login}`}
                        {event.event === 'referenced' && 'referenced this issue'}
                        {!['closed', 'reopened', 'labeled', 'unlabeled', 'assigned', 'referenced'].includes(event.event) && 
                          `${event.event} this issue`}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {formatRelativeTime(event.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
