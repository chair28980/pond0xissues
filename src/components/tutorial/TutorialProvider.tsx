'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { TutorialState, TutorialContextType, TUTORIAL_STEPS } from '@/types/tutorial';
import { getTutorialState, saveTutorialState, getTutorialProgress, saveTutorialProgress } from '@/lib/utils';

// Initial state
const initialState: TutorialState = {
  isOpen: false,
  currentStep: 0,
  isCompleted: false,
  isSkipped: false,
  userProgress: {
    hasViewedWelcome: false,
    hasClickedSignup: false,
    hasCompletedTour: false,
    hasViewedIssueCreation: false,
    lastActiveStep: 0,
  },
};

// Action types
type TutorialAction = 
  | { type: 'OPEN_TUTORIAL' }
  | { type: 'CLOSE_TUTORIAL' }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; payload: number }
  | { type: 'SKIP_TUTORIAL' }
  | { type: 'MARK_STEP_COMPLETED'; payload: string }
  | { type: 'RESET_TUTORIAL' }
  | { type: 'LOAD_STATE'; payload: TutorialState };

// Reducer function
function tutorialReducer(state: TutorialState, action: TutorialAction): TutorialState {
  switch (action.type) {
    case 'OPEN_TUTORIAL':
      return {
        ...state,
        isOpen: true,
        isSkipped: false,
      };

    case 'CLOSE_TUTORIAL':
      return {
        ...state,
        isOpen: false,
      };

    case 'NEXT_STEP': {
      const nextStep = Math.min(state.currentStep + 1, TUTORIAL_STEPS.length - 1);
      const isCompleted = nextStep === TUTORIAL_STEPS.length - 1;
      
      return {
        ...state,
        currentStep: nextStep,
        isCompleted,
        userProgress: {
          ...state.userProgress,
          lastActiveStep: nextStep,
          completedAt: isCompleted ? new Date().toISOString() : state.userProgress.completedAt,
        },
      };
    }

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };

    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: Math.max(0, Math.min(action.payload, TUTORIAL_STEPS.length - 1)),
        userProgress: {
          ...state.userProgress,
          lastActiveStep: action.payload,
        },
      };

    case 'SKIP_TUTORIAL':
      return {
        ...state,
        isOpen: false,
        isSkipped: true,
        userProgress: {
          ...state.userProgress,
          completedAt: new Date().toISOString(),
        },
      };

    case 'MARK_STEP_COMPLETED': {
      const stepId = action.payload;
      const updatedProgress = { ...state.userProgress };

      switch (stepId) {
        case 'welcome':
          updatedProgress.hasViewedWelcome = true;
          break;
        case 'signup':
          updatedProgress.hasClickedSignup = true;
          break;
        case 'tour':
          updatedProgress.hasCompletedTour = true;
          break;
        case 'creation':
          updatedProgress.hasViewedIssueCreation = true;
          break;
      }

      return {
        ...state,
        userProgress: updatedProgress,
      };
    }

    case 'RESET_TUTORIAL':
      return {
        ...initialState,
        userProgress: {
          ...initialState.userProgress,
          completedAt: undefined,
        },
      };

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
}

// Create context
const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

// Provider component
interface TutorialProviderProps {
  children: ReactNode;
}

export function TutorialProvider({ children }: TutorialProviderProps) {
  const [state, dispatch] = useReducer(tutorialReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = getTutorialState();
    const savedProgress = getTutorialProgress();

    if (savedState || savedProgress) {
      const loadedState = {
        ...initialState,
        ...savedState,
        userProgress: {
          ...initialState.userProgress,
          ...savedProgress,
        },
      };

      dispatch({ type: 'LOAD_STATE', payload: loadedState });
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveTutorialState({
      isOpen: state.isOpen,
      currentStep: state.currentStep,
      isCompleted: state.isCompleted,
      isSkipped: state.isSkipped,
    });

    saveTutorialProgress(state.userProgress);
  }, [state]);

  // Context value
  const contextValue: TutorialContextType = {
    state,
    openTutorial: () => dispatch({ type: 'OPEN_TUTORIAL' }),
    closeTutorial: () => dispatch({ type: 'CLOSE_TUTORIAL' }),
    nextStep: () => dispatch({ type: 'NEXT_STEP' }),
    prevStep: () => dispatch({ type: 'PREV_STEP' }),
    skipTutorial: () => dispatch({ type: 'SKIP_TUTORIAL' }),
    goToStep: (step: number) => dispatch({ type: 'GO_TO_STEP', payload: step }),
    markStepCompleted: (stepId: string) => dispatch({ type: 'MARK_STEP_COMPLETED', payload: stepId }),
    resetTutorial: () => dispatch({ type: 'RESET_TUTORIAL' }),
  };

  return (
    <TutorialContext.Provider value={contextValue}>
      {children}
    </TutorialContext.Provider>
  );
}

// Custom hook to use tutorial context
export function useTutorial(): TutorialContextType {
  const context = useContext(TutorialContext);
  
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  
  return context;
}
