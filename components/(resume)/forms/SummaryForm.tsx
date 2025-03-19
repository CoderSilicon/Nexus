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
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const SummaryForm = ({ resumeData, setResumeData }: EditorFormProps) => {
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

  return (
    <>
      <div className="max-w-xl space-y-6 mx-auto dark:text-white">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold plus-jakarta-sans-400 dark:text-white">
            Profesional Summary
          </h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Write a short introduction on your resume or the let the ai generate
            one from your entered Data.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-200">Summary</FormLabel>
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
