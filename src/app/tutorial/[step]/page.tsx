'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTutorial } from '@/components/tutorial/TutorialProvider';
import { TutorialProgress } from '@/components/tutorial/TutorialProgress';
import { TutorialButtons } from '@/components/tutorial/TutorialButtons';
import { TUTORIAL_STEPS } from '@/types/tutorial';
import { cn } from '@/lib/utils';

// Import step components
import { WelcomeStep } from '@/components/tutorial/steps/WelcomeStep';
import { SignupStep } from '@/components/tutorial/steps/SignupStep';
import { TourStep } from '@/components/tutorial/steps/TourStep';
import { CreationStep } from '@/components/tutorial/steps/CreationStep';
import { CompletionStep } from '@/components/tutorial/steps/CompletionStep';

// Map step IDs to components
const STEP_COMPONENTS = {
  welcome: WelcomeStep,
  signup: SignupStep,
  tour: TourStep,
  creation: CreationStep,
  completion: CompletionStep,
} as const;

export default function TutorialPage() {
  const params = useParams();
  const router = useRouter();
  const {
    state,
    goToStep,
    markStepCompleted,
  } = useTutorial();

  // Get step from URL params
  const stepParam = params.step as string;
  
  // Find step index from URL parameter
  const currentStepIndex = React.useMemo(() => {
    if (stepParam === 'welcome') return 0;
    if (stepParam === 'signup') return 1;
    if (stepParam === 'tour') return 2;
    if (stepParam === 'creation') return 3;
    if (stepParam === 'completion') return 4;
    return 0; // Default to welcome step
  }, [stepParam]);

  // Update tutorial state when URL changes
  React.useEffect(() => {
    if (currentStepIndex !== state.currentStep) {
      goToStep(currentStepIndex);
    }
  }, [currentStepIndex, state.currentStep, goToStep]);

  const currentStepData = TUTORIAL_STEPS[currentStepIndex];
  const StepComponent = STEP_COMPONENTS[currentStepData?.id as keyof typeof STEP_COMPONENTS];

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TUTORIAL_STEPS.length - 1;

  // Get completed steps
  const completedSteps = Object.entries(state.userProgress)
    .filter(([key, value]) => key.startsWith('has') && value)
    .map(([key]) => {
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
      // Complete tutorial and redirect to main page
      markStepCompleted('completion');
      router.push('/');
    } else {
      // Navigate to next step
      const nextStepData = TUTORIAL_STEPS[currentStepIndex + 1];
      router.push(`/tutorial/${nextStepData.id}`);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      const prevStepData = TUTORIAL_STEPS[currentStepIndex - 1];
      router.push(`/tutorial/${prevStepData.id}`);
    }
  };

  const handleSkip = () => {
    router.push('/');
  };

  const handleClose = () => {
    router.push('/');
  };

  // Redirect to welcome if invalid step
  React.useEffect(() => {
    if (!currentStepData) {
      router.push('/tutorial/welcome');
    }
  }, [currentStepData, router]);

  if (!currentStepData || !StepComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-pond relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-pond-alt opacity-80" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-pink/10 rounded-full blur-2xl animate-pulse delay-500" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleClose}
                className={cn(
                  'glass-button px-4 py-2 text-sm',
                  'text-gray-300 hover:text-white',
                  'transition-colors duration-200'
                )}
              >
                ← Back to Dashboard
              </button>
              
              {/* Mobile step indicator */}
              <div className="lg:hidden text-sm text-gray-400">
                Step {currentStepIndex + 1} of {TUTORIAL_STEPS.length}
              </div>
            </div>
            
            <div className="pond-card p-6">
              <h1 className="text-2xl font-bold text-white mb-2">
                GitHub Tutorial for Pond0x
              </h1>
              <p className="text-gray-400">
                Learn how to submit issues on GitHub
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left sidebar - Progress (Desktop only) */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="pond-card p-6 sticky top-6">
                <TutorialProgress
                  currentStep={currentStepIndex}
                  completedSteps={completedSteps}
                />
              </div>
            </div>

            {/* Main content area */}
            <div className="lg:col-span-9">
              <div className="pond-card p-6 lg:p-8">
                {/* Mobile progress bar */}
                <div className="lg:hidden mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{currentStepIndex + 1} of {TUTORIAL_STEPS.length}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-button transition-all duration-500"
                      style={{ 
                        width: `${((currentStepIndex + 1) / TUTORIAL_STEPS.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Step content */}
                <div className="mb-8">
                  <StepComponent
                    currentStep={currentStepIndex}
                    totalSteps={TUTORIAL_STEPS.length}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onSkip={handleSkip}
                    onComplete={() => {
                      markStepCompleted('completion');
                      router.push('/');
                    }}
                  />
                </div>

                {/* Navigation buttons */}
                <div className="border-t border-white/10 pt-6">
                  <TutorialButtons
                    currentStep={currentStepIndex}
                    totalSteps={TUTORIAL_STEPS.length}
                    canSkip={currentStepData?.canSkip ?? true}
                    isFirstStep={isFirstStep}
                    isLastStep={isLastStep}
                    isPaused={false}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onSkip={handleSkip}
                    onClose={handleClose}
                    onPause={() => {}}
                    onResume={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
