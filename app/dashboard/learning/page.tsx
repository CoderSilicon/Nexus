"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LearningForm from "@/components/LearningForm";
import {
  BookOpen,
  GraduationCap,
  Library,
  Lightbulb,
  Target,
  ArrowLeft,
  Plus,
} from "lucide-react";

const Page = () => {
  const [view, setView] = useState<"main" | "add" | "resources">("main");
  const router = useRouter();

  const stats = [
    {
      number: "15+",
      label: "Learning Paths",
      icon: <Target className="h-6 w-6 text-purple-500 dark:text-purple-400" />,
      description: "Personalized learning journeys",
    },
    {
      number: "100+",
      label: "Resources",
      icon: <Library className="h-6 w-6 text-blue-500 dark:text-blue-400" />,
      description: "Curated learning materials",
    },
    {
      number: "24/7",
      label: "Available",
      icon: <BookOpen className="h-6 w-6 text-green-500 dark:text-green-400" />,
      description: "Learn at your own pace",
    },
  ];

  const features = [
    {
      icon: <Plus className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Add Learning Resource",
      description:
        "Add a new book, course, or learning goal to track your progress",
      color: "blue",
      onClick: () => setView("add"),
    },
    {
      icon: (
        <GraduationCap className="h-8 w-8 text-green-600 dark:text-green-400" />
      ),
      title: "View Resources",
      description: "Browse your learning materials and track progress",
      color: "green",
      onClick: () => setView("resources"),
    },
  ];

  const renderSelectionScreen = () => (
    <div className="flex flex-col items-center space-y-8 w-full max-w-4xl mx-auto">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Choose an Action
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Add new learning resources or view your existing materials
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
                Your Learning Journey
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Track your progress, discover resources, and achieve your
                learning goals
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
                onClick={() => setView("add")}
                className="w-full sm:w-auto text-lg px-8 py-6 h-auto font-semibold"
              >
                Get Started
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

        {view === "add" && (
          <div className="w-full px-4 sm:px-8">
            <div className="mb-8">
              <Button
                variant="outline"
                onClick={() => setView("main")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>
            <LearningForm />
          </div>
        )}

        {view === "resources" && (
          <div className="w-full px-4 sm:px-8">
            <div className="mb-8">
              <Button
                variant="outline"
                onClick={() => setView("main")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </div>
            {/* Add your resources view component here */}
            <div className="text-center text-gray-600 dark:text-gray-300">
              Resources view coming soon...
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
