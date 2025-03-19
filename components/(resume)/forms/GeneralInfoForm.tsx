"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  generalFormSchema,
  type GeneralSchemaInfoVals,
} from "@/lib/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import type { EditorFormProps } from "@/lib/types";

const GeneralInfoForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<GeneralSchemaInfoVals>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      const formData = form.getValues();
      setResumeData({ ...resumeData, ...formData });
    });

    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  return (
    <div className="max-w-xl mx-auto space-y-6 dark:text-white">
      <div className="space-y-1 5 text-center">
        <h2 className="text-2xl font-semibold plus-jakarta-sans-400 dark:text-white">
          General Info
        </h2>
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          This will not appear in your resume
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Title"
                    className="p-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    autoFocus
                  />
                </FormControl>
                <FormDescription className="dark:text-gray-400">
                  Give your resume a title
                </FormDescription>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Description"
                    className="p-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  />
                </FormControl>
                <FormDescription className="dark:text-gray-400">
                  Description what is this resume for?
                </FormDescription>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default GeneralInfoForm;
