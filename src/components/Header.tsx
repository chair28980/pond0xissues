'use client';

import { Github } from 'lucide-react';

interface HeaderProps {
  totalIssues: number;
  openIssues: number;
  closedIssues: number;
}

export function Header({ totalIssues, openIssues, closedIssues }: HeaderProps) {

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

