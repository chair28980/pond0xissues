'use client';

import { ExternalLink, CheckCircle, AlertCircle, Github, Mail, Shield, UserPlus } from 'lucide-react';
import { TutorialStep, SplitStepLayout, StepCard, StepList } from '../TutorialStep';
import { TutorialStepProps } from '@/types/tutorial';

export function SignupStep(props: TutorialStepProps) {
  const signupSteps = [
    {
      title: "Visit GitHub.com",
      description: "Click the link below to go to GitHub's signup page",
      icon: <ExternalLink className="w-5 h-5" />,
    },
    {
      title: "Choose a username",
      description: "Pick something you'll remember – you can't easily change it later",
      icon: <UserPlus className="w-5 h-5" />,
    },
    {
      title: "Add your email",
      description: "Use an email you check regularly for notifications",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      title: "Create a strong password",
      description: "GitHub will help you make sure it's secure",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: "Verify your account",
      description: "Check your email and click the verification link",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  return (
    <TutorialStep
      title="Create Your GitHub Account"
      description="GitHub is free and takes just a few minutes to set up. If you already have an account, you can skip this step!"
      {...props}
    >
      <SplitStepLayout>
        {/* Left side - Instructions */}
        <div className="space-y-6">
          <StepCard 
            title="What is GitHub?"
            icon={<Github className="w-6 h-6" />}
            variant="highlighted"
          >
            <p className="mb-3">
              GitHub is like a social network for code and projects. Think of it as:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                A place where developers share and collaborate on projects
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                A way to track issues and suggest improvements
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                Your portfolio to show your contributions
              </li>
            </ul>
          </StepCard>

          <StepCard variant="success">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-2">Already have GitHub?</h4>
                <p className="text-sm">
                  Perfect! You can skip to the next step. We'll show you around 
                  the Pond0x repository and how to navigate issues.
                </p>
              </div>
            </div>
          </StepCard>
        </div>

        {/* Right side - Signup process */}
        <div className="space-y-6">
          <StepCard title="How to Sign Up">
            <StepList items={signupSteps} />
            
            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href="https://github.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-button inline-flex items-center gap-2 w-full justify-center"
                onClick={() => {
                  // Mark that user clicked signup
                  if (props.onNext) {
                    // This will be handled by the parent component
                  }
                }}
              >
                <Github className="w-4 h-4" />
                Sign up for GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <p className="text-xs text-gray-400 text-center mt-2">
                Opens in a new tab – come back when you're done!
              </p>
            </div>
          </StepCard>

          <StepCard variant="warning">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-2">Tips for Success</h4>
                <ul className="text-sm space-y-1">
                  <li>• Choose a professional username if possible</li>
                  <li>• Use your real email for important notifications</li>
                  <li>• Consider enabling two-factor authentication</li>
                  <li>• Add a profile picture to help others recognize you</li>
                </ul>
              </div>
            </div>
          </StepCard>
        </div>
      </SplitStepLayout>
    </TutorialStep>
  );
}
