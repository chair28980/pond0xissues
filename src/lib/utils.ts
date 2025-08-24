import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
}

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export function formatRelativeTime(date: string): string {
  const now = new Date();
  const issueDate = new Date(date);
  const diffInMs = now.getTime() - issueDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

export function formatDate(date: string): string {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

import { UserProgress, TutorialState } from '@/types/tutorial';

// Tutorial-related utilities
export function getTutorialProgress(): UserProgress | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('pond0x-tutorial-progress');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveTutorialProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('pond0x-tutorial-progress', JSON.stringify(progress));
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function getTutorialState(): Partial<TutorialState> | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('pond0x-tutorial-state');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveTutorialState(state: Partial<TutorialState>): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('pond0x-tutorial-state', JSON.stringify(state));
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function clearTutorialData(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('pond0x-tutorial-state');
    localStorage.removeItem('pond0x-tutorial-progress');
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function hasCompletedTutorial(): boolean {
  const progress = getTutorialProgress();
  return progress?.completedAt != null;
}