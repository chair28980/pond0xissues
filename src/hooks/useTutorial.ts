'use client';

import { useState, useEffect } from 'react';
import { TutorialState } from '@/types/github';
import { tutorialSteps } from '@/lib/tutorial-data';
import { getTutorialState, saveTutorialState } from '@/lib/utils';

export function useTutorial() {
  const [tutorialState, setTutorialState] = useState<TutorialState>({
    isActive: false,
    currentStep: 0,
    completed: false,
    hasSeenTutorial: false,
  });

  useEffect(() => {
    const savedState = getTutorialState();
    setTutorialState(prev => ({
      ...prev,
      hasSeenTutorial: savedState.hasSeenTutorial,
    }));
  }, []);

  const startTutorial = () => {
    setTutorialState({
      isActive: true,
      currentStep: 0,
      completed: false,
      hasSeenTutorial: true,
    });
  };

  const nextStep = () => {
    setTutorialState(prev => {
      const newStep = prev.currentStep + 1;
      const isCompleted = newStep >= tutorialSteps.length;
      
      if (isCompleted) {
        saveTutorialState(true);
      }

      return {
        ...prev,
        currentStep: newStep,
        completed: isCompleted,
        isActive: !isCompleted,
      };
    });
  };

  const previousStep = () => {
    setTutorialState(prev => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1),
    }));
  };

  const closeTutorial = () => {
    setTutorialState(prev => ({
      ...prev,
      isActive: false,
    }));
    saveTutorialState(true);
  };

  const resetTutorial = () => {
    setTutorialState({
      isActive: true,
      currentStep: 0,
      completed: false,
      hasSeenTutorial: true,
    });
  };

  const currentStepData = tutorialSteps[tutorialState.currentStep];

  return {
    tutorialState,
    currentStepData,
    totalSteps: tutorialSteps.length,
    startTutorial,
    nextStep,
    previousStep,
    closeTutorial,
    resetTutorial,
  };
}

