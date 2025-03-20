"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Home,
  Settings,
  BookOpen,
  Globe,
  MessageSquare,
  Menu,
  X,
  Compass,
} from "lucide-react";

type ActivityTracker = (toolName: string, toolType: string) => void;

interface DashboardNavbarProps {
  trackActivity: ActivityTracker;
  username: string;
}

export function DashboardNavbar({
  trackActivity,
  username,
}: DashboardNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Categories for navigation
  const categories = [
    {
      id: "resume",
      name: "Resume",
      href: "/dashboard/resumeEditor",
      icon: FileText,
    },
    {
      id: "interview",
      name: "Interview",
      href: "/dashboard/interview-prep",
      icon: MessageSquare,
    },
    {
      id: "learning",
      name: "Learning",
      href: "/dashboard/learning",
      icon: BookOpen,
    },
    {
      id: "career",
      name: "Career Explorer",
      href: "/dashboard/explorer",
      icon: Compass,
    },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-18 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="flex items-center"
              onClick={() => trackActivity("Dashboard", "navigation")}
            >
              <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="ml-3 font-semibold text-gray-800 dark:text-gray-200">
                Dashboard
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => trackActivity(category.name, category.id)}
              >
                <category.icon className="h-5 w-5 mr-2" />
                {category.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 shadow-lg">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  trackActivity(category.name, category.id);
                  setIsMenuOpen(false);
                }}
              >
                <category.icon className="h-5 w-5 mr-3" />
                {category.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
