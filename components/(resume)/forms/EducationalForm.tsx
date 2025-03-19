"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { educationSchema, EducationVals } from "@/lib/FormSchema";
import { EditorFormProps } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const EducationalForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<EducationVals>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: resumeData.education || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  // Watch for changes and update parent state
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.education) {
        setResumeData({
          ...resumeData,
          education: value.education.filter((edu) => edu !== undefined),
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  // Handle form submission (missing in original)
  const onSubmit = (data: EducationVals) => {
    setResumeData({
      ...resumeData,
      education: data.education,
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl plus-jakarta-sans-400 dark:text-white">
          Education
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base dark:text-gray-400">
          Add as many educations as you like
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6 flex flex-col justify-center"
        >
          <div className="grid gap-4 sm:gap-6">
            {fields.map((field, index) => (
              <EducationField
                key={field.id}
                index={index}
                form={form}
                remove={remove}
              />
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Button
              type="button"
              className="w-full sm:w-auto dark:hover:bg-gray-700"
              onClick={() => {
                append({
                  degree: "",
                  school: "",
                  startDate: new Date(),
                  endDate: new Date(),
                });
              }}
            >
              Add education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

interface EducationItemProps {
  form: ReturnType<typeof useForm<EducationVals>>;
  index: number;
  remove: (index: number) => void;
}

function EducationField({ form, index, remove }: EducationItemProps) {
  return (
    <div className="space-y-3 sm:space-y-4 border rounded-md bg-background p-3 sm:p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-between items-center gap-2">
        <span className="font-semibold text-sm sm:text-base dark:text-white">
          Education {index + 1}
        </span>
        <GripHorizontal className="size-4 sm:size-5 cursor-grab text-muted-foreground dark:text-gray-400" />
      </div>

      <FormField
        control={form.control}
        name={`education.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base dark:text-gray-200">
              Degree
            </FormLabel>
            <FormControl>
              <Input
                className="text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Bachelor of Science"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-sm dark:text-red-400" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`education.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm sm:text-base dark:text-gray-200">
              School
            </FormLabel>
            <FormControl>
              <Input
                className="text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="University name"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-sm dark:text-red-400" />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`education.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base dark:text-gray-200">
                Start Date
              </FormLabel>
              <FormControl>
                <Input
                  className="text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="date"
                  onChange={(e) => {
                    const date = e.target.value
                      ? new Date(e.target.value)
                      : undefined;
                    field.onChange(date);
                  }}
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : ""
                  }
                />
              </FormControl>
              <FormMessage className="text-sm dark:text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`education.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base dark:text-gray-200">
                End Date
              </FormLabel>
              <FormControl>
                <Input
                  className="text-sm sm:text-base dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="date"
                  onChange={(e) => {
                    const date = e.target.value
                      ? new Date(e.target.value)
                      : undefined;
                    field.onChange(date);
                  }}
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split("T")[0]
                      : ""
                  }
                />
              </FormControl>
              <FormMessage className="text-sm dark:text-red-400" />
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-start">
        <Button
          type="button"
          variant="destructive"
          className="text-sm sm:text-base dark:hover:bg-red-700"
          onClick={() => remove(index)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default EducationalForm;
