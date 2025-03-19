import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { summarySchema, SummaryVals } from "@/lib/FormSchema";
import { EditorFormProps } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Wand2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const SummaryForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SummaryVals>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      const formData = form.getValues();
      setResumeData({
        ...resumeData,
        ...value,
      });
    });

    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  const handleGenerateAI = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auto-gen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      form.setValue("summary", data.summary);
      setResumeData({
        ...resumeData,
        summary: data.summary,
      });
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-xl space-y-6 mx-auto dark:text-white">
        <div className="space-y-1.5 text-center">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl font-semibold plus-jakarta-sans-400 dark:text-white">
              Professional Summary
            </h2>
          </div>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Write a short introduction on your resume or let the AI generate one
            from your entered Data.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200 flex justify-between items-center">
                    Summary{" "}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleGenerateAI}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate
                        </>
                      )}
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="A brief, engaging text about yourself"
                      className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
};

export default SummaryForm;
