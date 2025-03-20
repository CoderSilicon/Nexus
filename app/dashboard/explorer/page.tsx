"use client";

import { motion } from "framer-motion";
import { Construction } from "lucide-react";

export default function ExplorerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="flex justify-center mb-8">
          <Construction className="h-16 w-16 text-blue-500 dark:text-blue-400" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Career Explorer Coming Soon
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We're working hard to build an intelligent career exploration tool
          that will help you discover and navigate potential career paths based
          on your skills, interests, and goals.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Features in Development
          </h2>

          <ul className="text-left space-y-3 text-gray-600 dark:text-gray-300">
            <li>• AI-powered career path recommendations</li>
            <li>• Skill gap analysis and learning roadmaps</li>
            <li>• Industry trends and market insights</li>
            <li>• Salary data and growth projections</li>
            <li>• Personalized action plans</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
