'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { githubService } from '@/lib/github';
import { GitHubIssue, IssueFilters } from '@/types/github';

export function useIssues() {
  const [filters, setFilters] = useState<IssueFilters>({
    state: 'all',
    labels: [],
    author: '',
    search: '',
    sort: 'newest',
  });

  const { data: issues = [], isLoading, error, refetch } = useQuery({
    queryKey: ['issues', filters.state, filters.sort],
    queryFn: () => {
      const sortMapping = {
        newest: { sort: 'created' as const, direction: 'desc' as const },
        oldest: { sort: 'created' as const, direction: 'asc' as const },
        most_commented: { sort: 'comments' as const, direction: 'desc' as const },
        recently_updated: { sort: 'updated' as const, direction: 'desc' as const },
      };

      const { sort, direction } = sortMapping[filters.sort];
      
      return githubService.fetchIssues({
        state: filters.state === 'all' ? undefined : filters.state,
        sort,
        direction,
        per_page: 100,
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const filteredIssues = useMemo(() => {
    return issues.filter((issue: GitHubIssue) => {
      // Filter by labels
      if (filters.labels.length > 0) {
        const hasMatchingLabel = filters.labels.some(filterLabel =>
          issue.labels.some(label => label.name === filterLabel)
        );
        if (!hasMatchingLabel) return false;
      }

      // Filter by author
      if (filters.author && issue.user.login !== filters.author) {
        return false;
      }

      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesTitle = issue.title.toLowerCase().includes(searchTerm);
        const matchesBody = issue.body?.toLowerCase().includes(searchTerm);
        if (!matchesTitle && !matchesBody) return false;
      }

      return true;
    });
  }, [issues, filters]);

  const stats = useMemo(() => {
    const openIssues = filteredIssues.filter(issue => issue.state === 'open').length;
    const closedIssues = filteredIssues.filter(issue => issue.state === 'closed').length;
    
    return {
      total: filteredIssues.length,
      open: openIssues,
      closed: closedIssues,
    };
  }, [filteredIssues]);

  return {
    issues: filteredIssues,
    isLoading,
    error,
    filters,
    setFilters,
    stats,
    refetch,
  };
}

export function useLabels() {
  return useQuery({
    queryKey: ['labels'],
    queryFn: () => githubService.fetchLabels(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

