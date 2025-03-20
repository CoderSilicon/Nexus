"use client";

import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { generateFlashcards } from "@/actions/interview-prep";
import { ArrowLeft, ArrowRight, Keyboard, Eye, EyeOff } from "lucide-react";

type Flashcard = {
  question: string;
  answer: string;
};

type ViewState = "main" | "selection" | "test" | "flashcard";

export default function InterviewFlash({
  setView,
}: {
  setView: (view: ViewState) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!setupComplete) return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case " ":
          e.preventDefault();
          toggleAnswer();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [setupComplete, currentIndex, flashcards.length]);

  const handleStartPractice = async () => {
    if (!topic.trim()) {
      toast.error("Required Field", {
        description: "Please enter a topic to generate flashcards.",
      });
      return;
    }

    setLoading(true);

    try {
      const cards = await generateFlashcards({ topic: topic.trim() });
      setFlashcards(cards);
      setSetupComplete(true);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      toast.error("Error", {
        description: "Failed to load flashcards. Please try again.",
      });
    }

    setLoading(false);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-3 sm:p-6 max-w-3xl pt-12 sm:pt-16">
        <Toaster />
        <Card className="dark:bg-slate-900">
          <CardHeader className="space-y-2 p-4 sm:p-6">
            <Skeleton className="h-6 sm:h-8 w-3/4 dark:bg-slate-800" />
            <Skeleton className="h-3 sm:h-4 w-1/2 dark:bg-slate-800" />
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <Skeleton className="h-32 sm:h-48 w-full mb-4 dark:bg-slate-800" />
          </CardContent>
          <CardFooter className="p-4 sm:p-6">
            <Skeleton className="h-8 sm:h-10 w-20 sm:w-24 dark:bg-slate-800" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!setupComplete) {
    return (
      <div className="container mx-auto p-3 sm:p-6 max-w-3xl pt-12 sm:pt-16">
        <Toaster />
        <Card className="dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl dark:text-white">
              Flashcard Practice
            </CardTitle>
            <CardDescription className="dark:text-slate-400 text-xs sm:text-sm">
              Enter a topic to generate interview flashcards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="topic"
                className="dark:text-white text-xs sm:text-sm"
              >
                Topic <span className="text-red-500">*</span>
              </Label>
              <Input
                id="topic"
                placeholder="e.g., React Hooks, Data Structures, System Design"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="dark:bg-slate-800 dark:text-white dark:border-slate-700 text-sm"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 w-full">
            <Button
              onClick={handleStartPractice}
              disabled={loading}
              className="dark:hover:bg-slate-700 w-full sm:w-auto text-sm"
            >
              {loading ? "Generating..." : "Start Practice"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setView("selection")}
              className="dark:border-slate-700 w-full sm:w-auto text-sm"
            >
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-3xl pt-12 sm:pt-16">
      <Toaster />
      <Card className="dark:bg-slate-900">
        <CardHeader className="space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardTitle className="text-lg sm:text-xl md:text-2xl dark:text-white">
              {topic} Flashcards
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
                Card {currentIndex + 1} of {flashcards.length}
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-2 py-1">
                <Keyboard className="h-3 w-3" />
                <span>Use arrow keys & space</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-1.5" />
        </CardHeader>
        <CardContent className="min-h-[250px] sm:min-h-[300px] flex flex-col justify-center p-3 sm:p-6">
          <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-sm relative group transition-all duration-200 hover:shadow-md">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-medium dark:text-white mb-2 flex items-center gap-2">
                  Question:
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    #{currentIndex + 1}
                  </div>
                </h3>
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
                  {flashcards[currentIndex]?.question}
                </p>
              </div>

              {showAnswer && (
                <div className="max-h-[200px] sm:max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                  <h3 className="text-base sm:text-lg font-medium dark:text-white mb-2 sticky top-0 bg-white dark:bg-slate-800 py-1 z-10 flex items-center gap-2">
                    Answer:
                    <div className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                      Revealed
                    </div>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 pr-2">
                    {flashcards[currentIndex]?.answer}
                  </p>
                </div>
              )}

              <Button
                onClick={toggleAnswer}
                variant="outline"
                className="w-full text-sm flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              >
                {showAnswer ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Hide Answer
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Show Answer
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 p-3 sm:p-6">
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 w-full">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 text-sm flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
              className="dark:hover:bg-slate-700 text-sm flex items-center gap-2"
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setView("selection")}
              className="dark:border-slate-700 text-sm col-span-2 sm:col-span-1"
            >
              Exit Practice
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
