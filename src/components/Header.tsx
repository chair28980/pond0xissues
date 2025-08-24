'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Github, GraduationCap } from 'lucide-react';
import { hasCompletedTutorial } from '@/lib/utils';

interface HeaderProps {
  totalIssues: number;
  openIssues: number;
  closedIssues: number;
}

export function Header({ totalIssues, openIssues, closedIssues }: HeaderProps) {
  const router = useRouter();
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTutorialCompleted(hasCompletedTutorial());
  }, []);

  return (
    <header className="pond-card p-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black gradient-text">
              POND0X
            </h1>
            <p className="text-gray-300 text-base font-medium">Issues Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Tutorial Button */}
          <button
            onClick={() => router.push('/tutorial/welcome')}
            className={`gradient-button flex items-center gap-2 text-sm font-semibold relative overflow-hidden ${
              isMounted && !tutorialCompleted 
                ? 'animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]' 
                : 'shadow-lg hover:shadow-xl'
            }`}
            title={isMounted && tutorialCompleted ? 'Restart GitHub tutorial' : 'Learn how to use GitHub'}
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isMounted && tutorialCompleted ? 'Tutorial' : 'Learn GitHub'}
            </span>
            {isMounted && !tutorialCompleted && (
              <div className="w-2 h-2 bg-white rounded-full animate-pulse ml-1" />
            )}
            {isMounted && !tutorialCompleted && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite] pointer-events-none" />
            )}
          </button>

          <a
            href="https://github.com/Cary0x/pond0x-issues"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-button flex items-center gap-2 text-sm font-semibold"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">View on GitHub</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="pond-card p-6 text-center group hover:scale-105 transition-transform duration-300">
          <div className="text-3xl font-black text-white mb-2">{totalIssues}</div>
          <div className="text-gray-300 font-medium">Total Issues</div>
        </div>
        <div className="pond-card p-6 text-center group hover:scale-105 transition-transform duration-300">
          <div className="text-3xl font-black text-primary-400 mb-2">{openIssues}</div>
          <div className="text-gray-300 font-medium">Open</div>
        </div>
        <div className="pond-card p-6 text-center group hover:scale-105 transition-transform duration-300">
          <div className="text-3xl font-black text-secondary-400 mb-2">{closedIssues}</div>
          <div className="text-gray-300 font-medium">Closed</div>
        </div>
      </div>
    </header>
  );
}

