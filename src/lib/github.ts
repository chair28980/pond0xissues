import { GitHubIssue, GitHubLabel, GitHubComment, GitHubTimelineEvent, GitHubIssueDetail } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'Cary0x';
const REPO_NAME = 'pond0x-issues';

export class GitHubService {
  private baseUrl: string;
  private token?: string;

  constructor() {
    this.baseUrl = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`;
    this.token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `token ${this.token}`;
    }

    return headers;
  }

  async fetchIssues(params?: {
    state?: 'open' | 'closed' | 'all';
    labels?: string;
    sort?: 'created' | 'updated' | 'comments';
    direction?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
  }): Promise<GitHubIssue[]> {
    const searchParams = new URLSearchParams();
    
    if (params?.state) searchParams.append('state', params.state);
    if (params?.labels) searchParams.append('labels', params.labels);
    if (params?.sort) searchParams.append('sort', params.sort);
    if (params?.direction) searchParams.append('direction', params.direction);
    searchParams.append('per_page', (params?.per_page || 30).toString());
    searchParams.append('page', (params?.page || 1).toString());

    const url = `${this.baseUrl}/issues?${searchParams.toString()}`;
    
    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async fetchLabels(): Promise<GitHubLabel[]> {
    const response = await fetch(`${this.baseUrl}/labels`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async fetchIssue(issueNumber: number): Promise<GitHubIssue> {
    const response = await fetch(`${this.baseUrl}/issues/${issueNumber}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async fetchIssueComments(issueNumber: number): Promise<GitHubComment[]> {
    const response = await fetch(`${this.baseUrl}/issues/${issueNumber}/comments`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async fetchIssueTimeline(issueNumber: number): Promise<GitHubTimelineEvent[]> {
    const response = await fetch(`${this.baseUrl}/issues/${issueNumber}/timeline`, {
      headers: {
        ...this.getHeaders(),
        'Accept': 'application/vnd.github.mockingbird-preview+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async fetchIssueWithDetails(issueNumber: number): Promise<GitHubIssueDetail> {
    const [issue, comments, timeline] = await Promise.all([
      this.fetchIssue(issueNumber),
      this.fetchIssueComments(issueNumber),
      this.fetchIssueTimeline(issueNumber).catch(() => []), // Timeline might not be available
    ]);

    return {
      ...issue,
      comments_data: comments,
      timeline,
    };
  }
}

export const githubService = new GitHubService();

