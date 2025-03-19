"use client";

import React, { useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { generateQuiz, generateImprovementTip } from "@/actions/interview"; // Adjust the import path as needed

// Define types for the quiz question
type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export default function InterviewTestPage({ props }: any) {
  const [loading, setLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [improvementTip, setImprovementTip] = useState("");
  const [industry, setIndustry] = useState("");
  const [skills, setSkills] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleStartQuiz = async () => {
    if (!industry.trim()) {
      toast.error("Required Field", {
        description:
          "Please enter your industry to generate relevant questions.",
      });
      return;
    }

    setLoading(true);

    try {
      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
      const quizQuestions = await generateQuiz({
        industry: industry.trim(),
        skills: skillsArray,
      });

      setQuestions(quizQuestions);
      setAnswers(new Array(quizQuestions.length).fill(""));
      setSetupComplete(true);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      toast.error("Error", {
        description: "Failed to load quiz questions. Please try again.",
      });
    }

    setLoading(false);
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleQuizSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuizSubmit = async () => {
    setSubmitting(true);

    // Calculate score
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) {
        correctAnswers++;
      }
    });

    const scorePercentage = Math.round(
      (correctAnswers / questions.length) * 100
    );
    setScore(scorePercentage);

    // Generate improvement tip
    try {
      const questionsWithIndex = questions.map((q, index) => ({ q, index }));
      const tip = await generateImprovementTip({
        questions: questionsWithIndex,
        answers,
        industry,
      });

      if (tip) {
        setImprovementTip(tip);
      }
    } catch (error) {
      console.error("Error generating improvement tip:", error);
    }

    setQuizCompleted(true);
    setSubmitting(false);
  };

  const startNewQuiz = () => {
    setSetupComplete(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setImprovementTip("");
    setQuestions([]);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:p-8 max-w-3xl pt-20">
        <Toaster />
        <Card className="dark:bg-slate-900">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 dark:bg-slate-800" />
            <Skeleton className="h-4 w-1/2 dark:bg-slate-800" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full mb-4 dark:bg-slate-800" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-full dark:bg-slate-800" />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-24 dark:bg-slate-800" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!setupComplete) {
    return (
      <div className="container mx-auto p-4 sm:p-8 max-w-3xl pt-20">
        <Toaster />
        <Card className="dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl dark:text-white">
              Technical Interview Quiz
            </CardTitle>
            <CardDescription className="dark:text-slate-400 text-sm sm:text-base">
              Enter your industry and skills to generate relevant questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="industry"
                  className="dark:text-white text-sm sm:text-base"
                >
                  Industry <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="industry"
                  placeholder="e.g., Software Development, Finance, Marketing"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="dark:bg-slate-800 dark:text-white dark:border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="skills"
                  className="dark:text-white text-sm sm:text-base"
                >
                  Skills (comma-separated, optional)
                </Label>
                <Input
                  id="skills"
                  placeholder="e.g., JavaScript, React, Node.js"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="dark:bg-slate-800 dark:text-white dark:border-slate-700"
                />
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  Enter skills relevant to your industry to get more specific
                  questions
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleStartQuiz}
              disabled={loading}
              className="dark:hover:bg-slate-700 w-full sm:w-auto"
            >
              {loading ? "Generating Quiz..." : "Start Quiz"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="container mx-auto p-4 sm:p-8 max-w-3xl pt-20">
        <Toaster />
        <Card className="dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl dark:text-white">
              Interview Test Results
            </CardTitle>
            <CardDescription className="dark:text-slate-400 text-sm sm:text-base">
              You've completed the {industry} technical interview test
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between dark:text-white text-sm sm:text-base">
                <div>Your Score</div>
                <div className="font-bold">{score}%</div>
              </div>
              <Progress value={score} className="h-2" />
            </div>

            {improvementTip && (
              <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-md border border-blue-100 dark:border-slate-700">
                <h3 className="font-medium text-blue-800 dark:text-blue-400 mb-1 text-sm sm:text-base">
                  Improvement Tip
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm sm:text-base">
                  {improvementTip}
                </p>
              </div>
            )}

            <div className="space-y-6">
              <h3 className="text-lg font-medium dark:text-white">
                Question Review
              </h3>
              {questions.map((question, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <h4 className="font-medium dark:text-white text-sm sm:text-base">
                      Question {index + 1}
                    </h4>
                    <p className="mt-1 dark:text-slate-300 text-sm sm:text-base">
                      {question.question}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-md ${
                          option === question.correctAnswer
                            ? "bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
                            : option === answers[index] &&
                              option !== question.correctAnswer
                            ? "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
                            : "bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
                        } dark:text-white text-sm sm:text-base`}
                      >
                        {option}
                        {option === question.correctAnswer && (
                          <span className="ml-2 text-green-600 dark:text-green-400 text-sm">
                            ✓ Correct
                          </span>
                        )}
                        {option === answers[index] &&
                          option !== question.correctAnswer && (
                            <span className="ml-2 text-red-600 dark:text-red-400 text-sm">
                              ✗ Your answer
                            </span>
                          )}
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-md border border-gray-200 dark:border-slate-700">
                    <h5 className="text-sm font-medium dark:text-white">
                      Explanation
                    </h5>
                    <p className="text-sm mt-1 dark:text-slate-300">
                      {question.explanation}
                    </p>
                  </div>

                  {index < questions.length - 1 && (
                    <Separator className="dark:bg-slate-700" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={startNewQuiz}
              className="dark:hover:bg-slate-700 w-full sm:w-auto"
            >
              Start New Quiz
            </Button>
            <Button
              onClick={() => {
                props.setEditor(!props.Editor);
              }}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const questionProgress =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto p-4 sm:p-8 max-w-3xl pt-20">
      <Toaster />
      <Card className="dark:bg-slate-900">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl dark:text-white">
              Technical Interview Test
            </CardTitle>
            <div className="text-sm text-gray-500 dark:text-slate-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
          <CardDescription className="dark:text-slate-400 text-sm sm:text-base">
            Test your {industry} skills with technical questions
          </CardDescription>
          <Progress value={questionProgress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2 dark:text-white">
              {currentQuestion.question}
            </h3>
            <RadioGroup
              value={answers[currentQuestionIndex] || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={`option-${index}`}
                    className="dark:border-slate-700"
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="cursor-pointer dark:text-white text-sm sm:text-base"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 w-full sm:w-auto"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={!answers[currentQuestionIndex] || submitting}
            className="dark:hover:bg-slate-700 w-full sm:w-auto"
          >
            {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
