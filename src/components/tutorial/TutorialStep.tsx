'use client';

import React from 'react';
import { TutorialStepProps, TutorialHighlight } from '@/types/tutorial';
import { cn } from '@/lib/utils';

interface TutorialStepComponentProps extends TutorialStepProps {
  title: string;
  description: string;
  children: React.ReactNode;
  highlights?: TutorialHighlight[];
  className?: string;
  showProgress?: boolean;
}

export function TutorialStep({
  title,
  description,
  children,
  highlights = [],
  className,
  currentStep,
  totalSteps,
  showProgress = true,
}: TutorialStepComponentProps) {
  
  // Apply highlights to elements on mount
  React.useEffect(() => {
    const highlightElements: HTMLElement[] = [];

    highlights.forEach(highlight => {
      const element = document.querySelector(highlight.element) as HTMLElement;
      if (element) {
        // Store original styles
        const originalStyles = {
          boxShadow: element.style.boxShadow,
          zIndex: element.style.zIndex,
          position: element.style.position,
          transition: element.style.transition,
        };

        // Apply highlight styles
        element.style.transition = 'all 0.3s ease-in-out';
        element.style.position = element.style.position || 'relative';
        element.style.zIndex = '1000';
        
        if (highlight.glow) {
          element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(168, 85, 247, 0.4)';
        } else {
          element.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.8)';
        }

        highlightElements.push(element);
        
        // Store original styles for cleanup
        (element as HTMLElement & { __originalStyles?: Record<string, string> }).__originalStyles = originalStyles;
      }
    });

    return () => {
      // Cleanup highlights
      highlightElements.forEach(element => {
        const originalStyles = (element as HTMLElement & { __originalStyles?: Record<string, string> }).__originalStyles;
        if (originalStyles) {
          Object.assign(element.style, originalStyles);
          delete (element as HTMLElement & { __originalStyles?: Record<string, string> }).__originalStyles;
        }
      });
    };
  }, [highlights]);

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Step Header */}
      <div className="mb-6">
        {showProgress && (
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <span>Step {currentStep + 1}</span>
            <span>•</span>
            <span>{totalSteps} total</span>
          </div>
        )}
        
        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
          {title}
        </h2>
        
        <p className="text-gray-300 text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

// Specialized step layouts
interface StepLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function CenteredStepLayout({ children, className }: StepLayoutProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center space-y-6', className)}>
      {children}
    </div>
  );
}

export function SplitStepLayout({ children, className }: StepLayoutProps) {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-8 items-center', className)}>
      {children}
    </div>
  );
}

export function ListStepLayout({ children, className }: StepLayoutProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  );
}

// Step content components
interface StepCardProps {
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted' | 'success' | 'warning';
}

export function StepCard({ 
  title, 
  children, 
  icon, 
  className, 
  variant = 'default' 
}: StepCardProps) {
  const variantStyles = {
    default: 'pond-card',
    highlighted: 'pond-card border-primary-500/50 bg-gradient-to-br from-primary-500/10 to-secondary-500/10',
    success: 'pond-card border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/10',
    warning: 'pond-card border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10',
  };

  return (
    <div className={cn(variantStyles[variant], 'p-6', className)}>
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && <div className="text-primary-400">{icon}</div>}
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
        </div>
      )}
      <div className="text-gray-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

interface StepListProps {
  items: Array<{
    title: string;
    description?: string;
    icon?: React.ReactNode;
    completed?: boolean;
  }>;
  className?: string;
}

export function StepList({ items, className }: StepListProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            'flex items-start gap-3 p-4 rounded-xl transition-all duration-300',
            'bg-white/5 border border-white/10 hover:bg-white/10',
            {
              'bg-green-500/10 border-green-500/30': item.completed,
            }
          )}
        >
          {item.icon && (
            <div className={cn(
              'mt-0.5 text-gray-400',
              { 'text-green-400': item.completed }
            )}>
              {item.icon}
            </div>
          )}
          <div className="flex-1">
            <h4 className={cn(
              'font-medium text-white mb-1',
              { 'text-green-300': item.completed }
            )}>
              {item.title}
            </h4>
            {item.description && (
              <p className="text-sm text-gray-400">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
