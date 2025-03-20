"use client";
import React from "react";
import {
  Brain,
  Star,
  Users,
  Zap,
  MessageCircle,
  Shield,
  Moon,
  Sun,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import logo from "@/assets/imgs/logo.png";

const AboutPage = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white lexend-400 rounded-xl md:rounded-3xl mx-4 md:mx-8  ">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Image
              src={logo}
              width={120}
              height={120}
              alt="Logo"
              className="dark:invert md:w-[165px] md:h-[165px]"
            />
            <h1 className="text-3xl md:text-6xl font-bold">Nexus</h1>
            <p className="text-lg md:text-2xl font-light max-w-2xl px-4">
              Your AI Coach: Smarter Than a Fortune Cookie, More Patient Than
              Your Mom
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-800 dark:text-slate-100">
              Our Mission
            </h2>
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 px-4 mb-6">
              Nexus, I'm on a mission to make professional coaching so
              accessible, even your houseplant could level up its career. I've
              married cutting-edge AI with proven coaching techniques to create
              a digital mentor that won't judge you for eating cereal for dinner
              or wearing the same sweatpants three days in a row.
            </p>
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 px-4">
              Proudly crafted by Silicon - yes, that's really my company name,
              and no, I'm not related to Silicon Valley (though I wish I had
              their coffee budget). I am the only one in the Company and one who
              believe AI should be as friendly as your neighborhood barista, but
              with better career advice than your uncle who still thinks
              "computer programming" means fixing the TV remote.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-16 bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-slate-800 dark:text-slate-100">
            Why Choose Nexus
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="flex flex-col h-full bg-white dark:bg-slate-700 shadow-lg transition-all hover:scale-105">
              <div className="p-6 flex-1 flex flex-col items-center">
                <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardHeader className="p-0 space-y-1">
                  <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 text-center">
                    AI-Powered Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-slate-300 text-center mt-4">
                  Machine learning that understands you better than your ex ever
                  did.
                </CardContent>
              </div>
            </Card>

            <Card className="flex flex-col h-full bg-white dark:bg-slate-700 shadow-lg transition-all hover:scale-105">
              <div className="p-6 flex-1 flex flex-col items-center">
                <Star className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardHeader className="p-0 space-y-1">
                  <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 text-center">
                    Personalized Growth
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-slate-300 text-center mt-4">
                  Custom strategies tailored to your unique career path and
                  goals.
                </CardContent>
              </div>
            </Card>

            <Card className="flex flex-col h-full bg-white dark:bg-slate-700 shadow-lg transition-all hover:scale-105">
              <div className="p-6 flex-1 flex flex-col items-center">
                <MessageCircle className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardHeader className="p-0 space-y-1">
                  <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100 text-center">
                    24/7 Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-slate-300 text-center mt-4">
                  Always available, unlike your human friends during a crisis.
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 md:py-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-800 dark:text-slate-100">
              Start Your Coaching Journey Today
            </h2>
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 mb-6 md:mb-8 px-4">
              Join thousands of professionals who now have a better excuse than
              "the dog ate my homework" for their career challenges.
            </p>
            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Get Started (Before Your Motivation Ghosted You Again)
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 bg-slate-800 dark:bg-slate-950 text-slate-300 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm md:text-base mb-2">
            © {new Date().getFullYear()} Nexus AI Coach. All rights reserved.
            (Even the dad jokes.)
          </p>
          <div className="flex flex-col md:flex-row justify-center md:space-x-4 space-y-2 md:space-y-0 mt-4">
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
