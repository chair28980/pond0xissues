'use client';

import { 
  Trophy, 
  Star, 
  ExternalLink, 
  BookOpen, 
  Users, 
  MessageCircle,
  Github,
  Rocket,
  Heart,
  ArrowLeft
} from 'lucide-react';
import { TutorialStep, CenteredStepLayout, StepCard } from '../TutorialStep';
import { TutorialStepProps } from '@/types/tutorial';

export function CompletionStep(props: TutorialStepProps) {
  const nextSteps = [
    {
      title: "Explore the Issues",
      description: "Browse existing issues to see what's being worked on",
      icon: <MessageCircle className="w-5 h-5" />,
      link: "https://github.com/Cary0x/pond0x-issues/issues",
    },
    {
      title: "Star the Repository",
      description: "Show your support and stay updated with new developments",
      icon: <Star className="w-5 h-5" />,
      link: "https://github.com/Cary0x/pond0x-issues",
    },
    {
      title: "Join the Community",
      description: "Connect with other Pond0x enthusiasts and contributors",
      icon: <Users className="w-5 h-5" />,
      link: "https://github.com/Cary0x/pond0x-issues/discussions",
    },
    {
      title: "Create Your First Issue",
      description: "Found a bug or have an idea? Share it with the community!",
      icon: <Rocket className="w-5 h-5" />,
      link: "https://github.com/Cary0x/pond0x-issues/issues/new/choose",
    },
  ];

  const resources = [
    {
      title: "GitHub Docs",
      description: "Comprehensive guide to using GitHub",
      link: "https://docs.github.com",
    },
    {
      title: "Open Source Guide",
      description: "Learn best practices for contributing to open source",
      link: "https://opensource.guide",
    },
    {
      title: "Markdown Guide",
      description: "Format your issues beautifully with Markdown",
      link: "https://guides.github.com/features/mastering-markdown",
    },
  ];

  return (
    <TutorialStep
      title="🎉 Congratulations!"
      description="You've completed the GitHub tutorial and are now ready to contribute to the Pond0x project!"
      {...props}
      showProgress={false}
    >
      <CenteredStepLayout>
        <div className="max-w-3xl space-y-8">
          {/* Celebration */}
          <StepCard variant="success" className="text-center">
            <div className="space-y-4">
              <div className="text-8xl">🎉</div>
              <h3 className="text-3xl font-bold gradient-text">
                You&apos;re Ready to Contribute!
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                You now know how to navigate GitHub, understand issues, and create helpful 
                contributions to the Pond0x project. The community is excited to hear from you!
              </p>
            </div>
          </StepCard>

          {/* What You've Learned */}
          <StepCard title="What You've Accomplished" className="text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl">
                <Github className="w-8 h-8 text-primary-400" />
                <span className="text-sm font-medium text-white">GitHub Basics</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl">
                <BookOpen className="w-8 h-8 text-secondary-400" />
                <span className="text-sm font-medium text-white">Repository Navigation</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl">
                <MessageCircle className="w-8 h-8 text-accent-cyan" />
                <span className="text-sm font-medium text-white">Issue Creation</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl">
                <Users className="w-8 h-8 text-accent-pink" />
                <span className="text-sm font-medium text-white">Community Guidelines</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-green-300">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">Tutorial Complete!</span>
              <Trophy className="w-5 h-5" />
            </div>
          </StepCard>

          {/* Next Steps */}
          <StepCard title="What's Next?" variant="highlighted">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nextSteps.map((step, index) => (
                <a
                  key={index}
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/30 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-primary-400 group-hover:text-primary-300 transition-colors">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1 group-hover:gradient-text transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-300 mb-2">
                        {step.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-primary-400">
                        <span>Go now</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </StepCard>

          {/* Additional Resources */}
          <StepCard title="Helpful Resources">
            <div className="space-y-3">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-300 group"
                >
                  <div>
                    <h4 className="font-medium text-white group-hover:text-primary-300 transition-colors">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {resource.description}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-400 transition-colors" />
                </a>
              ))}
            </div>
          </StepCard>

          {/* Thank You Message */}
          <StepCard variant="success">
            <div className="flex items-start gap-3 text-center">
              <div className="w-full">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-pink-400" />
                  <h4 className="font-semibold text-white">Thank You!</h4>
                  <Heart className="w-5 h-5 text-pink-400" />
                </div>
                <p className="text-gray-300 mb-4">
                  By contributing to Pond0x, you&apos;re helping build something amazing. 
                  Every bug report, feature request, and question makes the project better 
                  for everyone in the community.
                </p>
                <p className="text-sm text-green-300">
                  Remember: no contribution is too small, and every voice matters! 🐸
                </p>
              </div>
            </div>
          </StepCard>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/Cary0x/pond0x-issues/issues/new/choose"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-button inline-flex items-center gap-2 px-8 py-3"
            >
              <Rocket className="w-5 h-5" />
              Create Your First Issue
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <button
              onClick={() => {
                // Close tutorial and return to dashboard
                if (props.onComplete) {
                  props.onComplete();
                }
              }}
              className="glass-button inline-flex items-center gap-2 px-8 py-3"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Dashboard
            </button>
          </div>

          {/* Final Note */}
          <div className="text-center text-sm text-gray-400">
            <p>
              You can always restart this tutorial from the dashboard if you need a refresher.
            </p>
          </div>
        </div>
      </CenteredStepLayout>
    </TutorialStep>
  );
}
