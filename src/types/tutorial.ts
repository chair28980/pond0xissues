export interface TutorialState {
  isOpen: boolean;
  currentStep: number;
  isCompleted: boolean;
  isSkipped: boolean;
  userProgress: UserProgress;
}

export interface UserProgress {
  hasViewedWelcome: boolean;
  hasClickedSignup: boolean;
  hasCompletedTour: boolean;
  hasViewedIssueCreation: boolean;
  completedAt?: string;
  lastActiveStep: number;
}

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<TutorialStepProps>;
  canSkip: boolean;
  isRequired: boolean;
}

export interface TutorialStepProps {
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onComplete: () => void;
  currentStep: number;
  totalSteps: number;
  isLastStep: boolean;
  isFirstStep: boolean;
}

export interface TutorialContextType {
  state: TutorialState;
  openTutorial: () => void;
  closeTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTutorial: () => void;
  goToStep: (step: number) => void;
  markStepCompleted: (stepId: string) => void;
  resetTutorial: () => void;
}

export interface TutorialHighlight {
  element: string; // CSS selector
  position: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  glow?: boolean;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to GitHub Issues',
    description: 'Let\'s help you get started with contributing to the Pond0x project',
    component: null as any, // Will be filled with actual components
    canSkip: true,
    isRequired: false,
  },
  {
    id: 'signup',
    title: 'Create GitHub Account',
    description: 'Sign up for GitHub to start contributing',
    component: null as any,
    canSkip: true,
    isRequired: false,
  },
  {
    id: 'tour',
    title: 'Repository Tour',
    description: 'Learn about issues, labels, and navigation',
    component: null as any,
    canSkip: false,
    isRequired: true,
  },
  {
    id: 'creation',
    title: 'Creating Issues',
    description: 'Step-by-step guide to submitting your first issue',
    component: null as any,
    canSkip: false,
    isRequired: true,
  },
  {
    id: 'completion',
    title: 'You\'re Ready!',
    description: 'Congratulations! You\'re ready to contribute',
    component: null as any,
    canSkip: false,
    isRequired: true,
  },
];

export const STORAGE_KEYS = {
  TUTORIAL_STATE: 'pond0x-tutorial-state',
  USER_PROGRESS: 'pond0x-tutorial-progress',
} as const;
