import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { workexperienceSchema, WorkExperienceVals } from "@/lib/FormSchema";
import { EditorFormProps } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

const WorkExperienceForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<WorkExperienceVals>({
    resolver: zodResolver(workexperienceSchema),
    defaultValues: { workExperience: resumeData.workExperience || [] },
  });
  useEffect(() => {
    const subscription = form.watch((value) => {
      const formData = form.getValues();
      setResumeData({
        ...resumeData,
        workExperience:
          value.workExperience?.filter((exp) => exp !== undefined) || [],
      });
    });

    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });
  return (
    <div className="max-w-xl mx-auto space-y-6 dark:text-white">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold plus-jakarta-sans-400 dark:text-white">
          Work Experience{" "}
        </h2>
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          Add as many work experiences as you like
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3 flex flex-col justify-center">
          {fields.map((field, index) => (
            <WorkExperienceItem
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => {
                append({
                  position: "",
                  company: "",
                  startDate: "" as any,
                  endDate: "" as any,
                  description: "",
                });
              }}
            >
              Add Works
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

interface WorkExperienceItemProps {
  form: UseFormReturn<WorkExperienceVals>;
  index: number;
  remove: (index: number) => void;
}

function WorkExperienceItem({ form, index, remove }: WorkExperienceItemProps) {
  return (
    <div className="space-y-3 border rounded-md bg-background p-3 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between gap-2">
        <span className="font-semibold dark:text-white">
          Work Experience {index + 1}
        </span>
        <GripHorizontal className="size-5 cursor-grab text-muted-foreground dark:text-gray-400" />
      </div>
      <FormField
        control={form.control}
        name={`workExperience.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="dark:text-gray-200">Job Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Software Engineer"
                {...field}
                autoFocus
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperience.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="dark:text-gray-200">Company</FormLabel>
            <FormControl>
              <Input
                placeholder="Google"
                {...field}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3"></div>
      <FormField
        control={form.control}
        name={`workExperience.${index}.startDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="dark:text-gray-200">Start Date</FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={
                  field.value
                    ? new Date(field.value).toISOString().split("T")[0]
                    : ""
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`workExperience.${index}.endDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="dark:text-gray-200">End Date</FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                value={
                  field.value
                    ? new Date(field.value).toISOString().split("T")[0]
                    : ""
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormDescription className="dark:text-gray-400">
        Leave <span className="font-semibold dark:text-gray-300">End Date</span>{" "}
        empty if u are currently working here
      </FormDescription>
      <FormField
        control={form.control}
        name={`workExperience.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="dark:text-gray-200">Description</FormLabel>
            <FormControl>
              <textarea
                placeholder="Describe your role"
                {...field}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex justify-start">
        <Button
          type="button"
          variant={"destructive"}
          onClick={() => {
            remove(index);
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
export default WorkExperienceForm;
