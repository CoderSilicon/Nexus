"use client";

import { personalInfoSchema, type PersonalInfoVal } from "@/lib/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { EditorFormProps } from "@/lib/types";

const PersonalInfoForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<PersonalInfoVal>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      jobTitle: resumeData.jobTitle || "",
      city: resumeData.city || "",
      country: resumeData.country || "",
      phone: resumeData.phone || "",
      email: resumeData.email || "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      const formData = form.getValues();
      setResumeData({ ...resumeData, ...value });
    });

    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);
  return (
    <>
      <div className="mx-auto max-w-xl space-y-6 my-6 dark:text-white">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold plus-jakarta-sans-400 dark:text-white">
            Personal Info
          </h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Tell us a bit about yourself
          </p>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-4 max-w-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="dark:text-white">
                  <FormLabel className="dark:text-gray-200">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="dark:text-white">
                  <FormLabel className="dark:text-gray-200">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem className="dark:text-white">
                  <FormLabel className="dark:text-gray-200">
                    Job Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Software Engineer"
                      {...field}
                      className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="dark:text-white">
                  <FormLabel className="dark:text-gray-200">City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New York"
                      {...field}
                      className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="dark:text-white">
                  <FormLabel className="dark:text-gray-200">Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="United States"
                      {...field}
                      className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="dark:text-white">
                  <FormLabel className="dark:text-gray-200">Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1 234 567 890"
                      {...field}
                      className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="dark:text-white">
                  <FormLabel className="dark:text-gray-200">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      type="email"
                      {...field}
                      className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default PersonalInfoForm;
