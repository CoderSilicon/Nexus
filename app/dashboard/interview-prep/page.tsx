"use client";

import InterviewTestPage from "@/components/InterviewQuiz";
import InterviewFlash from "@/components/InterviewFlash";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  BookOpen,
  FileQuestion,
  Brain,
  Target,
  Clock,
  Users,
  ArrowLeft,
} from "lucide-react";

const Page = () => {
  const [view, setView] = useState<"main" | "selection" | "test" | "flashcard">(
    "main"
  );
  const [isReturningUser, setIsReturningUser] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  // Get first name or username
  const userName = user?.firstName || user?.username || "there";

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem(`hasVisited_${user?.id}`);
    if (hasVisited) {
      setIsReturningUser(true);
    } else {
      // Set the flag for future visits
      localStorage.setItem(`hasVisited_${user?.id}`, "true");
      setIsReturningUser(false);
    }
  }, [user?.id]);

  const stats = [
    {
      number: "500+",
      label: "Practice Questions",
      icon: <Brain className="h-6 w-6 text-purple-500 dark:text-purple-400" />,
      description: "Comprehensive question bank",
    },
    {
      number: "10+",
      label: "Topic Categories",
      icon: <Target className="h-6 w-6 text-blue-500 dark:text-blue-400" />,
      description: "Focused learning paths",
    },
    {
      number: "24/7",
      label: "Available",
      icon: <Clock className="h-6 w-6 text-green-500 dark:text-green-400" />,
      description: "Practice anytime, anywhere",
    },
  ];

  const features = [
    {
      icon: (
        <FileQuestion className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      ),
      title: "Test-Based Practice",
      description:
        "Complete structured interview questions with detailed feedback",
      color: "blue",
      onClick: () => setView("test"),
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Flashcard Practice",
      description: "Review concepts quickly with interactive flashcards",
      color: "green",
      onClick: () => setView("flashcard"),
    },
  ];

  const renderSelectionScreen = () => (
    <div className="flex flex-col items-center space-y-8 w-full max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Choose Your Learning Style
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Select the practice mode that best suits your learning preferences
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-none md:flex md:justify-center md:items-stretch md:gap-8 gap-6 w-full">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={feature.onClick}
            className="group relative overflow-hidden p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 md:flex-1 md:max-w-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 dark:to-gray-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex flex-col items-center space-y-4">
              <div
                className={`p-4 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-full group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                {feature.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={() => setView("main")}
        className="mt-6 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Overview
      </Button>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-slate-900/10 dark:to-zinc-900/10 p-4 sm:p-8 relative overflow-hidden flex items-center justify-center">
      {/* Enhanced animated backgrounds */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/20 dark:bg-emerald-400/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500/20 dark:bg-yellow-400/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-orange-500/20 dark:bg-orange-400/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto py-8 sm:py-12 w-full">
        {view === "main" && (
          <div className="w-full space-y-12 px-4 sm:px-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">
                {isReturningUser ? (
                  <span className="flex items-center justify-center gap-2">
                    Welcome back, {userName}!{" "}
                    <span className="animate-wave">👋</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Hi there, {userName}!{" "}
                    <span className="animate-bounce">✨</span>
                  </span>
                )}
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">
                Ace Your Technical Interview
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {isReturningUser
                  ? "Ready to continue your interview preparation journey?"
                  : "Master the art of technical interviews through interactive practice and real-time feedback"}
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                onClick={() => setView("selection")}
                className="w-full sm:w-auto text-lg px-8 py-6 h-auto font-semibold"
              >
                Start Practice
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="w-full sm:w-auto"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        )}

        {view === "selection" && renderSelectionScreen()}

        {view === "test" && (
          <div className="w-full px-4 sm:px-8">
            <InterviewTestPage
              Editor={true}
              setEditor={() => setView("main")}
            />
          </div>
        )}
        {view === "flashcard" && (
          <div className="w-full px-4 sm:px-8">
            <InterviewFlash setView={setView} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
