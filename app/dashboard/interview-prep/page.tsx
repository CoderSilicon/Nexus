"use client";

import InterviewTestPage from "@/components/InterviewQuiz";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [Editor, setEditor] = useState<boolean>(false);

  const stats = [
    { number: "500+", label: "Practice Questions" },
    { number: "10+", label: "Topic Categories" },
    { number: "24/7", label: "Available" },
  ];

  return (
    <>
      {!Editor ? (
        <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-slate-900/10 dark:to-zinc-900/10 p-8 relative overflow-hidden flex items-center justify-center transition-colors duration-300">
          {/* Enhanced animated backgrounds */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/30 dark:bg-emerald-400/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500/30 dark:bg-yellow-400/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-orange-500/30 dark:bg-orange-400/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

          <div className=" flex flex-col items-center relative z-10">
            <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-8 text-center transition-colors duration-300">
              Ace Your Technical Interview
            </h1>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-8 mb-10 ">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-600 dark:text-gray-200 text-center mb-6 text-xl transition-colors duration-300 ">
              Master the art of technical interviews through practice
            </p>

            <div className="flex gap-4  ">
              <Button
                onClick={() => {
                  setEditor(!Editor);
                }}
                className="transform transition-all duration-300  bg-blue-600 hover:bg-blue-700
                 px-8 py-4 text-lg"
              >
                Start Practice Quiz
              </Button>
            </div>
          </div>
        </main>
      ) : (
        <InterviewTestPage Editor={Editor} setEditor={setEditor} />
      )}
    </>
  );
};

export default Page;
