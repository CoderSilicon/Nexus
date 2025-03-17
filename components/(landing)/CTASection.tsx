import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="w-full p-4">
      <div className="mx-auto py-24 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tighter text-gray-800 dark:text-gray-100 sm:text-4xl md:text-5xl">
            Ready to Accelerate Your Career?
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl">
            Join thousands of professionals who are advancing their careers with
            AI-powered guidance.
          </p>
          <Link href="/dashboard" passHref>
            <Button
              size="lg"
              variant="secondary"
              className="h-12 mt-5 hover:scale-105 transition-transform duration-200 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
