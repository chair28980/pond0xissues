'use client';

import { 
  Plus, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  MessageSquare,
  FileText,
  Search,
  Users
} from 'lucide-react';
import { TutorialStep, ListStepLayout, StepCard, StepList } from '../TutorialStep';
import { TutorialStepProps } from '@/types/tutorial';

export function CreationStep(props: TutorialStepProps) {
  const issueCreationSteps = [
    {
      title: "Click 'New Issue'",
      description: "Find the green 'New issue' button on the Issues tab",
      icon: <Plus className="w-5 h-5" />,
    },
    {
      title: "Choose a template",
      description: "Select bug report, feature request, or general question",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "Write a clear title",
      description: "Summarize your issue in one clear sentence",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: "Fill in the description",
      description: "Provide details, steps to reproduce, or context",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: "Add labels if needed",
      description: "Help categorize your issue (usually done by maintainers)",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      title: "Submit your issue",
      description: "Click 'Submit new issue' and you're done!",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const issueTypes = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-400" />,
      title: "Bug Reports",
      description: "Something isn't working as expected",
      examples: "App crashes, features not working, error messages",
      template: "Use the Bug Report template with steps to reproduce"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-400" />,
      title: "Feature Requests",
      description: "Ideas for improvements or new features",
      examples: "New functionality, UI improvements, performance enhancements",
      template: "Use the Feature Request template with clear benefits"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
      title: "Questions",
      description: "When you need help or clarification",
      examples: "How to use features, understanding behavior, getting help",
      template: "Use the Question template with context"
    }
  ];

  const bestPractices = [
    "Search existing issues first to avoid duplicates",
    "Use clear, descriptive titles that explain the problem",
    "Provide steps to reproduce bugs when possible",
    "Include screenshots or examples if helpful",
    "Be respectful and constructive in your language",
    "Follow up on your issues if maintainers ask questions"
  ];

  return (
    <TutorialStep
      title="Creating Your First Issue"
      description="Learn how to create helpful, clear issues that get attention and help improve the project."
      {...props}
    >
      <ListStepLayout>
        {/* Before You Start */}
        <StepCard variant="warning">
          <div className="flex items-start gap-3">
            <Search className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-2">Before Creating an Issue</h4>
              <p className="text-gray-300 mb-3">
                Always search existing issues first! Someone might have already reported 
                the same bug or requested the same feature.
              </p>
              <a
                href="https://github.com/Cary0x/pond0x-issues/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button inline-flex items-center gap-2 text-sm"
              >
                <Search className="w-4 h-4" />
                Search Existing Issues
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </StepCard>

        {/* Types of Issues */}
        <StepCard title="Types of Issues You Can Create">
          <div className="space-y-4">
            {issueTypes.map((type, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start gap-3 mb-3">
                  {type.icon}
                  <div>
                    <h4 className="font-semibold text-white">{type.title}</h4>
                    <p className="text-sm text-gray-300">{type.description}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  <strong>Examples:</strong> {type.examples}
                </div>
                <div className="text-xs text-primary-300">
                  💡 {type.template}
                </div>
              </div>
            ))}
          </div>
        </StepCard>

        {/* Step by Step Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StepCard title="How to Create an Issue">
            <StepList items={issueCreationSteps} />
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href="https://github.com/Cary0x/pond0x-issues/issues/new/choose"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-button inline-flex items-center gap-2 w-full justify-center"
              >
                <Plus className="w-4 h-4" />
                Create New Issue
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-xs text-gray-400 text-center mt-2">
                Opens in a new tab – try creating a test issue!
              </p>
            </div>
          </StepCard>

          <StepCard title="Best Practices" variant="success">
            <ul className="space-y-3">
              {bestPractices.map((practice, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{practice}</span>
                </li>
              ))}
            </ul>
          </StepCard>
        </div>

        {/* Example Issue Templates */}
        <StepCard title="Example Issue Templates" variant="highlighted">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Bug Report Example
              </h4>
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg text-sm font-mono">
                <div className="text-red-200 font-semibold">Title:</div>
                <div className="text-gray-300 mb-3">App crashes when clicking profile button</div>
                
                <div className="text-red-200 font-semibold">Description:</div>
                <div className="text-gray-300 text-xs leading-relaxed">
                  <strong>Steps to reproduce:</strong><br/>
                  1. Open the app<br/>
                  2. Click on profile button<br/>
                  3. App crashes immediately<br/><br/>
                  
                  <strong>Expected:</strong> Profile page opens<br/>
                  <strong>Actual:</strong> App crashes<br/>
                  <strong>Device:</strong> iPhone 12, iOS 15.0
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                Feature Request Example
              </h4>
              <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg text-sm font-mono">
                <div className="text-yellow-200 font-semibold">Title:</div>
                <div className="text-gray-300 mb-3">Add dark mode toggle to settings</div>
                
                <div className="text-yellow-200 font-semibold">Description:</div>
                <div className="text-gray-300 text-xs leading-relaxed">
                  <strong>Problem:</strong> Current light theme hurts my eyes in dark environments<br/><br/>
                  
                  <strong>Solution:</strong> Add a dark mode option in settings<br/><br/>
                  
                  <strong>Benefits:</strong> Better accessibility, reduced eye strain, follows OS preferences
                </div>
              </div>
            </div>
          </div>
        </StepCard>

        {/* Community Guidelines */}
        <StepCard variant="success">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-2">Community Guidelines</h4>
              <p className="text-gray-300 mb-3">
                Remember, there are real people behind this project who volunteer their time. 
                Be patient, respectful, and constructive in all your interactions.
              </p>
              <div className="text-sm text-green-300">
                ✨ <strong>Golden rule:</strong> Treat others how you&apos;d like to be treated!
              </div>
            </div>
          </div>
        </StepCard>
      </ListStepLayout>
    </TutorialStep>
  );
}
