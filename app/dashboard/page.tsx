"use client";

import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  FileText,
  Home,
  Settings,
  Search,
  Code,
  BookOpen,
  Globe,
  Briefcase,
  FileQuestion,
  Compass,
  Zap,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  Send,
  ArrowUp,
  Calendar,
  Trophy,
  Star,
  Video,
} from "lucide-react";
import { useState, useEffect } from "react";

import Link from "next/link";

export default function DashboardPage() {
  const { user } = useUser();
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCollapsed, setIsCollapsed] = useState(false);
  interface Activity {
    title: string;
    type: string;
    timestamp: string;
  }

  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  if (!user) {
    redirect("/");
  }

  const username = user.username || "User";

  // Load activities from localStorage on component mount
  useEffect(() => {
    const storedActivities = JSON.parse(
      localStorage.getItem("recentActivities") || "[]"
    );
    setRecentActivities(storedActivities);
  }, []);

  // Function to track new activity
  const trackActivity = (toolName: string, toolType: string) => {
    const newActivity = {
      title: `Used ${toolName}`,
      type: toolType,
      timestamp: new Date().toISOString(),
    };

    // Get current activities
    const currentActivities = JSON.parse(
      localStorage.getItem("recentActivities") || "[]"
    );

    // Add new activity at the beginning
    const updatedActivities = [newActivity, ...currentActivities].slice(0, 10); // Keep only 10 most recent

    // Update localStorage
    localStorage.setItem("recentActivities", JSON.stringify(updatedActivities));

    // Update state
    setRecentActivities(updatedActivities);
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

  // Tool categories
  const categories = [
    { id: "resume", name: "Resume", href: "/dashboard/resume" },
    { id: "interview", name: "Interview", href: "/dashboard/interview-prep" },
    { id: "learning", name: "Learning", href: "/dashboard/learning" },
    { id: "networking", name: "Networking", href: "/dashboard/networking" },
  ];

  // Interview resources - no user data needed
  const interviewResources = [
    {
      id: "questions",
      name: "Common Questions",
      description: "Prepare for frequently asked questions",
      icon: FileQuestion,
    },
    {
      id: "behavioral",
      name: "Behavioral Interview",
      description: "STAR method examples and techniques",
      icon: MessageSquare,
    },
    {
      id: "technical",
      name: "Technical Interview",
      description: "Coding challenges and problem-solving",
      icon: Code,
    },
    {
      id: "salary",
      name: "Salary Negotiation",
      description: "Tips for discussing compensation",
      icon: Briefcase,
    },
  ];

  // Learning resources - no user data needed
  const learningResources = [
    {
      id: "jobsearch",
      name: "Job Search Strategy",
      description: "Tips for finding and applying to jobs",
      icon: Search,
    },
    {
      id: "networking",
      name: "Networking Guide",
      description: "Building professional relationships",
      icon: Globe,
    },
    {
      id: "portfolio",
      name: "Portfolio Building",
      description: "Showcase your work effectively",
      icon: Briefcase,
    },
    {
      id: "careerplan",
      name: "Career Planning",
      description: "Set and achieve career goals",
      icon: Compass,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 ">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } hidden lg:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 relative`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronRight
            className={`h-4 w-4 transform transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>

        <div className="flex-1 p-4 space-y-1">
          <motion.div
            whileHover={{ x: 5 }}
            className={`flex items-center px-4 py-3 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg font-medium cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Home className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">Dashboard</span>}
          </motion.div>

          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer ${
                  isCollapsed ? "justify-center" : ""
                }`}
                onClick={() => trackActivity(category.name, category.id)}
              >
                {category.id === "resume" && <FileText className="h-5 w-5" />}
                {category.id === "interview" && (
                  <MessageSquare className="h-5 w-5" />
                )}
                {category.id === "learning" && <BookOpen className="h-5 w-5" />}
                {category.id === "networking" && <Globe className="h-5 w-5" />}
                {!isCollapsed && <span className="ml-3">{category.name}</span>}
              </motion.div>
            </Link>
          ))}

          <motion.div
            whileHover={{ x: 5 }}
            className={`flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Settings className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">Settings</span>}
          </motion.div>
        </div>

        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20"
            >
              <h3 className="font-medium text-blue-700 dark:text-blue-300 flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Quick Tip
              </h3>
              <p className="text-sm text-blue-600/80 dark:text-blue-400/80 mt-1">
                Tailor your resume for each job application to highlight
                relevant skills.
              </p>
            </motion.div>
          </div>
        )}
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Welcome back, {username}!
                </h1>
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
                  <Link href="./dashboard/resumeEditor">Open Tool</Link>
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
                  <Link href="./dashboard/interview-prep">Open Tool</Link>
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
                  <span>Open Tool</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Statistics Cards */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Applications Submitted</p>
                  <h3 className="text-3xl font-bold mt-2">24</h3>
                </div>
                <div className="p-3 bg-blue-400/30 rounded-lg">
                  <Send className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-blue-100">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>12% from last week</span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Interview Invites</p>
                  <h3 className="text-3xl font-bold mt-2">8</h3>
                </div>
                <div className="p-3 bg-purple-400/30 rounded-lg">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-purple-100">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>3 upcoming this week</span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Profile Strength</p>
                  <h3 className="text-3xl font-bold mt-2">92%</h3>
                </div>
                <div className="p-3 bg-emerald-400/30 rounded-lg">
                  <Trophy className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-emerald-100">
                <Star className="h-4 w-4 mr-1" />
                <span>Almost complete!</span>
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
                            : "bg-purple-100 dark:bg-purple-900/30"
                        }`}
                      >
                        {activity.type === "resume" ? (
                          <FileText className="h-5 w-5 text-blue-500" />
                        ) : activity.type === "interview" ? (
                          <Video className="h-5 w-5 text-green-500" />
                        ) : (
                          <Briefcase className="h-5 w-5 text-purple-500" />
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

          {/* Quick Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between"
          >
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Need Help?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-xl">
                Our career experts are available to help you with your job
                search, resume, or interview preparation.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Get Support
            </motion.button>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
