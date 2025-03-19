"use client";

import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  FileText,
  User,
  Home,
  Settings,
  Bell,
  Search,
  Code,
  BookOpen,
  Globe,
  Briefcase,
  Download,
  FileQuestion,
  Lightbulb,
  Compass,
  Palette,
  Zap,
  MessageSquare,
  HelpCircle,
  LogOut,
  ExternalLink,
  Copy,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useUser();
  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!user) {
    redirect("/");
  }

  const username = user.username || "User";

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
    { id: "all", name: "All Tools", href: "/dashboard" },
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

  const handleCopyTemplate = (id: string) => {
    setCopiedTemplate(id);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } hidden md:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 relative`}
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

        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
              {username?.charAt(0) || "U"}
            </div>
            {!isCollapsed && (
              <span className="ml-2 font-semibold text-lg">Career Toolkit</span>
            )}
          </motion.div>
        </div>

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
            <Link key={category.id} href={`./${category.href}`}>
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer ${
                  isCollapsed ? "justify-center" : ""
                }`}
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
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between"
        >
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Welcome, {username}!</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools..."
                className="pl-9 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-700"
            >
              <Bell className="h-5 w-5" />
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold"
            >
              {username?.charAt(0) || "U"}
            </motion.div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          {/* Tool Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Career Tools & Resources
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category.id
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
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
                >
                  <span>Open Tool</span>
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
                >
                  <span>Open Tool</span>
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
                >
                  <span>Open Tool</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Interview Resources */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Interview Resources</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-blue-600 dark:text-blue-400 flex items-center"
                >
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </motion.button>
              </div>

              <div className="space-y-4">
                {interviewResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    variants={itemVariants}
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-4">
                      <resource.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{resource.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {resource.description}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ExternalLink className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Learning Resources */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Learning Resources</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-blue-600 dark:text-blue-400 flex items-center"
                >
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </motion.button>
              </div>

              <div className="space-y-4">
                {learningResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    variants={itemVariants}
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 mr-4">
                      <resource.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{resource.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {resource.description}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ExternalLink className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </motion.button>
                  </motion.div>
                ))}
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
