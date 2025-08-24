'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { IssueFilters } from '@/types/github';
import { useLabels } from '@/hooks/useIssues';
import { LabelBadge } from '@/components/ui/LabelBadge';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filters: IssueFilters;
  onFiltersChange: (filters: IssueFilters) => void;
}

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  const [showLabelFilter, setShowLabelFilter] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { data: allLabels = [] } = useLabels();

  const updateFilters = (updates: Partial<IssueFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleLabel = (labelName: string) => {
    const newLabels = filters.labels.includes(labelName)
      ? filters.labels.filter(l => l !== labelName)
      : [...filters.labels, labelName];
    updateFilters({ labels: newLabels });
  };

  const toggleLabelFilter = () => {
    if (!showLabelFilter && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: Math.max(320, rect.width)
      });
    }
    setShowLabelFilter(!showLabelFilter);
  };

  useEffect(() => {
    if (!showLabelFilter) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        const dropdown = document.querySelector('[data-dropdown="labels"]') as HTMLElement;
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setShowLabelFilter(false);
        }
      }
    };

    const handleScroll = () => {
      setShowLabelFilter(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showLabelFilter]);

  const clearAllFilters = () => {
    onFiltersChange({
      state: 'all',
      labels: [],
      author: '',
      search: '',
      sort: 'newest',
    });
  };

  const hasActiveFilters = filters.state !== 'all' || filters.labels.length > 0 || filters.author || filters.search;

  return (
    <div className="pond-card p-6 mb-6 space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search issues..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        <select
          value={filters.sort}
          onChange={(e) => updateFilters({ sort: e.target.value as IssueFilters['sort'] })}
          className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most_commented">Most Commented</option>
          <option value="recently_updated">Recently Updated</option>
        </select>
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <div className="flex bg-white/5 rounded-lg p-1">
          {(['all', 'open', 'closed'] as const).map((state) => (
            <button
              key={state}
              onClick={() => updateFilters({ state })}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-all capitalize',
                filters.state === state
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              )}
            >
              {state}
            </button>
          ))}
        </div>

        {/* Label Filter */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={toggleLabelFilter}
            className="glass-button px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
          >
            <Filter className="w-4 h-4" />
            Labels ({filters.labels.length})
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-gray-400 hover:text-white flex items-center gap-1 text-sm transition-colors"
          >
            <X className="w-4 h-4" />
            Clear filters
          </button>
        )}
      </div>

      {/* Active Label Filters */}
      {filters.labels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.labels.map((labelName) => {
            const label = allLabels.find(l => l.name === labelName);
            if (!label) return null;
            
            return (
              <div key={labelName} className="flex items-center gap-1">
                <LabelBadge label={label} />
                <button
                  onClick={() => toggleLabel(labelName)}
                  className="text-gray-400 hover:text-white ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Portal-based dropdown */}
      {showLabelFilter && typeof window !== 'undefined' && createPortal(
        <div 
          data-dropdown="labels"
          className="fixed glass-card p-4 z-[9999] max-h-60 overflow-y-auto shadow-2xl"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width,
          }}
        >
          <div className="space-y-2">
            {allLabels.map((label) => (
              <label key={label.id} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 rounded p-2">
                <input
                  type="checkbox"
                  checked={filters.labels.includes(label.name)}
                  onChange={() => toggleLabel(label.name)}
                  className="w-4 h-4 text-primary-500 focus:ring-primary-500 bg-transparent border-gray-300 rounded"
                />
                <LabelBadge label={label} />
              </label>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

