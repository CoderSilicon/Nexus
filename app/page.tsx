"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  SiGooglechrome,
  SiFirefox,
  SiSafari,
  SiOpera,
  SiBrave,
  SiVivaldi,
} from "react-icons/si";
import { FaEdge, FaInternetExplorer } from "react-icons/fa";

const apps = [
  { name: "Chrome", icon: SiGooglechrome },
  { name: "Firefox", icon: SiFirefox },
  { name: "Safari", icon: SiSafari },
  { name: "Opera", icon: SiOpera },
  { name: "Edge", icon: FaEdge },
  { name: "Brave", icon: SiBrave },
  { name: "Vivaldi", icon: SiVivaldi },
  { name: "Internet Explorer", icon: FaInternetExplorer },
];
export default function Home() {
  return (
    <>
      <div>
        <div className="relative min-h-screen my-10 flex flex-col justify-center items-center bg-gradient-to-r from-indigo-100 to-blue-200">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] opacity-60"></div>
          </div>

          <div className="flex flex-col justify-center items-center text-center relative z-10 space-y-6">
            <motion.h1
              className="text-5xl font-extrabold text-slate-800 plus-jakarta-sans-800 max-w-2xl mx-auto leading-tight"
              initial={{ opacity: 0, y: -50 }} // Starting state
              animate={{ opacity: 1, y: 0 }} // End state
              transition={{ duration: 1, ease: "easeOut" }} // Animation duration and easing
            >
              Your Personal AI Coach and Career Guide
            </motion.h1>

            <motion.p
              className="text-lg text-gray-700 inter-200 max-w-md mx-auto"
              initial={{ opacity: 0, x: -50 }} // Starting state
              animate={{ opacity: 1, x: 0 }} // End state
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} // Animation duration and easing
            >
              Check out this little AI and create your interview experience at
              next level in a snap. - Nexus
            </motion.p>

            <motion.button
              className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-blue-500/45 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
              initial={{ opacity: 0, scale: 0.8 }} // Starting state
              animate={{ opacity: 1, scale: 1 }} // End state
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }} // Animation duration and easing
            >
              Get Started!
            </motion.button>
          </div>
        </div>
        <div className="bg-sky-600 text-white text-center p-6 min-h-full flex flex-col items-center">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-4 plus-jakarta-sans-800 mt-4">
              Works Anywhere?
            </h1>
            <p className="text-lg mb-6 lexend-300">
              Experience Nexus effortlessly on any major browser or platform—no
              downloads required! Just click the button below and dive right in
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center items-center mb-6">
              {apps.map((app, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center mt-4 mb-4 m-2.5 p-2"
                >
                  <app.icon className="w-12 h-12 mb-2" />
                  <span className="text-sm">{app.name}</span>
                </div>
              ))}
            </div>
            <p className="text-md text-slate-300 text-center lexend-400">
              And <span className="text-blue-200"> Many more</span>—too many to
              list them all here!
            </p>
          </div>
        </div>
      </div>
      <div className="py-16 px-8 bg-gradient-to-r from-indigo-50 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-12 plus-jakarta-sans-800">
            Powerful Features for Your Career Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Optimized Resumes",
                description:
                  "Smart resume enhancement with industry-specific keywords and formatting",
                icon: "📄",
              },
              {
                title: "Career Path Analysis",
                description:
                  "Data-driven insights for optimal career progression",
                icon: "🎯",
              },
              {
                title: "Interactive Charts",
                description:
                  "Visual representation of skill gaps and growth opportunities",
                icon: "📊",
              },
              {
                title: "Mock Interview AI",
                description: "Practice interviews with real-time feedback",
                icon: "🎙️",
              },
              {
                title: "Skill Assessment",
                description:
                  "Comprehensive evaluation of technical and soft skills",
                icon: "✅",
              },
              {
                title: "Industry Trends",
                description:
                  "Real-time updates on market demands and emerging technologies",
                icon: "📈",
              },
              {
                title: "Personalized Learning",
                description: "Customized learning paths based on your goals",
                icon: "🎓",
              },
              {
                title: "Network Analytics",
                description: "Strategic insights for professional networking",
                icon: "🤝",
              },
              {
                title: "Smart Recommendations",
                description: "AI-powered job and skill recommendations",
                icon: "💡",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
