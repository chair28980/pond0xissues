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

// Tutorial state management
export function getTutorialState(): { hasSeenTutorial: boolean } {
  if (typeof window === 'undefined') return { hasSeenTutorial: false };
  return { hasSeenTutorial: false }; // Always show tutorial for demo purposes
}

export function saveTutorialState(completed: boolean): void {
  if (typeof window === 'undefined') return;
  // In a real app, you would save to localStorage, but for Claude artifacts we'll skip persistence
  console.log('Tutorial completed:', completed);
}

