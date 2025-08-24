'use client';

import { BookOpen, Github, Sparkles } from 'lucide-react';
import { useTutorial } from '@/hooks/useTutorial';
import { cn } from '@/lib/utils';

export function GitHubTutorialButton() {
  const { startTutorial } = useTutorial();

  return (
    <div className="relative">
      {/* Pulsing glow effect */}
      <div className="absolute inset-0 bg-primary-500/30 rounded-xl blur-xl animate-pulse" />
      
      <button
        onClick={startTutorial}
        className={cn(
          "relative glass-card p-4 hover:bg-white/15 transition-all duration-300 hover:scale-105",
          "flex items-center gap-3 group cursor-pointer",
          "border-primary-500/30 hover:border-primary-400/50"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-accent-yellow animate-bounce" />
          </div>
          
          <div className="text-left">
            <h3 className="text-white font-semibold group-hover:text-primary-300 transition-colors">
              New to GitHub?
            </h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
              Learn how to submit your first issue
            </p>
          </div>
        </div>

        <div className="ml-auto">
          <BookOpen className="w-5 h-5 text-primary-400 group-hover:text-primary-300 transition-colors" />
        </div>
      </button>
    </div>
  );
}

