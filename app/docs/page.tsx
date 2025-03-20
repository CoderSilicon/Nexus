"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Briefcase,
  Brain,
  FileText,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function DocumentationPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      content: `Nexus is your personal AI coach designed to enhance your professional journey. Built with cutting-edge AI technology, 
      Nexus provides comprehensive tools for career development, interview preparation, and skill enhancement.`,
    },
    {
      id: "features",
      title: "Core Features",
      subsections: [
        {
          title: "AI Career Guidance",
          icon: <Brain className="h-6 w-6 text-blue-500" />,
          description:
            "Get personalized career advice and insights powered by advanced AI technology. Our system analyzes industry trends and your profile to provide tailored recommendations.",
        },
        {
          title: "Interview Preparation",
          icon: <Briefcase className="h-6 w-6 text-green-500" />,
          description:
            "Practice with role-specific questions and receive instant feedback. Features include test-based practice and interactive flashcards for efficient learning.",
        },
        {
          title: "Learning Resources",
          icon: <BookOpen className="h-6 w-6 text-purple-500" />,
          description:
            "Access curated learning materials with 15+ learning paths and 100+ resources. Track your progress and learn at your own pace.",
        },
        {
          title: "Resume Creation",
          icon: <FileText className="h-6 w-6 text-amber-500" />,
          description:
            "Generate ATS-optimized resumes with AI assistance. Our resume editor helps you create professional resumes tailored to your target roles.",
        },
      ],
    },
    {
      id: "getting-started",
      title: "Getting Started",
      content: `
        1. Sign Up: Create your free account to access all features
        2. Complete Your Profile: Help us personalize your experience
        3. Choose Your Path: Select from our various tools based on your needs:
           - Interview Preparation
           - Learning Resources
           - Resume Editor
           - Career Guidance
      `,
    },
    {
      id: "interview-prep",
      title: "Interview Preparation Guide",
      content: `Our interview preparation system offers two main modes:

        1. Test-Based Practice:
        - Complete structured interview questions
        - Receive detailed feedback
        - Track your progress
        
        2. Flashcard Practice:
        - Quick concept review
        - Interactive learning
        - Spaced repetition for better retention
        
        Features include:
        - 500+ practice questions
        - 10+ topic categories
        - 24/7 availability
        - Comprehensive question bank
        - Focused learning paths`,
    },
    {
      id: "learning-resources",
      title: "Learning Resources",
      content: `Access our comprehensive learning platform featuring:

        - 15+ Learning Paths
        - 100+ Curated Resources
        - 24/7 Availability
        - Personalized learning journeys
        - Progress tracking
        - Real-time collaboration
        - Custom integrations
        - Team management features`,
    },
    {
      id: "pricing",
      title: "Pricing",
      content: `Nexus is currently free to use with all features included:

        - Unlimited projects
        - Real-time collaboration
        - Priority support
        - Advanced analytics
        - Custom integrations
        - API access
        - Automated backups
        - Team management
        
        No credit card required. No hidden fees.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nexus Documentation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your comprehensive guide to mastering Nexus and accelerating your
            career growth
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {sections.map((section) => (
            <Link key={section.id} href={`#${section.id}`}>
              <Button variant="outline" className="text-sm">
                {section.title}
              </Button>
            </Link>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-12 max-w-4xl mx-auto">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {section.subsections ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {section.subsections.map((subsection, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border bg-white dark:bg-gray-800"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            {subsection.icon}
                            <h3 className="font-semibold text-lg">
                              {subsection.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            {subsection.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="prose dark:prose-invert max-w-none">
                      <div className="whitespace-pre-line text-gray-600 dark:text-gray-300">
                        {section.content}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
