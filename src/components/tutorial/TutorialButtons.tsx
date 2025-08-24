'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, SkipForward, X, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TutorialButtonsProps {
  currentStep: number;
  totalSteps: number;
  canSkip: boolean;
  isLastStep: boolean;
  isFirstStep: boolean;
  isPaused?: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onClose: () => void;
  onPause?: () => void;
  onResume?: () => void;
  className?: string;
}

export function TutorialButtons({
  currentStep,
  totalSteps,
  canSkip,
  isLastStep,
  isFirstStep,
  isPaused = false,
  onNext,
  onPrev,
  onSkip,
  onClose,
  onPause,
  onResume,
  className
}: TutorialButtonsProps) {
  const nextButtonText = isLastStep ? 'Complete Tutorial' : 'Next';
  const prevButtonText = isFirstStep ? 'Close' : 'Previous';

  const handlePrevious = () => {
    if (isFirstStep) {
      onClose();
    } else {
      onPrev();
    }
  };

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {/* Left Side - Previous/Close Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          className={cn(
            'glass-button flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white',
            'hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500/50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-300'
          )}
          aria-label={prevButtonText}
        >
          {isFirstStep ? (
            <X className="w-4 h-4" />
          ) : (
            <ArrowLeft className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">{prevButtonText}</span>
        </button>

        {/* Pause/Resume Button */}
        {(onPause || onResume) && !isFirstStep && !isLastStep && (
          <button
            onClick={isPaused ? onResume : onPause}
            className={cn(
              'glass-button flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-white',
              'hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500/50',
              'transition-all duration-300'
            )}
            aria-label={isPaused ? 'Resume tutorial' : 'Pause tutorial'}
          >
            {isPaused ? (
              <Play className="w-4 h-4" />
            ) : (
              <Pause className="w-4 h-4" />
            )}
            <span className="hidden md:inline">
              {isPaused ? 'Resume' : 'Pause'}
            </span>
          </button>
        )}
      </div>

      {/* Center - Step Info */}
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-300 font-medium">
          Step {currentStep + 1} of {totalSteps}
        </div>
        
        {/* Step dots for mobile */}
        <div className="flex gap-1 sm:hidden">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                {
                  'bg-gradient-button': index <= currentStep,
                  'bg-white/20': index > currentStep,
                }
              )}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Skip and Next Buttons */}
      <div className="flex items-center gap-2">
        {/* Skip Button */}
        {canSkip && !isLastStep && (
          <button
            onClick={onSkip}
            className={cn(
              'glass-button flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-300',
              'hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50',
              'transition-all duration-300'
            )}
            aria-label="Skip tutorial"
          >
            <SkipForward className="w-4 h-4" />
            <span className="hidden sm:inline">Skip</span>
          </button>
        )}

        {/* Next/Complete Button */}
        <button
          onClick={onNext}
          className={cn(
            'gradient-button flex items-center gap-2 px-6 py-2.5 text-sm font-semibold',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
            'shadow-lg hover:shadow-xl',
            {
              'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700': isLastStep,
            }
          )}
          aria-label={nextButtonText}
        >
          <span>{nextButtonText}</span>
          {!isLastStep && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

// Keyboard navigation component for accessibility
interface TutorialKeyboardNavigationProps {
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onClose: () => void;
  canSkip: boolean;
  isOpen: boolean;
}

export function TutorialKeyboardNavigation({
  onNext,
  onPrev,
  onSkip,
  onClose,
  canSkip,
  isOpen
}: TutorialKeyboardNavigationProps) {
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for tutorial navigation keys
      if (['ArrowRight', 'ArrowLeft', 'Escape', 'Space'].includes(event.code)) {
        event.preventDefault();
      }

      switch (event.code) {
        case 'ArrowRight':
        case 'Space':
          onNext();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'Escape':
          onClose();
          break;
        case 'KeyS':
          if (canSkip && event.ctrlKey) {
            onSkip();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onSkip, onClose, canSkip, isOpen]);

  return null;
}
