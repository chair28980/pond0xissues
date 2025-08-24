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

export interface IssueFilters {
  state: 'all' | 'open' | 'closed';
  labels: string[];
  author: string;
  search: string;
  sort: 'newest' | 'oldest' | 'most_commented' | 'recently_updated';
}

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  targetElement?: string;
  action?: {
    type: 'link' | 'button' | 'highlight';
    url?: string;
    text: string;
  };
}

export interface TutorialState {
  isActive: boolean;
  currentStep: number;
  completed: boolean;
  hasSeenTutorial: boolean;
}

