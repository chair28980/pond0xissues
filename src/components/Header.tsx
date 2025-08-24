'use client';

import { Github } from 'lucide-react';

interface HeaderProps {
  totalIssues: number;
  openIssues: number;
  closedIssues: number;
}

export function Header({ totalIssues, openIssues, closedIssues }: HeaderProps) {

  return (
    <header className="glass-card p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-black text-white">P0</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black gradient-text">
                POND0X
              </h1>
              <p className="text-gray-400 text-sm">Issues Dashboard</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Cary0x/pond0x-issues"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:text-primary-400 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">View on GitHub</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-white">{totalIssues}</div>
          <div className="text-sm text-gray-400">Total Issues</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-primary-400">{openIssues}</div>
          <div className="text-sm text-gray-400">Open</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-secondary-400">{closedIssues}</div>
          <div className="text-sm text-gray-400">Closed</div>
        </div>
      </div>
    </header>
  );
}

