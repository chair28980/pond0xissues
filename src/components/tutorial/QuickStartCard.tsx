'use client';

import { Rocket, ExternalLink, BookOpen } from 'lucide-react';
import { useTutorial } from '@/hooks/useTutorial';

export function QuickStartCard() {
  const { startTutorial } = useTutorial();

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-yellow to-accent-orange rounded-xl flex items-center justify-center flex-shrink-0">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Want to Report a Bug or Suggest a Feature?
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              Help improve Pond0x by reporting issues! Whether you found a bug or have a great 
              idea for a new feature, your feedback is valuable to the community.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-red-500/20 text-red-200 text-xs rounded-full">Bug Reports</span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-200 text-xs rounded-full">Feature Requests</span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-200 text-xs rounded-full">Questions</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={startTutorial}
            className="glass-button px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-primary-500/20 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            First Time? Start Tutorial
          </button>
          
          <a
            href="https://github.com/Cary0x/pond0x-issues/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors justify-center"
          >
            Submit Issue
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

