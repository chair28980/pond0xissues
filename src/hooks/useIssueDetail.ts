'use client';

import { useQuery } from '@tanstack/react-query';
import { githubService } from '@/lib/github';

export function useIssueDetail(issueNumber: number) {
  return useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => githubService.fetchIssueWithDetails(issueNumber),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
    enabled: !!issueNumber && issueNumber > 0,
  });
}
