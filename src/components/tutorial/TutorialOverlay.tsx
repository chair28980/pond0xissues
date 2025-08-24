'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useTutorial } from './TutorialProvider';
import { TutorialProgress } from './TutorialProgress';
import { TutorialButtons, TutorialKeyboardNavigation } from './TutorialButtons';
import { TUTORIAL_STEPS } from '@/types/tutorial';
import { cn } from '@/lib/utils';

// Import step components (we'll create these next)
import { WelcomeStep } from './steps/WelcomeStep';
import { SignupStep } from './steps/SignupStep';
import { TourStep } from './steps/TourStep';
import { CreationStep } from './steps/CreationStep';
import { CompletionStep } from './steps/CompletionStep';

// Map step IDs to components
const STEP_COMPONENTS = {
  welcome: WelcomeStep,
  signup: SignupStep,
  tour: TourStep,
  creation: CreationStep,
  completion: CompletionStep,
} as const;

export function TutorialOverlay() {
  const {
    state,
    closeTutorial,
    nextStep,
    prevStep,
    skipTutorial,
    markStepCompleted,
    goToStep,
  } = useTutorial();

  const [isPaused, setIsPaused] = React.useState(false);

  // Don't render if tutorial is not open
  if (!state.isOpen) return null;

  const currentStepData = TUTORIAL_STEPS[state.currentStep];
  const StepComponent = STEP_COMPONENTS[currentStepData?.id as keyof typeof STEP_COMPONENTS];

  const isFirstStep = state.currentStep === 0;
  const isLastStep = state.currentStep === TUTORIAL_STEPS.length - 1;

  // Get completed steps
  const completedSteps = Object.entries(state.userProgress)
    .filter(([key, value]) => key.startsWith('has') && value)
    .map(([key]) => {
      // Map progress keys to step IDs
      const stepMap: Record<string, string> = {
        hasViewedWelcome: 'welcome',
        hasClickedSignup: 'signup',
        hasCompletedTour: 'tour',
        hasViewedIssueCreation: 'creation',
      };
      return stepMap[key];
    })
    .filter(Boolean);

  const handleNext = () => {
    // Mark current step as completed
    if (currentStepData) {
      markStepCompleted(currentStepData.id);
    }

    if (isLastStep) {
      // Complete tutorial
      markStepCompleted('completion');
      closeTutorial();
    } else {
      nextStep();
    }
  };

  const handleClose = () => {
    closeTutorial();
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4',
          'bg-black/60 backdrop-blur-xl',
          'animate-fade-in'
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        {/* Tutorial Modal */}
        <div
          className={cn(
            'relative w-full max-w-4xl max-h-[90vh] overflow-hidden',
            'pond-card p-0',
            'animate-slide-up',
            {
              'opacity-50 pointer-events-none': isPaused,
            }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className={cn(
              'absolute top-4 right-4 z-10',
              'w-8 h-8 flex items-center justify-center',
              'glass-button rounded-full text-gray-400 hover:text-white',
              'focus:outline-none focus:ring-2 focus:ring-primary-500/50'
            )}
            aria-label="Close tutorial"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Tutorial Header */}
          <div className="border-b border-white/10 p-6 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-white mb-2">
                  GitHub Tutorial for Pond0x
                </h1>
                <p className="text-sm text-gray-400">
                  Learn how to contribute to the Pond0x project on GitHub
                </p>
              </div>
              
              {/* Progress indicator for mobile */}
              <div className="lg:hidden">
                <div className="text-sm text-gray-400 text-right">
                  {state.currentStep + 1} / {TUTORIAL_STEPS.length}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row h-[calc(90vh-200px)] max-h-[600px]">
            {/* Left Sidebar - Progress (Desktop only) */}
            <div className="hidden lg:block w-80 border-r border-white/10 p-6 overflow-y-auto">
              <TutorialProgress
                currentStep={state.currentStep}
                completedSteps={completedSteps}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Step Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {StepComponent && (
                  <StepComponent
                    currentStep={state.currentStep}
                    totalSteps={TUTORIAL_STEPS.length}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onNext={handleNext}
                    onPrev={prevStep}
                    onSkip={skipTutorial}
                    onComplete={() => {
                      markStepCompleted('completion');
                      closeTutorial();
                    }}
                  />
                )}
              </div>

              {/* Navigation Footer */}
              <div className="border-t border-white/10 p-4">
                <TutorialButtons
                  currentStep={state.currentStep}
                  totalSteps={TUTORIAL_STEPS.length}
                  canSkip={currentStepData?.canSkip ?? true}
                  isFirstStep={isFirstStep}
                  isLastStep={isLastStep}
                  isPaused={isPaused}
                  onNext={handleNext}
                  onPrev={prevStep}
                  onSkip={skipTutorial}
                  onClose={handleClose}
                  onPause={handlePause}
                  onResume={handleResume}
                />
              </div>
            </div>
          </div>

          {/* Mobile Progress Bar */}
          <div className="lg:hidden border-t border-white/10 p-4">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>Progress</span>
              <span>{state.currentStep + 1} of {TUTORIAL_STEPS.length}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-button transition-all duration-500"
                style={{ 
                  width: `${((state.currentStep + 1) / TUTORIAL_STEPS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Pause Overlay */}
          {isPaused && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="pond-card p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Tutorial Paused
                </h3>
                <p className="text-gray-300 mb-4">
                  Click resume to continue learning
                </p>
                <button
                  onClick={handleResume}
                  className="gradient-button px-6 py-2"
                >
                  Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard Navigation */}
      <TutorialKeyboardNavigation
        onNext={handleNext}
        onPrev={prevStep}
        onSkip={skipTutorial}
        onClose={handleClose}
        canSkip={currentStepData?.canSkip ?? true}
        isOpen={state.isOpen}
      />
    </>
  );
}
