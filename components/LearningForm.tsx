"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

// Define the form schema
const formSchema = z.object({
  type: z.enum([
    "books",
    "courses",
    "workshops",
    "articles",
    "skills",
    "tools",
    "learning_goals",
  ]),
  topic: z.string().min(2, "Topic must be at least 2 characters"),
  description: z.string().min(10, "Please describe what you want to learn"),
  skillLevel: z.enum(["beginner", "intermediate", "advanced"]).optional(),
});

type Resource = {
  title: string;
  type: string;
  description: string;
  link: string;
  difficulty: string;
  duration: string;
  provider: string;
};

type LearningStep = {
  step: number;
  title: string;
  description: string;
  estimated_duration: string;
  resources: Array<{ title: string; link: string }>;
};

type Recommendations = {
  recommendations: {
    resources: Resource[];
    learning_path: {
      steps: LearningStep[];
      total_duration: string;
    };
  };
};

export default function LearningForm() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] =
    useState<Recommendations | null>(null);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "courses",
      topic: "",
      description: "",
      skillLevel: "beginner",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await fetch("/api/learning-gen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to generate learning path");
      }

      const data = await response.json();
      setRecommendations(data);
      toast.success("Learning resources found!");
    } catch (error) {
      toast.error("Failed to find learning resources");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Find Learning Resources</CardTitle>
          <CardDescription>
            Tell us what you want to learn, and we'll find the best resources
            for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resource Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="What type of resource are you looking for?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="courses">Online Courses</SelectItem>
                        <SelectItem value="workshops">Workshops</SelectItem>
                        <SelectItem value="articles">
                          Articles & Tutorials
                        </SelectItem>
                        <SelectItem value="skills">Skill Paths</SelectItem>
                        <SelectItem value="tools">
                          Tools & Technologies
                        </SelectItem>
                        <SelectItem value="learning_goals">
                          Learning Paths
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., React, Machine Learning, Python"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What do you want to learn?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what you want to learn and any specific areas you're interested in..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skillLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skill Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your current skill level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Finding Resources..." : "Find Learning Resources"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {recommendations && (
        <div className="space-y-8">
          {/* Resources Section */}
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Recommended Resources</CardTitle>
              <CardDescription>
                Here are some resources tailored to your learning goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {recommendations.recommendations.resources.map(
                (resource, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {resource.description}
                        </p>
                      </div>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                        {resource.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                        {resource.duration}
                      </span>
                      <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                        {resource.provider}
                      </span>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>

          {/* Learning Path Section */}
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Learning Path</CardTitle>
              <CardDescription>
                Follow this structured path to achieve your learning goals.
                Estimated total duration:{" "}
                {recommendations.recommendations.learning_path.total_duration}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {recommendations.recommendations.learning_path.steps.map(
                (step, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 dark:text-blue-300 font-semibold">
                          {step.step}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {step.description}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Duration: {step.estimated_duration}
                        </p>
                        {step.resources.length > 0 && (
                          <div className="mt-3">
                            <h4 className="text-sm font-semibold mb-2">
                              Related Resources:
                            </h4>
                            <ul className="space-y-1">
                              {step.resources.map((resource, idx) => (
                                <li key={idx}>
                                  <a
                                    href={resource.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
                                  >
                                    {resource.title}
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
