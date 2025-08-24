import { TutorialStep } from '@/types/github';
import { Github, UserPlus, Mail, Shield, FileText, Send, CheckCircle } from 'lucide-react';

export const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to GitHub Issue Reporting!',
    description: 'Learn how to create a GitHub account and submit your first issue',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Github className="w-8 h-8 text-primary-400" />
          <h3 className="text-xl font-bold">Let&apos;s Get Started!</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">
          This tutorial will guide you through creating a free GitHub account and submitting 
          your first issue to the Pond0x repository. Don&apos;t worry - it&apos;s easier than you think!
        </p>
        <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
          <p className="text-primary-200 text-sm">
            💡 <strong>What&apos;s an issue?</strong> Think of it as a suggestion box or bug report 
            that helps developers improve the project.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'create-account',
    title: 'Create Your GitHub Account',
    description: 'Sign up for a free GitHub account',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <UserPlus className="w-6 h-6 text-primary-400" />
          <h3 className="text-lg font-semibold">Step 1: Sign Up</h3>
        </div>
        <ol className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white text-sm rounded-full flex items-center justify-center font-bold">1</span>
            <span>Click the &quot;Create GitHub Account&quot; button below to open GitHub in a new tab</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white text-sm rounded-full flex items-center justify-center font-bold">2</span>
            <span>Choose a unique username (this will be your identity on GitHub)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white text-sm rounded-full flex items-center justify-center font-bold">3</span>
            <span>Enter your email address and create a strong password</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white text-sm rounded-full flex items-center justify-center font-bold">4</span>
            <span>Complete the verification process</span>
          </li>
        </ol>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold text-yellow-200">Important:</span>
          </div>
          <p className="text-yellow-200 text-sm">
            Make sure to verify your email address - you&apos;ll need it to submit issues!
          </p>
        </div>
      </div>
    ),
    action: {
      type: 'link',
      url: 'https://github.com/signup',
      text: 'Create GitHub Account'
    }
  },
  {
    id: 'verify-email',
    title: 'Verify Your Email',
    description: 'Complete the email verification process',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6 text-primary-400" />
          <h3 className="text-lg font-semibold">Step 2: Email Verification</h3>
        </div>
        <div className="space-y-3 text-gray-300">
          <p>After creating your account, GitHub will send you a verification email.</p>
          <ol className="space-y-2 ml-4">
            <li>• Check your email inbox (and spam folder just in case)</li>
            <li>• Look for an email from GitHub with the subject &quot;Please verify your email address&quot;</li>
            <li>• Click the verification link in the email</li>
            <li>• You&apos;ll be redirected back to GitHub</li>
          </ol>
        </div>
        <div className="bg-secondary-500/10 border border-secondary-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-secondary-400" />
            <span className="font-semibold text-secondary-200">Security Tip:</span>
          </div>
          <p className="text-secondary-200 text-sm">
            Email verification helps protect your account and enables full GitHub features.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'navigate-to-repo',
    title: 'Find the Pond0x Repository',
    description: 'Navigate to the project repository',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Github className="w-6 h-6 text-primary-400" />
          <h3 className="text-lg font-semibold">Step 3: Go to the Repository</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Now that you have a GitHub account, let&apos;s navigate to the Pond0x issues repository 
          where you can submit bug reports and feature requests.
        </p>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-sm text-gray-400 mb-2">Repository URL:</p>
          <code className="text-primary-300 bg-black/30 px-3 py-1 rounded font-mono text-sm">
            github.com/Cary0x/pond0x-issues
          </code>
        </div>
        <p className="text-gray-300 text-sm">
          Click the button below to open the repository in a new tab. Keep this tutorial open 
          so you can continue following along!
        </p>
      </div>
    ),
    action: {
      type: 'link',
      url: 'https://github.com/Cary0x/pond0x-issues',
      text: 'Open Pond0x Repository'
    }
  },
  {
    id: 'understand-issues',
    title: 'Understanding GitHub Issues',
    description: 'Learn what issues are and how they help projects',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-primary-400" />
          <h3 className="text-lg font-semibold">Step 4: What Are Issues?</h3>
        </div>
        <div className="space-y-4">
          <p className="text-gray-300">
            GitHub Issues are used to track bugs, suggest features, and discuss improvements. 
            Think of them as organized conversation threads about the project.
          </p>
          
          <div className="grid gap-3">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h4 className="font-semibold text-red-200 mb-1">🐛 Bug Reports</h4>
              <p className="text-red-100 text-sm">Report something that&apos;s broken or not working correctly</p>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <h4 className="font-semibold text-blue-200 mb-1">💡 Feature Requests</h4>
              <p className="text-blue-100 text-sm">Suggest new features or improvements to the project</p>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <h4 className="font-semibold text-purple-200 mb-1">❓ Questions</h4>
              <p className="text-purple-100 text-sm">Ask questions about how something works</p>
            </div>
          </div>

          <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
            <p className="text-primary-200 text-sm">
              <strong>Good to know:</strong> Issues are public and searchable, so others can 
              see if someone has already reported the same problem or requested the same feature!
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'create-issue',
    title: 'Submit Your First Issue',
    description: 'Learn how to create and submit an issue',
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Send className="w-6 h-6 text-primary-400" />
          <h3 className="text-lg font-semibold">Step 5: Create an Issue</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-300">
            Now let&apos;s create your first issue! Here&apos;s how to do it step by step:
          </p>
          
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white text-sm rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <p className="text-gray-300">On the repository page, look for the green <strong>&quot;New issue&quot;</strong> button</p>
                <p className="text-gray-400 text-sm mt-1">It&apos;s usually located near the top of the issues list</p>
              </div>
            </li>
            
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white text-sm rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <p className="text-gray-300">Choose a template (Bug report or Feature request)</p>
                <p className="text-gray-400 text-sm mt-1">Templates help you provide all the necessary information</p>
              </div>
            </li>
            
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white text-sm rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <p className="text-gray-300">Fill out the template with clear, detailed information</p>
                <p className="text-gray-400 text-sm mt-1">Be specific about steps to reproduce bugs or describe features clearly</p>
              </div>
            </li>
            
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white text-sm rounded-full flex items-center justify-center font-bold">4</span>
              <div>
                <p className="text-gray-300">Add labels if available (optional)</p>
                <p className="text-gray-400 text-sm mt-1">Labels help categorize your issue</p>
              </div>
            </li>
            
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white text-sm rounded-full flex items-center justify-center font-bold">5</span>
              <div>
                <p className="text-gray-300">Click <strong>&quot;Submit new issue&quot;</strong></p>
                <p className="text-gray-400 text-sm mt-1">Your issue will be publicly visible and the maintainers will be notified</p>
              </div>
            </li>
          </ol>

          <div className="bg-accent-yellow/10 border border-accent-yellow/30 rounded-lg p-4">
            <h4 className="font-semibold text-accent-yellow mb-2">💡 Pro Tips for Great Issues:</h4>
            <ul className="text-accent-yellow/80 text-sm space-y-1">
              <li>• Use a clear, descriptive title</li>
              <li>• Include screenshots for visual bugs</li>
              <li>• Provide step-by-step reproduction instructions</li>
              <li>• Mention your browser and operating system</li>
              <li>• Be respectful and constructive</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    action: {
      type: 'link',
      url: 'https://github.com/Cary0x/pond0x-issues/issues/new/choose',
      text: 'Create Your First Issue'
    }
  },
  {
    id: 'congratulations',
    title: 'Congratulations! 🎉',
    description: 'You\'re now part of the open source community',
    content: (
      <div className="space-y-4 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-primary-400" />
        </div>
        <h3 className="text-2xl font-bold gradient-text">You Did It!</h3>
        <p className="text-gray-300 leading-relaxed">
          You now know how to create a GitHub account and submit issues. You&apos;re officially 
          part of the open source community and can contribute to projects like Pond0x!
        </p>
        
        <div className="grid gap-3 mt-6">
          <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-primary-200 mb-2">🚀 What&apos;s Next?</h4>
            <ul className="text-primary-100 text-sm space-y-1 text-left">
              <li>• Explore other open source projects on GitHub</li>
              <li>• Star repositories you find interesting</li>
              <li>• Follow developers and projects you like</li>
              <li>• Consider contributing code when you&apos;re ready</li>
            </ul>
          </div>
          
          <div className="bg-secondary-500/10 border border-secondary-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-secondary-200 mb-2">📚 Learn More</h4>
            <p className="text-secondary-100 text-sm text-left">
              Check out GitHub&apos;s official guides to learn about pull requests, 
              collaboration, and advanced features.
            </p>
          </div>
        </div>
      </div>
    ),
    action: {
      type: 'link',
      url: 'https://docs.github.com/en/get-started',
      text: 'Explore GitHub Docs'
    }
  }
];
