"use client";

import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Home,
  FileText,
  MessageSquare,
  Compass,
  Send,
  ArrowUp,
  Calendar,
  Trophy,
  Star,
  Video,
  Briefcase,
  HelpCircle,
  ChevronRight,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

import { DashboardNavbar } from "@/components/dashboard-nav";

export default function DashboardPage() {
  const { user } = useUser();
  const [activeCategory, setActiveCategory] = useState("all");

  interface Activity {
    title: string;
    type: string;
    timestamp: string;
  }

  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState({
    applicationsSubmitted: 0,
    interviewInvites: 0,
    profileStrength: 92,
    learningProgress: 0,
  });

  if (!user) {
    redirect("/");
  }

  const userName = user?.firstName || user?.username || "User";

  // Load activities and stats from localStorage on component mount
  useEffect(() => {
    const storedActivities = JSON.parse(
      localStorage.getItem("recentActivities") || "[]"
    );
    setRecentActivities(storedActivities);

    // Load stats from localStorage
    const storedStats = JSON.parse(
      localStorage.getItem("userStats") ||
        JSON.stringify({
          applicationsSubmitted: 0,
          interviewInvites: 0,
          profileStrength: 92,
          learningProgress: 0,
        })
    );
    setStats(storedStats);
  }, []);

  // Function to track new activity and update stats
  const trackActivity = (toolName: string, toolType: string) => {
    const newActivity = {
      title: `Used ${toolName}`,
      type: toolType,
      timestamp: new Date().toISOString(),
    };

    // Get current activities and stats from localStorage
    const currentActivities = JSON.parse(
      localStorage.getItem("recentActivities") || "[]"
    );
    const currentStats = JSON.parse(
      localStorage.getItem("userStats") ||
        JSON.stringify({
          applicationsSubmitted: 0,
          interviewInvites: 0,
          profileStrength: 92,
          learningProgress: 0,
        })
    );

    // Add new activity at the beginning
    const updatedActivities = [newActivity, ...currentActivities].slice(0, 10);

    // Update stats based on tool type
    const updatedStats = { ...currentStats };

    if (toolType === "resume") {
      updatedStats.applicationsSubmitted += 1;
    } else if (toolType === "interview") {
      updatedStats.interviewInvites += 1;
    } else if (toolType === "learning") {
      updatedStats.learningProgress = Math.min(
        100,
        (updatedStats.learningProgress || 0) + 10
      );
    }

    // Update localStorage and state
    localStorage.setItem("recentActivities", JSON.stringify(updatedActivities));
    localStorage.setItem("userStats", JSON.stringify(updatedStats));
    setRecentActivities(updatedActivities);
    setStats(updatedStats);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <DashboardNavbar trackActivity={trackActivity} username={userName} />

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-0">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Hi {userName}!</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Here's what's happening with your job search today.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tool Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tools & Resources</h2>
        </div>

        {/* Featured Tools */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="h-2 bg-amber-500"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                  Featured
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Learning Resources</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Find curated learning materials and track your progress
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 rounded-lg text-sm font-medium text-amber-700 dark:text-amber-300 flex items-center justify-center"
                onClick={() => trackActivity("Learning Resources", "learning")}
              >
                <Link href="/dashboard/learning">Open Tool</Link>
                <ChevronRight className="h-4 w-4 ml-1" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="h-2 bg-blue-500"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  Popular
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Resume Builder</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Create professional resumes with customizable templates
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center justify-center"
                onClick={() => trackActivity("Resume Builder", "resume")}
              >
                <Link href="/dashboard/resumeEditor">Open Tool</Link>
                <ChevronRight className="h-4 w-4 ml-1" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="h-2 bg-green-500"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  New
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Interview Simulator
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Practice common interview questions with AI feedback
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 rounded-lg text-sm font-medium text-green-700 dark:text-green-300 flex items-center justify-center"
                onClick={() =>
                  trackActivity("Interview Simulator", "interview")
                }
              >
                <Link href="/dashboard/interview-prep">Open Tool</Link>
                <ChevronRight className="h-4 w-4 ml-1" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            <div className="h-2 bg-purple-500"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Compass className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                  Trending
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Career Explorer</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Discover career paths based on your skills and interests
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 rounded-lg text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center justify-center"
                onClick={() => trackActivity("Career Explorer", "career")}
              >
                <Link href="/dashboard/explorer">Open Tool</Link>
                <ChevronRight className="h-4 w-4 ml-1" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Resumes Created</p>
                <h3 className="text-3xl font-bold mt-2">
                  {stats.applicationsSubmitted}
                </h3>
              </div>
              <div className="p-3 bg-blue-400/30 rounded-lg">
                <Send className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-blue-100">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>Updated in real-time</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Interviews Taken</p>
                <h3 className="text-3xl font-bold mt-2">
                  {stats.interviewInvites}
                </h3>
              </div>
              <div className="p-3 bg-purple-400/30 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-purple-100">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>Updated in real-time</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Learning Progress</p>
                <h3 className="text-3xl font-bold mt-2">
                  {stats?.learningProgress || 0}
                </h3>
              </div>
              <div className="p-3 bg-emerald-400/30 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-emerald-100">
              <Lightbulb className="h-4 w-4 mr-1" />
              <span>Active learning paths</span>
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            variants={containerVariants}
            className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {recentActivities.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400">
                  No recent activities
                </div>
              ) : (
                recentActivities.slice(0, 3).map((activity, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center space-x-4"
                  >
                    <div
                      className={`p-3 rounded-full ${
                        activity.type === "resume"
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : activity.type === "interview"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : activity.type === "learning"
                          ? "bg-amber-100 dark:bg-amber-900/30"
                          : "bg-purple-100 dark:bg-purple-900/30"
                      }`}
                    >
                      {activity.type === "resume" ? (
                        <FileText className="h-5 w-5 text-blue-500" />
                      ) : activity.type === "interview" ? (
                        <MessageSquare className="h-5 w-5 text-green-500" />
                      ) : activity.type === "learning" ? (
                        <BookOpen className="h-5 w-5 text-amber-500" />
                      ) : (
                        <Compass className="h-5 w-5 text-purple-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium dark:text-gray-200">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
