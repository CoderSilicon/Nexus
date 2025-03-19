import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { skillsSchema, SkillsVals } from "@/lib/FormSchema";
import { EditorFormProps } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const SkillsForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<SkillsVals>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.skills) {
        setResumeData({
          ...resumeData,
          skills: value.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== ""),
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  return (
    <>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold plus-jakarta-sans-400 dark:text-white">
            Skills
          </h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            What are you good at?
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Skills</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:text-white"
                      placeholder="e.g. React.js, Grpahic Designing, Marketing, ..."
                      onChange={(e) => {
                        const skills = e.target.value.split(",");
                        field.onChange(skills);
                      }}
                    />
                  </FormControl>
                  <FormDescription className="dark:text-gray-400">
                    Seperate each skill with comma
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
};

export default SkillsForm;
