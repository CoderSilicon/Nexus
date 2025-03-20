"use client";
import { DashboardNavbar } from "@/components/dashboard-nav";
import ResumeForm from "@/components/ResumeEditor";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const router = useRouter();
  const [Editor, setEditor] = useState<boolean>(false);
  return (
    <>
      {!Editor ? (
        <>
          <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-slate-900/10 dark:to-zinc-900/10 p-8 relative overflow-hidden flex items-center justify-center transition-colors duration-300">
            {/* Decorative blurred shapes */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 dark:bg-blue-400/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/30 dark:bg-purple-400/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-40 w-72 h-72 bg-indigo-500/30 dark:bg-indigo-400/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
              <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-8 text-center transition-colors duration-300">
                Create Your Dream Resume
              </h1>
              <p className="text-gray-600 dark:text-gray-200 text-center mb-10 text-lg transition-colors duration-300">
                Build a professional resume that stands out and opens new
                opportunities
              </p>
              <div className="flex justify-center items-center space-x-4">
                <Button
                  onClick={() => {
                    setEditor(!Editor);
                  }}
                >
                  Generate A New Resume
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Close{" "}
                </Button>
              </div>
            </div>
          </main>
        </>
      ) : (
        <ResumeForm Editor={Editor} setEditor={setEditor} />
      )}
    </>
  );
};

export default page;
