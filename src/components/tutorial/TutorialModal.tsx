'use client';

import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useTutorial } from '@/hooks/useTutorial';
import { cn } from '@/lib/utils';

export function TutorialModal() {
  const {
    tutorialState,
    currentStepData,
    totalSteps,
    nextStep,
    previousStep,
    closeTutorial,
  } = useTutorial();

  if (!tutorialState.isActive || !currentStepData) {
    return null;
  }

  const progress = ((tutorialState.currentStep + 1) / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 tutorial-overlay">
      <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-glass border-b border-white/10 p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="step-indicator step-active">
                {tutorialState.currentStep + 1}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{currentStepData.title}</h2>
                <p className="text-gray-400 text-sm">{currentStepData.description}</p>
              </div>
            </div>
            <button
              onClick={closeTutorial}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Step {tutorialState.currentStep + 1} of {totalSteps}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStepData.content}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-glass border-t border-white/10 p-6 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    i <= tutorialState.currentStep
                      ? 'bg-primary-500'
                      : 'bg-white/20'
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              {currentStepData.action && (
                <a
                  href={currentStepData.action.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                >
                  {currentStepData.action.text}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <div className="flex gap-2">
                {tutorialState.currentStep > 0 && (
                  <button
                    onClick={previousStep}
                    className="glass-button px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                )}

                <button
                  onClick={nextStep}
                  className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  {tutorialState.currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
                  {tutorialState.currentStep < totalSteps - 1 && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

