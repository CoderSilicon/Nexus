import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen py-16  flex flex-col justify-center items-center bg-gradient-to-r from-indigo-100 to-blue-200 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-900 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#1e3a8a,transparent)] opacity-60"></div>
      </div>
      <motion.p
        className="text-sm font-extrabold text-blue-700 dark:text-blue-400 lexend-700 max-w-2xl mx-auto leading-tight tracking-widest"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        whileHover={{
          scale: 1.1,
          color: "#2563EB",
          textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
        }}
      >
        NEXUS
      </motion.p>
      <div className="flex flex-col justify-center items-center text-center relative z-10 space-y-8 px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white plus-jakarta-sans-800 max-w-2xl mx-auto leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Your Personal AI Coach and Career Guide
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-gray-700 dark:text-gray-300 inter-200 max-w-md mx-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Check out this little AI and create your interview experience at next
          level in a snap. - Nexus
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
          <motion.button
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 dark:bg-blue-600 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out w-full sm:w-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Get Started!
          </motion.button>
          <motion.button
            className="px-6 py-3 text-lg font-semibold text-black dark:text-white border-2 border-slate-950 dark:border-slate-200 rounded-xl shadow-md transform hover:scale-105 transition duration-300 ease-in-out w-full sm:w-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Read Docs
          </motion.button>
        </div>
      </div>

      <div className="hero-image-wrapper mt-12 px-4 w-full max-w-6xl">
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        >
          <Image
            src="/banner.jpeg"
            width={1280}
            height={720}
            alt="Dashboard Preview"
            className="rounded-lg shadow-2xl border dark:border-gray-700 mx-auto"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
