import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  generalFormSchema,
  GeneralSchemaInfoVals,
} from "@/lib/generalFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
const GeneralInfoForm = () => {
  const form = useForm<GeneralSchemaInfoVals>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1 5 text-center">
        <h2 className="text-2xl font-semibold">General Info</h2>
        <p className="text-sm text-muted-foreground">
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="For ex:- For my next job"
                    autoFocus
                  />
                </FormControl>
                <FormDescription>
                  Description what is this resume for?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default GeneralInfoForm;
