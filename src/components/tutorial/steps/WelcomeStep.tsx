'use client';

import { Heart, Users, MessageCircle, Github, ArrowRight } from 'lucide-react';
import { TutorialStep, CenteredStepLayout, StepCard } from '../TutorialStep';
import { TutorialStepProps } from '@/types/tutorial';

export function WelcomeStep(props: TutorialStepProps) {
  return (
    <TutorialStep
      title="Welcome to the Pond0x Community! 🐸"
      description="We're excited to help you start contributing to the Pond0x project. Don't worry – we'll guide you through everything step by step."
      {...props}
    >
      <CenteredStepLayout>
        <div className="max-w-2xl space-y-6">
          {/* Welcome Message */}
          <StepCard variant="highlighted" className="text-center">
            <div className="space-y-4">
              <div className="text-6xl">👋</div>
              <h3 className="text-2xl font-bold text-white">
                You're in the right place!
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Contributing to open source projects like Pond0x is easier than you think. 
                Whether you're reporting a bug, suggesting a feature, or just asking a question, 
                your voice matters in our community.
              </p>
            </div>
          </StepCard>

          {/* What you'll learn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StepCard 
              icon={<Github className="w-6 h-6" />}
              title="GitHub Basics"
            >
              Learn what GitHub is and why it's awesome for collaboration
            </StepCard>

            <StepCard 
              icon={<MessageCircle className="w-6 h-6" />}
              title="Creating Issues"
            >
              Discover how to report bugs and suggest improvements
            </StepCard>

            <StepCard 
              icon={<Users className="w-6 h-6" />}
              title="Community"
            >
              Understand how to be part of the Pond0x development community
            </StepCard>

            <StepCard 
              icon={<Heart className="w-6 h-6" />}
              title="Best Practices"
            >
              Learn the right way to communicate and contribute
            </StepCard>
          </div>

          {/* Reassuring message */}
          <StepCard variant="success">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💚</div>
              <div>
                <h4 className="font-semibold text-white mb-2">
                  No experience? No problem!
                </h4>
                <p className="text-gray-300 mb-3">
                  This tutorial is designed for complete beginners. We'll explain everything 
                  in simple terms, and you can always pause, skip, or restart at any time.
                </p>
                <div className="text-sm text-green-300">
                  ✨ <strong>Pro tip:</strong> You can use the arrow keys to navigate through the tutorial!
                </div>
              </div>
            </div>
          </StepCard>

          {/* Time estimate */}
          <div className="text-center text-sm text-gray-400">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
              <span>This tutorial takes about 5-10 minutes</span>
              <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
            </div>
            <p>Take your time – there's no rush!</p>
          </div>

          {/* Next step preview */}
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <span>Next up:</span>
              <ArrowRight className="w-4 h-4" />
              <span className="font-medium text-white">Setting up your GitHub account</span>
            </div>
          </div>
        </div>
      </CenteredStepLayout>
    </TutorialStep>
  );
}
