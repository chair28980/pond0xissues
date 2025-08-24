'use client';

import { CheckCircle, Circle } from 'lucide-react';
import { TUTORIAL_STEPS } from '@/types/tutorial';
import { cn } from '@/lib/utils';

interface TutorialProgressProps {
  currentStep: number;
  completedSteps: string[];
  className?: string;
}

export function TutorialProgress({ 
  currentStep, 
  completedSteps, 
  className 
}: TutorialProgressProps) {
  const totalSteps = TUTORIAL_STEPS.length;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Tutorial Progress
        </h3>
        <span className="text-sm text-gray-300 font-medium">
          {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
          <div 
            className="h-full bg-gradient-button transition-all duration-500 ease-out"
            style={{ 
              width: `${((currentStep + 1) / totalSteps) * 100}%`,
            }}
          />
        </div>
        
        {/* Progress percentage */}
        <div className="absolute -top-1 transition-all duration-500 ease-out"
             style={{ left: `${((currentStep + 1) / totalSteps) * 100}%` }}>
          <div className="transform -translate-x-1/2 -translate-y-full mb-2">
            <div className="px-2 py-1 bg-gradient-button text-white text-xs font-semibold rounded-md shadow-lg">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}%
            </div>
            <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-primary-500 mx-auto" />
          </div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {TUTORIAL_STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id) || index < currentStep;
          const isCurrent = index === currentStep;
          const isPast = index < currentStep;
          const isFuture = index > currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                'flex flex-col items-center gap-2 transition-all duration-300',
                'group cursor-pointer'
              )}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  'relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300',
                  'shadow-lg hover:scale-110',
                  {
                    'bg-gradient-button border-transparent text-white shadow-lg': isCompleted || isCurrent,
                    'border-white/30 bg-white/5 text-gray-400': isFuture,
                    'border-primary-400 bg-primary-500/20 text-primary-300': isCurrent && !isCompleted,
                  }
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Circle className={cn('w-4 h-4', {
                    'fill-current': isCurrent,
                  })} />
                )}
                
                {/* Glow effect for current step */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-gradient-button opacity-30 animate-pulse" />
                )}
              </div>



              {/* Connection Line (except for last step) */}
              {index < totalSteps - 1 && (
                <div className="absolute top-4 left-1/2 w-full h-0.5 transform translate-x-1/2 hidden sm:block">
                  <div
                    className={cn(
                      'h-full transition-all duration-500',
                      {
                        'bg-gradient-button': isPast,
                        'bg-white/10': !isPast,
                      }
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current Step Info */}
      <div className="mt-2 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <h4 className="text-sm font-semibold text-white mb-1">
          {TUTORIAL_STEPS[currentStep]?.title}
        </h4>
        <p className="text-xs text-gray-300">
          {TUTORIAL_STEPS[currentStep]?.description}
        </p>
      </div>
    </div>
  );
}
