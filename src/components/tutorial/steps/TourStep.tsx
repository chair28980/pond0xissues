'use client';

import { 
  ExternalLink, 
  Eye, 
  MessageSquare, 
  Tag, 
  Filter, 
  Search, 
  Star,
  GitBranch
} from 'lucide-react';
import { TutorialStep, ListStepLayout, StepCard, StepList } from '../TutorialStep';
import { TutorialStepProps } from '@/types/tutorial';

export function TourStep(props: TutorialStepProps) {
  const repositoryFeatures = [
    {
      title: "Issues Tab",
      description: "Where bugs are reported and features are requested",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: "Labels",
      description: "Colorful tags that categorize issues (bug, enhancement, question)",
      icon: <Tag className="w-5 h-5" />,
    },
    {
      title: "Search & Filters",
      description: "Find specific issues using keywords and filters",
      icon: <Search className="w-5 h-5" />,
    },
    {
      title: "Issue Status",
      description: "Open issues need attention, closed issues are resolved",
      icon: <Filter className="w-5 h-5" />,
    },
  ];

  const navigationTips = [
    {
      title: "Click on any issue title",
      description: "To read the full description and see comments",
      icon: <Eye className="w-5 h-5" />,
    },
    {
      title: "Use the search box",
      description: "Type keywords to find issues related to your topic",
      icon: <Search className="w-5 h-5" />,
    },
    {
      title: "Filter by labels",
      description: "Click on label names to see similar issues",
      icon: <Tag className="w-5 h-5" />,
    },
    {
      title: "Star the repository",
      description: "Show your support and get updates on your GitHub homepage",
      icon: <Star className="w-5 h-5" />,
    },
  ];

  return (
    <TutorialStep
      title="Repository Tour"
      description="Let's explore the Pond0x repository and learn how to navigate GitHub issues like a pro!"
      {...props}
    >
      <ListStepLayout>
        {/* What is a Repository */}
        <StepCard 
          title="What's a Repository?"
          icon={<GitBranch className="w-6 h-6" />}
          variant="highlighted"
        >
          <p>
            A repository (or &quot;repo&quot;) is like a project folder that contains all the code, 
            documentation, and history of a project. It serves as the central hub where developers 
            collaborate, track issues, and manage the entire lifecycle of a software project.
          </p>
        </StepCard>

        {/* Repository Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StepCard title="Key Repository Features">
            <StepList items={repositoryFeatures} />
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href="https://github.com/Cary0x/pond0x-issues"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button inline-flex items-center gap-2 text-sm w-full justify-center"
              >
                <ExternalLink className="w-4 h-4" />
                Open Pond0x Repository
              </a>
            </div>
          </StepCard>

          <StepCard title="Navigation Tips">
            <StepList items={navigationTips} />
          </StepCard>
        </div>

        {/* Issue States Explanation */}
        <StepCard title="Understanding Issue States" variant="highlighted">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <h4 className="font-semibold text-white">Open Issues</h4>
                  <p className="text-sm text-gray-300">
                    These need attention! They could be bugs to fix, features to add, 
                    or questions that need answers.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div>
                  <h4 className="font-semibold text-white">Closed Issues</h4>
                  <p className="text-sm text-gray-300">
                    These have been resolved! The problem was fixed, the feature was added, 
                    or the question was answered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </StepCard>

        {/* Labels Explanation */}
        <StepCard title="Understanding Labels">
          <p className="mb-4">
            Labels are like hashtags that help organize issues. Here are some common ones you&apos;ll see:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-red-200">bug</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-200">enhancement</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-blue-200">question</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-purple-200">good first issue</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 mt-3">
            💡 <strong>Tip:</strong> Look for &quot;good first issue&quot; labels if you want to contribute code later!
          </p>
        </StepCard>

        {/* Interactive Element */}
        <StepCard variant="success">
          <div className="text-center">
            <h4 className="font-semibold text-white mb-3">Ready to explore?</h4>
            <p className="text-gray-300 mb-4">
              Take a moment to browse the Pond0x repository. Don&apos;t worry about understanding 
              everything – just get familiar with the layout!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://github.com/Cary0x/pond0x-issues/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-button inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Browse Issues
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Cary0x/pond0x-issues"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button inline-flex items-center gap-2"
              >
                <Star className="w-4 h-4" />
                Star Repository
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </StepCard>
      </ListStepLayout>
    </TutorialStep>
  );
}
