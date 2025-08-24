export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string | null;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  labels: GitHubLabel[];
  comments: number;
}

export interface GitHubLabel {
  id: number;
  name: string;
  color: string;
  description: string | null;
}

export interface GitHubComment {
  id: number;
  body: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  author_association: string;
}

export interface GitHubTimelineEvent {
  id: number;
  event: string;
  created_at: string;
  actor: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  commit_id?: string;
  commit_url?: string;
  label?: GitHubLabel;
  assignee?: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface GitHubIssueDetail extends GitHubIssue {
  comments_data?: GitHubComment[];
  timeline?: GitHubTimelineEvent[];
}

export interface IssueFilters {
  state: 'all' | 'open' | 'closed';
  labels: string[];
  author: string;
  search: string;
  sort: 'newest' | 'oldest' | 'most_commented' | 'recently_updated';
}